import { supabase } from './supabase';
import { Product, FilterOptions, ProductCategory } from '@/types';

export async function getProducts(filters?: FilterOptions): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .eq('in_stock', true);

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice);
  }

  if (filters?.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice);
  }

  if (filters?.inStockOnly) {
    query = query.gt('stock_quantity', 0);
  }

  // Sorting
  switch (filters?.sortBy) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'name':
      query = query.order('name', { ascending: true });
      break;
    default:
      query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as Product[];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .eq('in_stock', true)
    .limit(6);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data as Product;
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data as Product;
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('in_stock', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data as Product[];
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`)
    .eq('in_stock', true);

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }

  return data as Product[];
}

// Category labels for display
export const categoryLabels: Record<ProductCategory, { en: string; fr: string }> = {
  'bags': { en: 'Bags', fr: 'Sacs' },
  'pouches': { en: 'Pouches', fr: 'Pochettes' },
  'accessories': { en: 'Accessories', fr: 'Accessoires' },
  'custom-jackets': { en: 'Custom Jackets', fr: 'Vestes Personnalisées' },
  'other': { en: 'Other', fr: 'Autres' },
};
