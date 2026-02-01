import { NextResponse } from 'next/server';
import { WebhooksHelper } from 'square';
import { squareClient } from '@/lib/square';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-square-hmacsha256-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing Square signature header' },
      { status: 400 }
    );
  }

  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY!;
  const notificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/square`;

  const isValid = WebhooksHelper.verifySignature({
    requestBody: body,
    signatureHeader: signature,
    signatureKey,
    notificationUrl,
  });

  if (!isValid) {
    console.error('Webhook signature verification failed');
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const event = JSON.parse(body);

  switch (event.type) {
    case 'payment.completed': {
      const payment = event.data.object.payment;
      await handlePaymentCompleted(payment);
      break;
    }

    default:
      console.log(`Unhandled Square event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handlePaymentCompleted(payment: {
  id: string;
  orderId?: string;
  totalMoney?: { amount: number; currency: string };
}) {
  try {
    const supabase = createServerClient();

    let orderMetadata: Record<string, string | null | undefined> = {};
    let totalAmount = 0;
    let currency = 'CAD';

    // Retrieve the full order from Square to get metadata
    if (payment.orderId) {
      const response = await squareClient.orders.get({ orderId: payment.orderId });
      const squareOrder = response.order;
      if (squareOrder?.metadata) {
        orderMetadata = squareOrder.metadata;
      }
      if (squareOrder?.totalMoney) {
        totalAmount = Number(squareOrder.totalMoney.amount) / 100;
        currency = squareOrder.totalMoney.currency || 'CAD';
      }
    } else if (payment.totalMoney) {
      totalAmount = payment.totalMoney.amount / 100;
      currency = payment.totalMoney.currency || 'CAD';
    }

    // Parse metadata
    const items = JSON.parse(orderMetadata.items || '[]');
    const shippingAddress = JSON.parse(orderMetadata.shipping_address || '{}');

    // Create order in database
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_email: orderMetadata.customer_email,
        customer_name: orderMetadata.customer_name,
        customer_phone: orderMetadata.customer_phone,
        shipping_address: {
          name: orderMetadata.customer_name,
          ...shippingAddress,
        },
        items: items,
        subtotal: parseFloat(orderMetadata.subtotal || '0'),
        tax: parseFloat(orderMetadata.tax || '0'),
        shipping: parseFloat(orderMetadata.shipping || '0'),
        total: totalAmount,
        currency: currency,
        status: 'paid',
        square_payment_id: payment.id,
        square_order_id: payment.orderId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      return;
    }

    console.log('Order created:', order.id);

    // Update stock for each purchased item
    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', item.product_id)
        .single();

      if (product) {
        const newQuantity = Math.max(0, (product.stock_quantity || 0) - item.quantity);

        await supabase
          .from('products')
          .update({
            stock_quantity: newQuantity,
            in_stock: newQuantity > 0,
          })
          .eq('id', item.product_id);
      }
    }
  } catch (error) {
    console.error('Error handling payment completed:', error);
  }
}
