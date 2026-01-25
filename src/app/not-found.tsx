import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg">
        {/* 404 Visual */}
        <div className="relative mb-8">
          <span className="text-[10rem] font-display font-bold text-primary/10 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-4">
          Page Not Found
        </h1>
        <p className="text-soft-gray text-lg mb-8 max-w-md mx-auto">
          Oops! It looks like this page has wandered off. Don&apos;t worry,
          let&apos;s help you find your way back to our beautiful creations.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link href="/products" className="btn-secondary">
            Browse Products
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-cream">
          <p className="text-soft-gray text-sm mb-4">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/products" className="text-primary hover:underline">
              All Products
            </Link>
            <Link href="/shop-for" className="text-primary hover:underline">
              Shop by Lifestyle
            </Link>
            <Link href="/custom-order" className="text-primary hover:underline">
              Custom Orders
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
