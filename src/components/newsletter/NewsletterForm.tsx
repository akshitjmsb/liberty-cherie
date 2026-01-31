'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import InterestSelector from './InterestSelector';
import { PersonaSlug } from '@/types';

interface NewsletterFormProps {
  showInterests?: boolean;
  source?: string;
  compact?: boolean;
  className?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterForm({
  showInterests = false,
  source = 'website',
  compact = false,
  className = '',
}: NewsletterFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [interests, setInterests] = useState<PersonaSlug[]>([]);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage(t.newsletter.emailRequired);
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name: firstName || undefined,
          interests: interests.length > 0 ? interests : undefined,
          source,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || t.newsletter.subscribeToNewsletter);
        setEmail('');
        setFirstName('');
        setInterests([]);
      } else {
        setStatus('error');
        setMessage(data.error || t.newsletter.genericError);
      }
    } catch {
      setStatus('error');
      setMessage(t.newsletter.failedToSubscribe);
    }
  };

  if (status === 'success') {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(74,103,65,0.1)] mb-4">
          <CheckCircle className="w-8 h-8 text-[var(--success)]" />
        </div>
        <p className="text-lg font-medium text-navy">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-primary hover:text-primary-dark mt-4 text-sm underline"
        >
          {t.newsletter.subscribeAnother}
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.enterEmail}
              className="form-input pl-10"
              disabled={status === 'loading'}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary whitespace-nowrap"
          >
            {status === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              t.newsletter.subscribe
            )}
          </button>
        </div>
        {status === 'error' && (
          <div className="flex items-center gap-2 text-[var(--error)] text-sm mt-2">
            <AlertCircle className="w-4 h-4" />
            {message}
          </div>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="newsletter-name" className="form-label">
            {t.newsletter.firstName}
          </label>
          <input
            id="newsletter-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t.newsletter.firstNamePlaceholder}
            className="form-input"
            disabled={status === 'loading'}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="newsletter-email" className="form-label">
            {t.newsletter.emailAddress} <span className="text-[var(--error)]">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray" />
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.emailPlaceholder}
              required
              className="form-input pl-10"
              disabled={status === 'loading'}
            />
          </div>
        </div>

        {/* Interest Selector */}
        {showInterests && (
          <InterestSelector
            selected={interests}
            onChange={setInterests}
            disabled={status === 'loading'}
          />
        )}

        {/* Error Message */}
        {status === 'error' && (
          <div className="flex items-center gap-2 text-[var(--error)] text-sm bg-[var(--error)]/10 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary py-3"
        >
          {status === 'loading' ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              {t.newsletter.subscribing}
            </span>
          ) : (
            t.newsletter.subscribeToNewsletter
          )}
        </button>

        <p className="text-xs text-soft-gray text-center">
          {t.newsletter.privacyNote}
        </p>
      </div>
    </form>
  );
}
