import { NextResponse } from 'next/server';
import { squareClient, SQUARE_LOCATION_ID } from '@/lib/square';
import { Currency } from 'square';
import { randomUUID } from 'crypto';

const TAX_RATE = 0.14975; // Quebec GST+QST
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 12;

interface CheckoutItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  email: string;
  name: string;
  phone?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shipping } = body as {
      items: CheckoutItem[];
      shipping: ShippingAddress;
    };

    // Validate request
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    if (!shipping?.email || !shipping?.name || !shipping?.address_line1) {
      return NextResponse.json(
        { error: 'Missing shipping information' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * TAX_RATE;
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

    // Build Square order line items (amounts in cents)
    const lineItems = items.map((item) => ({
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: BigInt(Math.round(item.price * 100)),
        currency: Currency.Cad,
      },
    }));

    // Add tax as a line item
    lineItems.push({
      name: 'Tax (QC GST+QST)',
      quantity: '1',
      basePriceMoney: {
        amount: BigInt(Math.round(tax * 100)),
        currency: Currency.Cad,
      },
    });

    // Add shipping as a line item if not free
    if (shippingCost > 0) {
      lineItems.push({
        name: 'Shipping',
        quantity: '1',
        basePriceMoney: {
          amount: BigInt(Math.round(shippingCost * 100)),
          currency: Currency.Cad,
        },
      });
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Square payment link with embedded order
    const result = await squareClient.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId: SQUARE_LOCATION_ID,
        lineItems,
        metadata: {
          customer_name: shipping.name,
          customer_email: shipping.email,
          customer_phone: shipping.phone || '',
          shipping_address: JSON.stringify({
            line1: shipping.address_line1,
            line2: shipping.address_line2 || '',
            city: shipping.city,
            state: shipping.state,
            postal_code: shipping.postal_code,
            country: shipping.country,
          }),
          items: JSON.stringify(items),
          subtotal: subtotal.toString(),
          tax: tax.toString(),
          shipping: shippingCost.toString(),
        },
      },
      checkoutOptions: {
        redirectUrl: `${baseUrl}/checkout/success`,
        askForShippingAddress: true,
      },
      prePopulatedData: {
        buyerEmail: shipping.email,
        buyerPhoneNumber: shipping.phone || undefined,
      },
    });

    const checkoutUrl = result.paymentLink?.url;

    if (!checkoutUrl) {
      throw new Error('Square did not return a checkout URL');
    }

    return NextResponse.json({
      checkoutUrl,
      orderId: result.paymentLink?.orderId,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
