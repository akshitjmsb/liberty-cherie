'use client';

import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card">
            <div className="aspect-[3/4] skeleton" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-20 skeleton rounded" />
              <div className="h-6 w-3/4 skeleton rounded" />
              <div className="h-4 w-full skeleton rounded" />
              <div className="h-6 w-1/3 skeleton rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-soft-gray text-lg">No products found</p>
        <p className="text-sm text-soft-gray mt-2">
          Try adjusting your filters or check back later for new arrivals.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
