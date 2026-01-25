'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSubmitted: () => void;
}

export default function ReviewForm({
  productId,
  productName,
  onSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!authorName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!content.trim()) {
      toast.error('Please write your review');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          authorName: authorName.trim(),
          rating,
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      toast.success('Thank you for your review!', {
        description: 'Your review has been submitted successfully.',
      });

      // Reset form
      setRating(0);
      setAuthorName('');
      setTitle('');
      setContent('');
      onSubmitted();
    } catch {
      toast.error('Failed to submit review', {
        description: 'Please try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <label className="form-label">
          Your Rating <span className="text-primary">*</span>
        </label>
        <div
          className="flex gap-1 mt-1"
          role="radiogroup"
          aria-label="Rating"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              role="radio"
              aria-checked={rating === star}
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'fill-primary text-primary'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-soft-gray mt-1">
            {rating === 5 && 'Excellent!'}
            {rating === 4 && 'Very Good'}
            {rating === 3 && 'Good'}
            {rating === 2 && 'Fair'}
            {rating === 1 && 'Poor'}
          </p>
        )}
      </div>

      {/* Author Name */}
      <div>
        <label htmlFor="authorName" className="form-label">
          Your Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="form-input"
          placeholder="Enter your name"
          maxLength={100}
          required
        />
      </div>

      {/* Review Title */}
      <div>
        <label htmlFor="reviewTitle" className="form-label">
          Review Title
        </label>
        <input
          type="text"
          id="reviewTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          placeholder={`My experience with ${productName}`}
          maxLength={200}
        />
      </div>

      {/* Review Content */}
      <div>
        <label htmlFor="reviewContent" className="form-label">
          Your Review <span className="text-primary">*</span>
        </label>
        <textarea
          id="reviewContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-input min-h-[120px] resize-y"
          placeholder="Share your experience with this product..."
          maxLength={2000}
          required
        />
        <p className="text-xs text-soft-gray mt-1">
          {content.length}/2000 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
