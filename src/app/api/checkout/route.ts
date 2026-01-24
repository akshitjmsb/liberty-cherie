import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerClient } from '@/lib/supabase';

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
    const total = subtotal + tax + shippingCost;

    // Create line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Add tax as a line item
    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: {
          name: 'Tax (QC GST+QST)',
          images: [],
        },
        unit_amount: Math.round(tax * 100),
      },
      quantity: 1,
    });

    // Add shipping as a line item if not free
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'Shipping',
            images: [],
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: shipping.email,
      shipping_address_collection: {
        allowed_countries: ['CA'],
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      metadata: {
        customer_name: shipping.name,
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
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
