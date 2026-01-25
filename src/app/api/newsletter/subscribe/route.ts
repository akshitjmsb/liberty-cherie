import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { NewsletterSubscribeRequest, PersonaSlug } from '@/types';
import { isValidPersonaSlug } from '@/lib/personas';

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterSubscribeRequest = await request.json();

    // Validate email
    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate language
    const language = body.language || 'en';
    if (language !== 'en' && language !== 'fr') {
      return NextResponse.json(
        { error: 'Invalid language. Must be "en" or "fr"' },
        { status: 400 }
      );
    }

    // Validate interests (persona slugs)
    const interests: PersonaSlug[] = [];
    if (body.interests && Array.isArray(body.interests)) {
      for (const interest of body.interests) {
        if (isValidPersonaSlug(interest)) {
          interests.push(interest as PersonaSlug);
        }
      }
    }

    const supabase = createServerClient();

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', body.email.toLowerCase())
      .single();

    if (existing) {
      if (existing.is_active) {
        // Update interests if already subscribed
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            first_name: body.first_name || undefined,
            language,
            interests,
            source: body.source || undefined,
          })
          .eq('id', existing.id);

        if (updateError) {
          console.error('Error updating subscriber:', updateError);
          return NextResponse.json(
            { error: 'Failed to update subscription' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Your subscription has been updated!',
          updated: true,
        });
      } else {
        // Reactivate subscription
        const { error: reactivateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            is_active: true,
            first_name: body.first_name || undefined,
            language,
            interests,
            source: body.source || undefined,
          })
          .eq('id', existing.id);

        if (reactivateError) {
          console.error('Error reactivating subscriber:', reactivateError);
          return NextResponse.json(
            { error: 'Failed to reactivate subscription' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
          reactivated: true,
        });
      }
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: body.email.toLowerCase(),
        first_name: body.first_name || null,
        language,
        interests,
        source: body.source || 'website',
        is_verified: false,
        is_active: true,
      });

    if (insertError) {
      console.error('Error inserting subscriber:', insertError);

      // Check for unique constraint violation
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! Welcome to Liberty Chérie.',
      created: true,
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
