'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface NewsletterFooterProps {
  className?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterFooter({ className = '' }: NewsletterFooterProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
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
          source: 'footer',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(t.footer.newsletterSubscribed);
        setEmail('');
        // Reset after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setMessage(data.error || t.newsletter.failedToSubscribe);
      }
    } catch {
      setStatus('error');
      setMessage(t.newsletter.connectionError);
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-2 text-[var(--success)] ${className}`}>
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--medium-gray)]" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder={t.newsletter.yourEmail}
            className="w-full pl-9 pr-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-[var(--medium-gray)] text-sm focus:outline-none focus:border-white/40"
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-r-lg transition-colors disabled:opacity-50"
          aria-label={t.newsletter.subscribe}
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
      {status === 'error' && (
        <div className="flex items-center gap-1 text-[var(--error)] text-xs mt-1">
          <AlertCircle className="w-3 h-3" />
          {message}
        </div>
      )}
    </form>
  );
}
