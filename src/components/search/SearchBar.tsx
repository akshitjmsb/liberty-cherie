'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Loader2 } from 'lucide-react';
import { useProductSearch } from '@/hooks/useProductSearch';
import { categoryLabels } from '@/lib/products';

interface SearchBarProps {
  onClose?: () => void;
  variant?: 'header' | 'full';
}

export default function SearchBar({ onClose, variant = 'header' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { products, loading } = useProductSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        onClose?.();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery('');
      onClose?.();
    }
  };

  const handleProductClick = () => {
    setIsOpen(false);
    setQuery('');
    onClose?.();
  };

  const formatPrice = (price: number, currency: string = 'CAD') => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency,
    }).format(price);
  };

  const showDropdown = isOpen && query.length >= 2;

  if (variant === 'header') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-charcoal hover:text-primary transition-colors"
          aria-label="Search products"
          aria-expanded={isOpen}
        >
          <Search className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-10 py-3 border-b border-gray-100 focus:outline-none"
                aria-label="Search products"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray" />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-soft-gray" />
                </button>
              )}
            </form>

            {/* Results */}
            {showDropdown && (
              <div ref={dropdownRef} className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  </div>
                ) : products.length > 0 ? (
                  <div>
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug || product.id}`}
                        onClick={handleProductClick}
                        className="flex items-center gap-3 p-3 hover:bg-cream transition-colors"
                      >
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-cream flex-shrink-0">
                          {product.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-soft-gray text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-charcoal truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-soft-gray">
                            {categoryLabels[product.category]?.en || product.category}
                          </p>
                        </div>
                        <span className="text-primary font-medium">
                          {formatPrice(product.price, product.currency)}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href={`/products?search=${encodeURIComponent(query)}`}
                      onClick={handleProductClick}
                      className="block text-center py-3 text-primary hover:bg-cream transition-colors font-medium border-t border-gray-100"
                    >
                      View all results
                    </Link>
                  </div>
                ) : (
                  <div className="py-8 text-center text-soft-gray">
                    <p>No products found for &ldquo;{query}&rdquo;</p>
                    <Link
                      href="/products"
                      onClick={handleProductClick}
                      className="text-primary hover:underline mt-2 inline-block"
                    >
                      Browse all products
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Full variant (for mobile or dedicated search page)
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="form-input pl-10 pr-10"
          aria-label="Search products"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray" />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin" />
        )}
      </form>

      {/* Dropdown Results */}
      {showDropdown && products.length > 0 && (
        <div
          ref={dropdownRef}
          className="mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug || product.id}`}
              onClick={handleProductClick}
              className="flex items-center gap-3 p-3 hover:bg-cream transition-colors"
            >
              <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-cream flex-shrink-0">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-soft-gray text-xs">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-charcoal truncate">{product.name}</p>
                <p className="text-sm text-soft-gray">
                  {categoryLabels[product.category]?.en || product.category}
                </p>
              </div>
              <span className="text-primary font-medium">
                {formatPrice(product.price, product.currency)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
