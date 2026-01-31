'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types';
import { useCartStore } from '@/store/cart';
import { categoryLabels } from '@/lib/products';
import { useTranslation } from '@/hooks/useTranslation';
import { localized, localizedLabel } from '@/lib/i18n/localize';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const { addItem, openCart } = useCartStore();
  const { t, locale } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${localized(product, 'name', locale)} ${t.products.addedToCart}`, {
      description: t.products.clickToViewCart,
      action: {
        label: t.products.viewCart,
        onClick: () => openCart(),
      },
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', {
      style: 'currency',
      currency: product.currency || 'CAD',
    }).format(price);
  };

  // Auto-detect badge
  const badgeType = product.badge
    || (product.featured ? 'new' as const : undefined)
    || (!product.in_stock ? 'soldout' as const : undefined);

  const badgeLabel = badgeType === 'new'
    ? t.products.badgeNew
    : badgeType === 'sale'
      ? product.original_price
        ? `-${Math.round((1 - product.price / product.original_price) * 100)}%`
        : t.products.badgeSale
      : badgeType === 'soldout'
        ? t.products.badgeSoldOut
        : null;

  const isSoldOut = badgeType === 'soldout' || !product.in_stock;

  return (
    <Link href={`/product/${product.slug || product.id}`} className="group">
      <article className="product-card">
        {/* Floral corner decorations */}
        <div className="pc-floral-tl" />
        <div className="pc-floral-br" />

        {/* Image Container - 3:4 aspect ratio */}
        <div className={`product-image-container relative ${isSoldOut ? 'opacity-70' : ''}`}>
          {product.images?.[0] ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton" />
              )}
              <Image
                src={product.images[0]}
                alt={localized(product, 'name', locale)}
                fill
                className={`object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div className="w-full h-full bg-cream flex items-center justify-center">
              <span className="text-soft-gray">{t.products.noImage}</span>
            </div>
          )}

          {/* Badge */}
          {badgeLabel && (
            <div className="product-badge">
              <span className={`badge badge-${badgeType}`}>
                {badgeLabel}
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <div className="wishlist-btn">
            <WishlistButton product={product} size="md" />
          </div>

          {/* Quick Add - slides up on hover */}
          {!isSoldOut && (
            <div className="quick-add">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-navy text-white text-[10px] tracking-[1px] sm:text-[11px] sm:tracking-[2px] font-medium uppercase rounded-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {t.products.quickAdd}
              </button>
            </div>
          )}
        </div>

        {/* Product Info - centered text */}
        <div className="product-info">
          {/* Category */}
          <div className="product-category">
            {localizedLabel(categoryLabels[product.category], locale) || product.category}
          </div>

          {/* Name */}
          <h3 className="product-name line-clamp-1">
            {localized(product, 'name', locale)}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-center gap-2">
            <span className="price">{formatPrice(product.price)}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="price-strikethrough">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>

          {/* Color dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="color-dots">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColor(color.name);
                  }}
                  className={`color-dot ${selectedColor === color.name ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={t.products.selectColor.replace('{color}', color.name)}
                />
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
