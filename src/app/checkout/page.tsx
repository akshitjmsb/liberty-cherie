'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Lock, CreditCard, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface ShippingForm {
  email: string;
  name: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTax, getShipping, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [form, setForm] = useState<ShippingForm>({
    email: '',
    name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: 'QC',
    postal_code: '',
    country: 'CA',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images?.[0],
          })),
          shipping: form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Square Checkout
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-3xl text-navy mb-4">Your cart is empty</h1>
        <p className="text-soft-gray mb-8">Add some beautiful items to your cart first!</p>
        <Link href="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="container py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-soft-gray hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="font-display text-3xl text-navy mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h2 className="font-display text-xl text-navy mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                      inputMode="email"
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      autoComplete="tel"
                      inputMode="tel"
                      className="form-input"
                      placeholder="(514) 555-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="font-display text-xl text-navy mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                      autoComplete="name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="address_line1" className="form-label">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address_line1"
                      name="address_line1"
                      value={form.address_line1}
                      onChange={handleInputChange}
                      required
                      autoComplete="address-line1"
                      className="form-input"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label htmlFor="address_line2" className="form-label">
                      Apartment, suite, etc.
                    </label>
                    <input
                      type="text"
                      id="address_line2"
                      name="address_line2"
                      value={form.address_line2}
                      onChange={handleInputChange}
                      autoComplete="address-line2"
                      className="form-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="form-label">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleInputChange}
                        required
                        autoComplete="address-level2"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="form-label">
                        Province *
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={handleInputChange}
                        required
                        autoComplete="address-level1"
                        className="form-input"
                      >
                        <option value="QC">Quebec</option>
                        <option value="ON">Ontario</option>
                        <option value="BC">British Columbia</option>
                        <option value="AB">Alberta</option>
                        <option value="MB">Manitoba</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland</option>
                        <option value="PE">PEI</option>
                        <option value="NT">NWT</option>
                        <option value="YT">Yukon</option>
                        <option value="NU">Nunavut</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="postal_code" className="form-label">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        value={form.postal_code}
                        onChange={handleInputChange}
                        required
                        autoComplete="postal-code"
                        className="form-input"
                        placeholder="A1A 1A1"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleInputChange}
                        autoComplete="country"
                        className="form-input"
                      >
                        <option value="CA">Canada</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-[rgba(198,75,75,0.1)] border border-[var(--error)] rounded-lg text-[var(--error)]">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pay with Square
                  </span>
                )}
              </button>

              {/* Security Note */}
              <p className="flex items-center justify-center gap-2 text-sm text-soft-gray">
                <Lock className="w-4 h-4" />
                Secure checkout powered by Square
              </p>
            </form>
          </div>

          {/* Order Summary - Collapsible on Mobile */}
          <div className="lg:order-last">
            {/* Mobile Collapsible Header */}
            <button
              type="button"
              onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
              className="lg:hidden w-full bg-cream rounded-2xl p-4 flex items-center justify-between mb-4"
              aria-expanded={orderSummaryOpen}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="font-display text-lg text-navy">
                  Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg text-primary">{formatPrice(getTotal())}</span>
                {orderSummaryOpen ? (
                  <ChevronUp className="w-5 h-5 text-soft-gray" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-soft-gray" />
                )}
              </div>
            </button>

            {/* Order Summary Content */}
            <div className={`bg-cream rounded-2xl p-6 sticky top-24 ${orderSummaryOpen ? 'block' : 'hidden lg:block'}`}>
              <h2 className="font-display text-xl text-navy mb-6 hidden lg:block">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-white flex-shrink-0">
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--light-gray)]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-navy">{item.product.name}</h3>
                      <p className="text-soft-gray text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-cream pt-4 space-y-2">
                <div className="flex justify-between text-soft-gray">
                  <span>Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-soft-gray">
                  <span>Tax (QC)</span>
                  <span>{formatPrice(getTax())}</span>
                </div>
                <div className="flex justify-between text-soft-gray">
                  <span>Shipping</span>
                  <span>
                    {getShipping() === 0 ? (
                      <span className="text-secondary">Free</span>
                    ) : (
                      formatPrice(getShipping())
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-display text-xl text-navy pt-2 border-t border-cream">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(getTotal())}</span>
                </div>
              </div>

              {/* Free Shipping Note */}
              {getShipping() > 0 && (
                <p className="text-sm text-soft-gray mt-4 text-center">
                  Add {formatPrice(100 - getSubtotal())} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
