'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t, locale } = useTranslation();
  const fmt = (value: number) =>
    new Intl.NumberFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', { style: 'currency', currency: 'CAD' }).format(value);

  return (
    <div className="cart-summary">
      <div className="cart-summary-floral-tl" />
      <div className="cart-summary-floral-br" />

      <h3 className="font-display text-2xl text-navy mb-6 relative z-10">
        {t.checkout.orderSummary}
      </h3>

      <div className="space-y-2 relative z-10">
        <div className="flex justify-between py-2 text-sm">
          <span className="text-soft-gray">{t.cart.subtotal}</span>
          <span className="text-navy">{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-soft-gray">{t.cart.shipping}</span>
          <span className="text-navy">
            {shipping === 'free' ? t.cart.free : fmt(shipping)}
          </span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-soft-gray">{t.cart.tax}</span>
          <span className="text-navy">{fmt(tax)}</span>
        </div>

        <div className="flex justify-between pt-4 mt-4 border-t border-cream">
          <span className="text-lg font-semibold text-navy">{t.cart.total}</span>
          <span className="text-lg font-semibold text-navy">{fmt(total)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        className="w-full mt-6 relative z-10"
        onClick={onCheckout}
      >
        {t.cart.proceedToCheckout}
      </Button>
    </div>
  );
}

export default CartSummary;
