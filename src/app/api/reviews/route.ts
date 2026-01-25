import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export interface Review {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  title: string;
  content: string;
  is_verified: boolean;
  is_approved: boolean;
  created_at: string;
}

// GET reviews for a product
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json(
      { error: 'Product ID is required' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }

  // Calculate average rating
  const reviews = (data || []) as Review[];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return NextResponse.json({
    reviews,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviews.length,
  });
}

// POST a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, authorName, rating, title, content } = body;

    // Validate required fields
    if (!productId || !authorName || !rating || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id: productId,
        author_name: authorName.trim(),
        rating: Math.round(rating),
        title: title?.trim() || '',
        content: content.trim(),
        is_verified: false,
        is_approved: true, // Auto-approve for now; can add moderation later
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      return NextResponse.json(
        { error: 'Failed to create review' },
        { status: 500 }
      );
    }

    return NextResponse.json({ review: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
