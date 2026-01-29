'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Send, Sparkles, Palette, Shirt, Package, CheckCircle } from 'lucide-react';
import { CustomOrderType } from '@/types';

const orderTypes: { value: CustomOrderType; label: string; icon: typeof Shirt; description: string }[] = [
  {
    value: 'jacket-customization',
    label: 'Jacket Customization',
    icon: Shirt,
    description: 'Transform your jacket with custom floral appliqué',
  },
  {
    value: 'custom-bag',
    label: 'Custom Bag',
    icon: Package,
    description: 'Design a unique bag tailored to your preferences',
  },
  {
    value: 'custom-pouch',
    label: 'Custom Pouch',
    icon: Sparkles,
    description: 'Create a personalized pouch with your choice of fabric',
  },
  {
    value: 'other',
    label: 'Other Request',
    icon: Palette,
    description: 'Have something else in mind? Let us know!',
  },
];

const budgetRanges = [
  { value: 'under-50', label: 'Under $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200-plus', label: '$200+' },
  { value: 'flexible', label: 'Flexible' },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  request_type: CustomOrderType;
  description: string;
  preferred_colors: string;
  preferred_fabrics: string;
  budget_range: string;
  timeline: string;
}

function CustomOrderContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as CustomOrderType;

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    request_type: typeParam || 'jacket-customization',
    description: '',
    preferred_colors: '',
    preferred_fabrics: '',
    budget_range: '',
    timeline: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/custom-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="animate-fade-in">
        <div className="container py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="font-display text-3xl text-navy mb-4">
              Request Submitted!
            </h1>
            <p className="text-soft-gray mb-8">
              Thank you for your custom order request. We&apos;ll review it and get back
              to you within 2-3 business days with a quote and timeline.
            </p>
            <a href="/" className="btn-primary">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cream via-white to-primary-light/20 py-16">
        <div className="container text-center">
          <h1 className="font-display text-4xl text-navy mb-4">
            Custom Order Request
          </h1>
          <p className="text-soft-gray max-w-2xl mx-auto">
            Have something special in mind? We love creating custom pieces! Fill out
            the form below and we&apos;ll work with you to bring your vision to life.
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Order Type Selection */}
              <div>
                <h2 className="font-display text-xl text-navy mb-4">
                  What would you like to create?
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {orderTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.request_type === type.value
                          ? 'border-primary bg-primary/5'
                          : 'border-cream hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="request_type"
                        value={type.value}
                        checked={form.request_type === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <type.icon
                        className={`w-6 h-6 mb-2 ${
                          form.request_type === type.value
                            ? 'text-primary'
                            : 'text-soft-gray'
                        }`}
                      />
                      <span className="font-medium text-navy">{type.label}</span>
                      <span className="text-sm text-soft-gray">{type.description}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="font-display text-xl text-navy mb-4">
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
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
                      className="form-input"
                    />
                  </div>
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
                      className="form-input"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="form-label">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h2 className="font-display text-xl text-navy mb-4">
                  Project Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="description" className="form-label">
                      Describe your vision *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Tell us about your project idea. What size, style, or features are you looking for? If it's a jacket customization, please describe the jacket and where you'd like the floral details."
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferred_colors" className="form-label">
                        Preferred Colors
                      </label>
                      <input
                        type="text"
                        id="preferred_colors"
                        name="preferred_colors"
                        value={form.preferred_colors}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., Pink, sage green, cream"
                      />
                    </div>
                    <div>
                      <label htmlFor="preferred_fabrics" className="form-label">
                        Preferred Fabrics/Patterns
                      </label>
                      <input
                        type="text"
                        id="preferred_fabrics"
                        name="preferred_fabrics"
                        value={form.preferred_fabrics}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., Roses, daisies, geometric"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budget_range" className="form-label">
                        Budget Range
                      </label>
                      <select
                        id="budget_range"
                        name="budget_range"
                        value={form.budget_range}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">Select a range</option>
                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="form-label">
                        When do you need it by?
                      </label>
                      <input
                        type="text"
                        id="timeline"
                        name="timeline"
                        value={form.timeline}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., Within 2 weeks, No rush"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-[rgba(198,75,75,0.1)] border border-[var(--error)] rounded-lg text-[var(--error)]">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    <Send className="w-5 h-5" />
                    Submit Request
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Info Card */}
              <div className="bg-cream rounded-2xl p-6">
                <h3 className="font-display text-lg text-navy mb-4">
                  How It Works
                </h3>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <p className="font-medium text-navy">Submit Request</p>
                      <p className="text-sm text-soft-gray">
                        Tell us about your custom project idea
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-navy">Get a Quote</p>
                      <p className="text-sm text-soft-gray">
                        We&apos;ll review and send you a quote within 2-3 days
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <p className="font-medium text-navy">Create Together</p>
                      <p className="text-sm text-soft-gray">
                        We&apos;ll work with you to perfect the design
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                      4
                    </span>
                    <div>
                      <p className="font-medium text-navy">Receive Your Item</p>
                      <p className="text-sm text-soft-gray">
                        Your custom piece is crafted and shipped to you
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Contact Card */}
              <div className="bg-white border border-cream rounded-2xl p-6">
                <h3 className="font-display text-lg text-navy mb-2">
                  Questions?
                </h3>
                <p className="text-soft-gray text-sm mb-4">
                  Feel free to reach out directly if you have questions about custom orders.
                </p>
                <a
                  href="mailto:contact@libertycherie.ca"
                  className="text-primary hover:underline text-sm"
                >
                  contact@libertycherie.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomOrderPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center">Loading...</div>}>
      <CustomOrderContent />
    </Suspense>
  );
}
