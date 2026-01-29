'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cart';

export default function CartDrawer() {
  // Swipe gesture state
  const drawerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
  } = useCartStore();

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(price);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleUpdateQuantity = (productId: string, productName: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId, productName);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Swipe gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart(touch.clientX);
    setTouchCurrent(touch.clientX);
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setTouchCurrent(touch.clientX);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (touchStart !== null && touchCurrent !== null) {
      const swipeDistance = touchCurrent - touchStart;
      if (swipeDistance > 100) {
        closeCart();
      }
    }
    setTouchStart(null);
    setTouchCurrent(null);
    setIsDragging(false);
  }, [touchStart, touchCurrent, closeCart]);

  const getSwipeTransform = () => {
    if (!isDragging || touchStart === null || touchCurrent === null) return '';
    const offset = Math.max(0, touchCurrent - touchStart);
    return `translateX(${offset}px)`;
  };

  const getSwipeOpacity = () => {
    if (!isDragging || touchStart === null || touchCurrent === null) return 1;
    const offset = Math.max(0, touchCurrent - touchStart);
    return Math.max(0.5, 1 - offset / 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={closeCart} />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl animate-slide-in flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: getSwipeTransform(),
          opacity: getSwipeOpacity(),
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
        }}
      >
        {/* Swipe indicator - mobile only */}
        <div className="md:hidden flex justify-center pt-2">
          <div className="w-10 h-1 bg-cream rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl">Your Cart</h2>
            <span className="text-soft-gray">({items.length} items)</span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={closeCart}
            className="p-2 hover:bg-cream rounded-full transition-colors touch-target"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-cream mb-4" />
              <p className="text-soft-gray mb-4">Your cart is empty</p>
              <button onClick={closeCart} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="cart-item"
                >
                  {/* Product Image - kit spec: 100x120 */}
                  <div className="cart-item-image">
                    {item.product.images?.[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-cream" />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="cart-item-details">
                    <h3 className="cart-item-name truncate">
                      {item.product.name}
                    </h3>
                    {item.variant_id && (
                      <p className="cart-item-variant">
                        {item.variant_id}
                      </p>
                    )}
                    <p className="cart-item-price">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Selector - bordered, 36px buttons */}
                    <div className="flex items-center gap-3">
                      <div className="quantity-selector">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.product.id, item.product.name, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="quantity-value">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.product.id, item.product.name, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove link - kit spec: text "Remove" instead of trash icon */}
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="cart-item-remove"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Cart Summary with florals */}
        {items.length > 0 && (
          <div className="border-t p-4 cart-summary">
            <div className="cart-summary-floral-tl" />
            <div className="cart-summary-floral-br" />

            <div className="space-y-2 text-sm relative z-10">
              <div className="flex justify-between">
                <span className="text-soft-gray">Subtotal</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-soft-gray">Tax (QC GST+QST)</span>
                <span>{formatPrice(getTax())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-soft-gray">Shipping</span>
                <span>
                  {getShipping() === 0 ? (
                    <span className="text-secondary">Free</span>
                  ) : (
                    formatPrice(getShipping())
                  )}
                </span>
              </div>
              {getShipping() > 0 && (
                <p className="text-xs text-soft-gray">
                  Free shipping on orders over $100
                </p>
              )}
              <div className="flex justify-between font-display text-lg pt-2 border-t border-cream">
                <span>Total</span>
                <span className="text-primary">{formatPrice(getTotal())}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full mt-4 relative z-10"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={closeCart}
              className="w-full text-center mt-2 text-soft-gray hover:text-navy transition-colors text-sm relative z-10"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
