'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { searchProducts } from '@/lib/products';

export interface SearchResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProductSearch(query: string, debounceMs: number = 300): SearchResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await searchProducts(debouncedQuery);
        setProducts(results.slice(0, 6)); // Limit to 6 results for autocomplete
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  return { products, loading, error };
}

// Hook for getting search suggestions (product names only)
export function useSearchSuggestions(query: string): string[] {
  const { products } = useProductSearch(query);
  return products.map((p) => p.name);
}
