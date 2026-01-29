'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface CartSummaryProps {
  subtotal: number;
  shipping?: number | 'free';
  tax: number;
  total: number;
  onCheckout?: () => void;
  promoCode?: string;
  onApplyPromo?: (code: string) => void;
}

export function CartSummary({
  subtotal,
  shipping = 'free',
  tax,
  total,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="cart-summary">
      <div className="cart-summary-floral-tl" />
      <div className="cart-summary-floral-br" />

      <h3 className="font-display text-2xl text-navy mb-6 relative z-10">
        Order Summary
      </h3>

      <div className="space-y-2 relative z-10">
        <div className="flex justify-between py-2 text-sm">
          <span className="text-soft-gray">Subtotal</span>
          <span className="text-navy">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-soft-gray">Shipping</span>
          <span className="text-navy">
            {shipping === 'free' ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-soft-gray">Tax</span>
          <span className="text-navy">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pt-4 mt-4 border-t border-cream">
          <span className="text-lg font-semibold text-navy">Total</span>
          <span className="text-lg font-semibold text-navy">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        className="w-full mt-6 relative z-10"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}

export default CartSummary;
