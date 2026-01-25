'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart';
import { categoryLabels } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
    toast.success(`${product.name} added to cart`, {
      description: 'Click to view your cart',
      action: {
        label: 'View Cart',
        onClick: () => openCart(),
      },
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: product.currency || 'CAD',
    }).format(price);
  };

  return (
    <Link href={`/product/${product.slug || product.id}`} className="group">
      <article className="card">
        {/* Image Container */}
        <div className="product-image-container relative">
          {product.images?.[0] ? (
            <>
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton" />
              )}
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div className="w-full h-full bg-cream flex items-center justify-center">
              <span className="text-soft-gray">No image</span>
            </div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </span>
          )}

          {/* Quick Actions - Visible on mobile, hover-reveal on desktop */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              className="p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <span className="category-tag mb-2">
            {categoryLabels[product.category]?.en || product.category}
          </span>

          {/* Name */}
          <h3 className="font-display text-lg text-charcoal mt-2 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-soft-gray text-sm mt-1 line-clamp-2">
            {product.description}
          </p>

          {/* Price & Stock */}
          <div className="flex items-center justify-between mt-3">
            <span className="price">{formatPrice(product.price)}</span>
            {!product.in_stock && (
              <span className="text-xs text-red-500 font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
