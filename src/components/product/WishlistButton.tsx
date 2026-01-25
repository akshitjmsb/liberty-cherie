'use client';

import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types';
import { useWishlistStore } from '@/store/wishlist';

interface WishlistButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  className?: string;
}

export default function WishlistButton({
  product,
  size = 'md',
  variant = 'icon',
  className = '',
}: WishlistButtonProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);

    if (isWishlisted) {
      toast.success('Removed from wishlist', {
        description: product.name,
      });
    } else {
      toast.success('Added to wishlist', {
        description: product.name,
        action: {
          label: 'View Wishlist',
          onClick: () => {
            window.location.href = '/wishlist';
          },
        },
      });
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        className={`btn-secondary flex items-center gap-2 ${className}`}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={isWishlisted}
      >
        <Heart
          className={`${sizeClasses[size]} ${
            isWishlisted ? 'fill-primary text-primary' : ''
          }`}
        />
        <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors touch-target ${
        isWishlisted ? 'bg-primary text-white' : ''
      } ${className}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={isWishlisted}
    >
      <Heart
        className={`${sizeClasses[size]} ${
          isWishlisted ? 'fill-current' : ''
        }`}
      />
    </button>
  );
}
