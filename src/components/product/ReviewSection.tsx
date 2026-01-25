'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, User } from 'lucide-react';
import ReviewForm from './ReviewForm';

interface Review {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  title: string;
  content: string;
  is_verified: boolean;
  created_at: string;
}

interface ReviewSectionProps {
  productId: string;
  productName: string;
}

export default function ReviewSection({ productId, productName }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(`/api/reviews?productId=${productId}`);
      const data = await response.json();

      if (response.ok) {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewSubmitted = () => {
    setShowForm(false);
    fetchReviews();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) => {
    const sizeClasses = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
    return (
      <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses} ${
              star <= rating ? 'fill-primary text-primary' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="border-t border-gray-100 pt-8 mt-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 pt-8 mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl text-charcoal">
            Customer Reviews
          </h2>
          {totalReviews > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={Math.round(averageRating)} size="md" />
              <span className="text-charcoal font-medium">{averageRating}</span>
              <span className="text-soft-gray">
                ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-secondary"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-cream rounded-lg">
          <h3 className="font-display text-xl text-charcoal mb-4">
            Share Your Thoughts
          </h3>
          <ReviewForm
            productId={productId}
            productName={productName}
            onSubmitted={handleReviewSubmitted}
          />
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8 text-soft-gray">
          <p>No reviews yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-white p-6 rounded-lg border border-gray-100"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-soft-gray" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-charcoal">
                        {review.author_name}
                      </span>
                      {review.is_verified && (
                        <span className="text-xs bg-secondary/20 text-secondary-dark px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-soft-gray">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              {review.title && (
                <h4 className="font-medium text-charcoal mt-4">
                  {review.title}
                </h4>
              )}

              <p className="text-soft-gray mt-2 leading-relaxed">
                {review.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
