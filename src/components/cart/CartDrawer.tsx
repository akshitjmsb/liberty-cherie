'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
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
      // Focus the close button when cart opens
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
      // Close if swiped right more than 100px
      if (swipeDistance > 100) {
        closeCart();
      }
    }
    setTouchStart(null);
    setTouchCurrent(null);
    setIsDragging(false);
  }, [touchStart, touchCurrent, closeCart]);

  // Calculate swipe offset for visual feedback
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
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
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
              <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
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
                  className="flex gap-4 bg-cream rounded-lg p-3"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                    {item.product.images?.[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-charcoal truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-primary font-display">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.product.id, item.product.name, item.quantity - 1)
                        }
                        className="p-1 hover:bg-white rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.product.id, item.product.name, item.quantity + 1)
                        }
                        className="p-1 hover:bg-white rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="ml-auto p-1 text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Cart Summary */}
        {items.length > 0 && (
          <div className="border-t p-4 bg-cream">
            <div className="space-y-2 text-sm">
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
              <div className="flex justify-between font-display text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-primary">{formatPrice(getTotal())}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full mt-4"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={closeCart}
              className="w-full text-center mt-2 text-soft-gray hover:text-charcoal transition-colors text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
