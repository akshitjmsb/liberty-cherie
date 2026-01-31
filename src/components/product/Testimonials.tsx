'use client';

import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  text: string;
  product?: string;
  date?: string;
}

interface TestimonialsProps {
  className?: string;
  limit?: number;
  variant?: 'grid' | 'carousel' | 'featured';
}

export default function Testimonials({
  className = '',
  limit = 3,
  variant = 'grid',
}: TestimonialsProps) {
  const { t } = useTranslation();

  const testimonials: Testimonial[] = [
    {
      id: '1', name: 'Sophie Tremblay', location: 'Montreal, QC',
      rating: 5, text: t.testimonials.t1Text, product: t.testimonials.t1Product, date: t.testimonials.t1Date,
    },
    {
      id: '2', name: 'Marie-Claire Dubois', location: 'Quebec City, QC',
      rating: 5, text: t.testimonials.t2Text, product: t.testimonials.t2Product, date: t.testimonials.t2Date,
    },
    {
      id: '3', name: 'Jennifer Wong', location: 'Toronto, ON',
      rating: 5, text: t.testimonials.t3Text, product: t.testimonials.t3Product, date: t.testimonials.t3Date,
    },
    {
      id: '4', name: 'Isabelle Martin', location: 'Saint-Sauveur, QC',
      rating: 5, text: t.testimonials.t4Text, product: t.testimonials.t4Product, date: '',
    },
  ];

  const displayedTestimonials = testimonials.slice(0, limit);

  if (variant === 'featured') {
    const featured = testimonials[0];
    return (
      <div className={`bg-cream rounded-2xl p-8 md:p-12 ${className}`}>
        <div className="flex items-start gap-4">
          <Quote className="w-12 h-12 text-primary/20 flex-shrink-0" />
          <div>
            <div className="flex gap-1 mb-4">
              {[...Array(featured.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-primary text-primary"
                />
              ))}
            </div>
            <p className="text-lg md:text-xl text-navy leading-relaxed mb-6">
              &ldquo;{featured.text}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-light/30 flex items-center justify-center">
                <span className="font-display text-lg text-primary">
                  {featured.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-navy">{featured.name}</p>
                <p className="text-soft-gray text-sm">{featured.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className={`grid gap-6 ${
          variant === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''
        }`}
      >
        {displayedTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-cream flex flex-col">
      {/* Rating */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? 'fill-primary text-primary'
                : 'fill-[var(--light-gray)] text-[var(--light-gray)]'
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-navy leading-relaxed flex-1 mb-4">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Product Tag */}
      {testimonial.product && (
        <p className="text-sm text-primary mb-4">{testimonial.product}</p>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-cream">
        {testimonial.avatar ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
            <span className="font-display text-primary">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-medium text-navy text-sm">{testimonial.name}</p>
          <p className="text-soft-gray text-xs">{testimonial.location}</p>
        </div>
        {testimonial.date && (
          <p className="ml-auto text-xs text-soft-gray">{testimonial.date}</p>
        )}
      </div>
    </div>
  );
}

interface TestimonialStatsProps {
  className?: string;
}

export function TestimonialStats({ className = '' }: TestimonialStatsProps) {
  const { t } = useTranslation();

  const stats = [
    { value: '500+', label: t.testimonials.happyCustomers },
    { value: '4.9', label: t.testimonials.averageRating },
    { value: '100%', label: t.testimonials.handcrafted },
  ];

  return (
    <div className={`flex flex-wrap justify-center gap-8 md:gap-16 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-display text-3xl md:text-4xl text-primary mb-1">
            {stat.value}
          </p>
          <p className="text-soft-gray text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
