import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

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

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sophie Tremblay',
    location: 'Montreal, QC',
    rating: 5,
    text: "I absolutely love my Liberty Chérie tote bag! The craftsmanship is exceptional and the floral pattern is even more beautiful in person. It's become my go-to bag for work and weekends.",
    product: 'Victoria Rose Tote Bag',
    date: 'December 2024',
  },
  {
    id: '2',
    name: 'Marie-Claire Dubois',
    location: 'Quebec City, QC',
    rating: 5,
    text: "The custom jacket transformation service exceeded my expectations. They took my plain denim jacket and turned it into a wearable piece of art. So many compliments!",
    product: 'Custom Jacket Service',
    date: 'November 2024',
  },
  {
    id: '3',
    name: 'Jennifer Wong',
    location: 'Toronto, ON',
    rating: 5,
    text: "Perfect gift for my mother! The pouch is beautifully made and the packaging was so thoughtful. Shipping was fast and the quality is outstanding. Will definitely order again.",
    product: 'Floral Daisy Pouch',
    date: 'January 2025',
  },
  {
    id: '4',
    name: 'Isabelle Martin',
    location: 'Saint-Sauveur, QC',
    rating: 5,
    text: "I've been a loyal customer since they started. Every piece is unique and you can tell it's made with love. The Liberty fabric patterns are always stunning and the quality is impeccable.",
    product: 'Various Products',
    date: 'Returning Customer',
  },
];

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
            <p className="text-lg md:text-xl text-charcoal leading-relaxed mb-6">
              &ldquo;{featured.text}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-light/30 flex items-center justify-center">
                <span className="font-display text-lg text-primary">
                  {featured.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-charcoal">{featured.name}</p>
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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
      {/* Rating */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? 'fill-primary text-primary'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-charcoal leading-relaxed flex-1 mb-4">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Product Tag */}
      {testimonial.product && (
        <p className="text-sm text-primary mb-4">{testimonial.product}</p>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
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
          <p className="font-medium text-charcoal text-sm">{testimonial.name}</p>
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
  const stats = [
    { value: '500+', label: 'Happy Customers' },
    { value: '4.9', label: 'Average Rating' },
    { value: '100%', label: 'Handcrafted' },
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
