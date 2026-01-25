'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useWishlistStore } from '@/store/wishlist';
import { useCartStore } from '@/store/cart';
import { categoryLabels } from '@/lib/products';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();

  const formatPrice = (price: number, currency: string = 'CAD') => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency,
    }).format(price);
  };

  const handleAddToCart = (product: typeof items[0]) => {
    addItem(product);
    openCart();
    toast.success(`${product.name} added to cart`);
  };

  const handleRemove = (product: typeof items[0]) => {
    removeItem(product.id);
    toast.success('Removed from wishlist', {
      description: product.name,
    });
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center max-w-md mx-auto">
          <Heart className="w-16 h-16 text-soft-gray mx-auto mb-6" />
          <h1 className="font-display text-3xl text-charcoal mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-soft-gray mb-8">
            Save your favorite items here by clicking the heart icon on any product.
          </p>
          <Link href="/products" className="btn-primary inline-flex">
            <ShoppingBag className="w-5 h-5" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-soft-gray hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="font-display text-3xl text-charcoal">
            My Wishlist
          </h1>
          <p className="text-soft-gray mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <button
          onClick={() => {
            clearWishlist();
            toast.success('Wishlist cleared');
          }}
          className="text-soft-gray hover:text-primary transition-colors text-sm underline"
        >
          Clear All
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <article key={product.id} className="card group">
            {/* Image */}
            <Link href={`/product/${product.slug || product.id}`}>
              <div className="product-image-container relative">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-cream flex items-center justify-center">
                    <span className="text-soft-gray">No image</span>
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(product)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Stock Status Overlay */}
                {!product.in_stock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-white px-4 py-2 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
              <span className="category-tag">
                {categoryLabels[product.category]?.en || product.category}
              </span>

              <Link href={`/product/${product.slug || product.id}`}>
                <h3 className="font-display text-lg text-charcoal mt-2 hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>

              <p className="text-soft-gray text-sm mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="price">
                  {formatPrice(product.price, product.currency)}
                </span>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.in_stock}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    product.in_stock
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Add to cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
