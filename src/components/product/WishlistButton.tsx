'use client';

import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types';
import { useWishlistStore } from '@/store/wishlist';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();
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
      toast.success(t.wishlist.removedFromWishlist, {
        description: product.name,
      });
    } else {
      toast.success(t.wishlist.addedToWishlist, {
        description: product.name,
        action: {
          label: t.wishlist.viewWishlist,
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
        aria-label={isWishlisted ? t.wishlist.removeFromWishlistAria : t.wishlist.addToWishlistAria}
        aria-pressed={isWishlisted}
      >
        <Heart
          className={`${sizeClasses[size]} ${
            isWishlisted ? 'fill-primary text-primary' : ''
          }`}
        />
        <span>{isWishlisted ? t.wishlist.inWishlist : t.wishlist.addToWishlist}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors touch-target ${
        isWishlisted ? 'bg-primary text-white' : ''
      } ${className}`}
      aria-label={isWishlisted ? t.wishlist.removeFromWishlistAria : t.wishlist.addToWishlistAria}
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
