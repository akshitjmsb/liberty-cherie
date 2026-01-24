import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createServerClient } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  try {
    const supabase = createServerClient();

    // Parse metadata
    const items = JSON.parse(session.metadata?.items || '[]');
    const shippingAddress = JSON.parse(session.metadata?.shipping_address || '{}');

    // Create order in database
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_email: session.customer_email || session.customer_details?.email,
        customer_name: session.metadata?.customer_name || session.customer_details?.name,
        customer_phone: session.metadata?.customer_phone || session.customer_details?.phone,
        shipping_address: {
          name: session.metadata?.customer_name,
          ...shippingAddress,
        },
        billing_address: session.customer_details?.address,
        items: items,
        subtotal: parseFloat(session.metadata?.subtotal || '0'),
        tax: parseFloat(session.metadata?.tax || '0'),
        shipping: parseFloat(session.metadata?.shipping || '0'),
        total: (session.amount_total || 0) / 100,
        currency: session.currency?.toUpperCase() || 'CAD',
        status: 'paid',
        stripe_payment_intent_id: session.payment_intent as string,
        stripe_session_id: session.id,
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
      // Get current stock
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

    // TODO: Send confirmation email to customer
    // TODO: Send notification to admin

  } catch (error) {
    console.error('Error handling checkout complete:', error);
  }
}
