'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg">
        {/* Error Visual */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <AlertCircle className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Message */}
        <h1 className="font-display text-3xl lg:text-4xl text-navy mb-4">
          Something Went Wrong
        </h1>
        <p className="text-soft-gray text-lg mb-8 max-w-md mx-auto">
          We apologize for the inconvenience. An unexpected error occurred.
          Please try again or return to the homepage.
        </p>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-cream rounded-lg text-left">
            <p className="text-sm font-mono text-navy break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-soft-gray mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

        {/* Support Info */}
        <p className="text-soft-gray text-sm mt-8">
          If the problem persists, please{' '}
          <Link href="/contact" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
