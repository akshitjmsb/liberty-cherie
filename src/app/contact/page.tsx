'use client';

import { useState } from 'react';
import { Mail, MapPin, Instagram, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream via-white to-secondary-light/20 py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl lg:text-5xl text-charcoal mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-soft-gray">
              Have a question, want to place a custom order, or just want to say hello?
              We&apos;d love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-light/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">Email</h3>
                    <a
                      href="mailto:contact@libertycherie.ca"
                      className="text-soft-gray hover:text-primary transition-colors"
                    >
                      contact@libertycherie.ca
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-light/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">Location</h3>
                    <p className="text-soft-gray">
                      Saint-Sauveur, QC<br />
                      J0R 1K0, Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-light/30 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">Instagram</h3>
                    <a
                      href="https://instagram.com/libertycheriecreation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-soft-gray hover:text-primary transition-colors"
                    >
                      @libertycheriecreation
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-12 p-6 bg-cream rounded-2xl">
                <h3 className="font-display text-lg text-charcoal mb-2">
                  Response Time
                </h3>
                <p className="text-soft-gray text-sm">
                  We typically respond within 24-48 hours. For urgent inquiries,
                  please reach out via Instagram DM.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-8">
                Send a Message
              </h2>

              {status === 'success' ? (
                <div className="bg-secondary-light/20 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-display text-xl text-charcoal mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-soft-gray">
                    Thank you for reaching out. We&apos;ll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      className="form-input"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Question about custom orders"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="form-input resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
