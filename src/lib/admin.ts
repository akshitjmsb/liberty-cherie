/**
 * Admin Utilities for Liberty Chérie Creation
 *
 * These functions are designed to be used via command line scripts
 * or a future admin dashboard. Run them using ts-node or similar.
 */

import { createServerClient } from './supabase';
import { Product, ProductCategory, Order, CustomOrderRequest } from '@/types';

// ============================================
// PRODUCT MANAGEMENT
// ============================================

/**
 * Add a new product to the database
 */
export async function addProduct(product: {
  name: string;
  name_fr?: string;
  slug: string;
  description: string;
  description_fr?: string;
  price: number;
  category: ProductCategory;
  tags?: string[];
  images?: string[];
  in_stock?: boolean;
  stock_quantity?: number;
  featured?: boolean;
}) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('products')
    .insert({
      ...product,
      currency: 'CAD',
      in_stock: product.in_stock ?? true,
      stock_quantity: product.stock_quantity ?? 0,
      featured: product.featured ?? false,
      tags: product.tags ?? [],
      images: product.images ?? [],
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an existing product
 */
export async function updateProduct(
  productId: string,
  updates: Partial<Product>
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a product
 */
export async function deleteProduct(productId: string) {
  const supabase = createServerClient();

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) throw error;
  return true;
}

/**
 * Update product stock
 */
export async function updateStock(productId: string, quantity: number) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('products')
    .update({
      stock_quantity: quantity,
      in_stock: quantity > 0,
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Set product as featured/unfeatured
 */
export async function setFeatured(productId: string, featured: boolean) {
  return updateProduct(productId, { featured });
}

// ============================================
// ORDER MANAGEMENT
// ============================================

/**
 * Get all orders with optional status filter
 */
export async function getOrders(status?: Order['status']) {
  const supabase = createServerClient();

  let query = supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  trackingNumber?: string
) {
  const supabase = createServerClient();

  const updates: Partial<Order> = { status };
  if (trackingNumber) {
    updates.tracking_number = trackingNumber;
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// CUSTOM ORDER REQUEST MANAGEMENT
// ============================================

/**
 * Get all custom order requests
 */
export async function getCustomOrderRequests(status?: CustomOrderRequest['status']) {
  const supabase = createServerClient();

  let query = supabase
    .from('custom_order_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Update custom order request status and add quote
 */
export async function updateCustomOrderRequest(
  requestId: string,
  updates: {
    status?: CustomOrderRequest['status'];
    quoted_price?: number;
    admin_notes?: string;
  }
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('custom_order_requests')
    .update(updates)
    .eq('id', requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// ANALYTICS / REPORTS
// ============================================

/**
 * Get sales summary for a date range
 */
export async function getSalesSummary(startDate: string, endDate: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('orders')
    .select('total, status, created_at')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .in('status', ['paid', 'processing', 'shipped', 'delivered']);

  if (error) throw error;

  const totalRevenue = data?.reduce((sum, order) => sum + order.total, 0) || 0;
  const orderCount = data?.length || 0;

  return {
    totalRevenue,
    orderCount,
    averageOrderValue: orderCount > 0 ? totalRevenue / orderCount : 0,
    orders: data,
  };
}

/**
 * Get low stock products
 */
export async function getLowStockProducts(threshold = 5) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .lte('stock_quantity', threshold)
    .eq('in_stock', true);

  if (error) throw error;
  return data;
}

// ============================================
// BULK OPERATIONS
// ============================================

/**
 * Import products from JSON array
 */
export async function bulkImportProducts(products: Parameters<typeof addProduct>[0][]) {
  const results = [];

  for (const product of products) {
    try {
      const result = await addProduct(product);
      results.push({ success: true, product: result });
    } catch (error) {
      results.push({ success: false, product: product.name, error });
    }
  }

  return results;
}

/**
 * Export all products to JSON
 */
export async function exportProducts() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
