import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { CustomOrderType } from '@/types';

interface CustomOrderRequest {
  name: string;
  email: string;
  phone?: string;
  request_type: CustomOrderType;
  description: string;
  preferred_colors?: string;
  preferred_fabrics?: string;
  budget_range?: string;
  timeline?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as CustomOrderRequest;

    // Validate required fields
    if (!body.name || !body.email || !body.request_type || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Insert custom order request
    const { data, error } = await supabase
      .from('custom_order_requests')
      .insert({
        customer_name: body.name,
        customer_email: body.email,
        customer_phone: body.phone || null,
        request_type: body.request_type,
        description: body.description,
        preferred_colors: body.preferred_colors || null,
        preferred_fabrics: body.preferred_fabrics || null,
        budget_range: body.budget_range || null,
        timeline: body.timeline || null,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating custom order request:', error);
      return NextResponse.json(
        { error: 'Failed to submit request' },
        { status: 500 }
      );
    }

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to customer

    return NextResponse.json({
      success: true,
      request_number: data.request_number,
    });
  } catch (error) {
    console.error('Custom order API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
