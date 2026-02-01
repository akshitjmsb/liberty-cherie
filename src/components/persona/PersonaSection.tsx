'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product, PersonaSlug } from '@/types';
import ProductCard from '@/components/product/ProductCard';

interface PersonaSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  personaSlug: PersonaSlug;
  ctaText?: string;
  className?: string;
}

export default function PersonaSection({
  title,
  subtitle,
  products,
  personaSlug,
  ctaText = 'View all',
  className = '',
}: PersonaSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className={`py-16 ${className}`}>
      <div className="container">
        {/* Header — only render if there's a title or CTA */}
        {(title || ctaText) && (
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy">
                {title}
              </h2>
              {subtitle && (
                <p className="text-soft-gray mt-2">{subtitle}</p>
              )}
            </div>
            <Link
              href={`/shop-for/${personaSlug}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors group"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
