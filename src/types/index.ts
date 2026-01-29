// Product Types
export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  name_fr?: string;
  description: string;
  description_fr?: string;
  price: number;
  original_price?: number;
  currency: string;
  images: string[];
  category: ProductCategory;
  tags: string[];
  in_stock: boolean;
  stock_quantity?: number;
  featured: boolean;
  colors?: ProductColor[];
  badge?: 'new' | 'sale' | 'soldout';
  created_at: string;
  updated_at: string;
}

export type ProductCategory =
  | 'bags'
  | 'pouches'
  | 'accessories'
  | 'custom-jackets'
  | 'other';

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price_modifier: number;
  in_stock: boolean;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  variant_id?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Order Types
export interface Order {
  id: string;
  customer_email: string;
  customer_name: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  stripe_payment_intent_id?: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  variant_id?: string;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

// Custom Order Request Types
export interface CustomOrderRequest {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  request_type: CustomOrderType;
  description: string;
  reference_images?: string[];
  budget_range?: string;
  timeline?: string;
  status: CustomOrderStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export type CustomOrderType =
  | 'jacket-customization'
  | 'custom-bag'
  | 'custom-pouch'
  | 'other';

export type CustomOrderStatus =
  | 'new'
  | 'reviewing'
  | 'quoted'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

// UI Types
export interface FilterOptions {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'name';
}

// Persona Types
export type PersonaSlug =
  | 'chic-commuter'
  | 'busy-mom'
  | 'ethical-minimalist'
  | 'gift-professional'
  | 'stylish-traveler'
  | 'arts-culture'
  | 'casual-dad'
  | 'market-explorer'
  | 'young-creative'
  | 'sport-wellness';

export interface Persona {
  id: string;
  slug: PersonaSlug;
  name: string;
  name_fr: string;
  description: string;
  description_fr: string;
  headline: string;
  headline_fr: string;
  icon?: string;
  hero_image?: string;
  seo_title?: string;
  seo_title_fr?: string;
  seo_description?: string;
  seo_description_fr?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface ProductPersona {
  id: string;
  product_id: string;
  persona_id: string;
  relevance_score: number;
  created_at: string;
}

// Newsletter Types
export interface NewsletterSubscriber {
  id: string;
  email: string;
  first_name?: string;
  language: 'en' | 'fr';
  interests: PersonaSlug[];
  source?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface NewsletterSubscribeRequest {
  email: string;
  first_name?: string;
  language?: 'en' | 'fr';
  interests?: PersonaSlug[];
  source?: string;
}
