'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SortAsc } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import { Product, ProductCategory, FilterOptions } from '@/types';
import { getProducts, categoryLabels } from '@/lib/products';

const categories: ProductCategory[] = ['bags', 'pouches', 'accessories', 'custom-jackets'];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name' },
];

// Mock products for development
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Floral Daisy Pouch',
    slug: 'floral-daisy-pouch',
    description: 'A beautiful handcrafted pouch featuring our signature daisy floral pattern.',
    price: 45.00,
    currency: 'CAD',
    images: ['/images/products/placeholder-1.jpg'],
    category: 'pouches',
    tags: ['floral', 'daisy'],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Victoria Rose Tote Bag',
    slug: 'victoria-rose-tote-bag',
    description: 'An elegant tote bag featuring the Victoria rose pattern.',
    price: 85.00,
    currency: 'CAD',
    images: ['/images/products/placeholder-2.jpg'],
    category: 'bags',
    tags: ['rose', 'tote'],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Frida Kahlo Clutch',
    slug: 'frida-kahlo-clutch',
    description: 'Inspired by Frida Kahlo with bold floral patterns.',
    price: 65.00,
    currency: 'CAD',
    images: ['/images/products/placeholder-3.jpg'],
    category: 'accessories',
    tags: ['frida-kahlo', 'clutch'],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Lone Flower Scrunchie Set',
    slug: 'lone-flower-scrunchie-set',
    description: 'Set of 3 handmade scrunchies featuring our Lone Flower pattern.',
    price: 28.00,
    currency: 'CAD',
    images: ['/images/products/placeholder-4.jpg'],
    category: 'accessories',
    tags: ['scrunchie', 'hair'],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    category: (searchParams.get('category') as ProductCategory) || undefined,
    sortBy: 'featured',
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts(filters);
      if (data.length > 0) {
        setProducts(data);
      } else {
        // Use mock data if no products from DB
        let filtered = [...mockProducts];
        if (filters.category) {
          filtered = filtered.filter(p => p.category === filters.category);
        }
        setProducts(filtered);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category') as ProductCategory;
    if (categoryParam && categoryParam !== filters.category) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [searchParams, filters.category]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-cream py-12">
        <div className="container">
          <h1 className="font-display text-4xl text-charcoal text-center">
            {filters.category
              ? categoryLabels[filters.category]?.en || 'Products'
              : 'All Products'}
          </h1>
          <p className="text-soft-gray text-center mt-4 max-w-2xl mx-auto">
            Explore our collection of handcrafted pieces, each made with love and premium Liberty fabrics.
          </p>
        </div>
      </section>

      <div className="container py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Category Filter - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setFilters({ ...filters, category: undefined })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !filters.category
                    ? 'bg-primary text-white'
                    : 'bg-cream text-charcoal hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters({ ...filters, category: cat })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.category === cat
                      ? 'bg-primary text-white'
                      : 'bg-cream text-charcoal hover:bg-gray-200'
                  }`}
                >
                  {categoryLabels[cat]?.en}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4 text-soft-gray" />
            <select
              value={filters.sortBy || 'featured'}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })
              }
              className="form-input py-2 px-3 text-sm w-auto"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <div className="md:hidden mb-6 p-4 bg-cream rounded-lg animate-fade-in">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setFilters({ ...filters, category: undefined });
                  setShowFilters(false);
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  !filters.category ? 'bg-primary text-white' : 'bg-white'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilters({ ...filters, category: cat });
                    setShowFilters(false);
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.category === cat ? 'bg-primary text-white' : 'bg-white'
                  }`}
                >
                  {categoryLabels[cat]?.en}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} />

        {/* Results Count */}
        {!loading && (
          <p className="text-center text-soft-gray mt-8">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductGrid products={[]} loading={true} />}>
      <ProductsContent />
    </Suspense>
  );
}
