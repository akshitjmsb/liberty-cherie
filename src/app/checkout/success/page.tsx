'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();

  // Clear cart on successful checkout
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="animate-fade-in">
      <div className="container py-20">
        <div className="max-w-lg mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-secondary/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-secondary" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-4">
            Thank You for Your Order!
          </h1>

          <p className="text-soft-gray mb-8">
            Your order has been placed successfully. We&apos;re excited to prepare your
            handcrafted items with care and love.
          </p>

          {/* Order Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-cream rounded-xl p-6 text-left">
              <Mail className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-medium text-charcoal mb-1">Confirmation Email</h3>
              <p className="text-soft-gray text-sm">
                You&apos;ll receive an email confirmation with your order details shortly.
              </p>
            </div>
            <div className="bg-cream rounded-xl p-6 text-left">
              <Package className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-medium text-charcoal mb-1">Shipping Updates</h3>
              <p className="text-soft-gray text-sm">
                We&apos;ll send you tracking information once your order ships.
              </p>
            </div>
          </div>

          {/* Order Reference */}
          {sessionId && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-soft-gray">Order Reference</p>
              <p className="font-mono text-charcoal text-sm truncate">{sessionId}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary">
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://instagram.com/libertycheriecreation"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Follow Us
            </a>
          </div>

          {/* Contact Note */}
          <p className="text-soft-gray text-sm mt-8">
            Questions about your order?{' '}
            <a href="mailto:contact@libertycherie.ca" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container py-20 text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
