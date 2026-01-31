'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error(t.reviews.selectRating);
      return;
    }

    if (!authorName.trim()) {
      toast.error(t.reviews.enterNameError);
      return;
    }

    if (!content.trim()) {
      toast.error(t.reviews.writeReviewError);
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

      toast.success(t.reviews.reviewSuccess, {
        description: t.reviews.reviewSuccessDesc,
      });

      // Reset form
      setRating(0);
      setAuthorName('');
      setTitle('');
      setContent('');
      onSubmitted();
    } catch {
      toast.error(t.reviews.reviewError, {
        description: t.reviews.reviewErrorDesc,
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
          {t.reviews.yourRating} <span className="text-primary">*</span>
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
              className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              role="radio"
              aria-checked={rating === star}
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'fill-primary text-primary'
                    : 'text-cream'
                }`}
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-soft-gray mt-1">
            {rating === 5 && t.reviews.ratingExcellent}
            {rating === 4 && t.reviews.ratingVeryGood}
            {rating === 3 && t.reviews.ratingGood}
            {rating === 2 && t.reviews.ratingFair}
            {rating === 1 && t.reviews.ratingPoor}
          </p>
        )}
      </div>

      {/* Author Name */}
      <div>
        <label htmlFor="authorName" className="form-label">
          {t.reviews.yourName} <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="form-input"
          placeholder={t.reviews.enterName}
          maxLength={100}
          required
        />
      </div>

      {/* Review Title */}
      <div>
        <label htmlFor="reviewTitle" className="form-label">
          {t.reviews.reviewTitle}
        </label>
        <input
          type="text"
          id="reviewTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          placeholder={`${t.reviews.reviewTitlePlaceholder} ${productName}`}
          maxLength={200}
        />
      </div>

      {/* Review Content */}
      <div>
        <label htmlFor="reviewContent" className="form-label">
          {t.reviews.yourReview} <span className="text-primary">*</span>
        </label>
        <textarea
          id="reviewContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-input min-h-[120px] resize-y"
          placeholder={t.reviews.reviewPlaceholder}
          maxLength={2000}
          required
        />
        <p className="text-xs text-soft-gray mt-1">
          {content.length}/2000 {t.reviews.characters}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? t.reviews.submitting : t.reviews.submitReview}
      </button>
    </form>
  );
}
