import { getFeaturedProducts, getProducts } from '@/lib/products';
import { getProductsByPersona } from '@/lib/personas';
import HomePageContent from './HomePageContent';

// Revalidate every 5 minutes
export const revalidate = 300;

// Mock featured products for initial development
const mockFeaturedProducts = [
  {
    id: '1',
    name: 'Floral Daisy Pouch',
    name_fr: 'Pochette Marguerite Florale',
    slug: 'floral-daisy-pouch',
    description: 'A beautiful handcrafted pouch featuring our signature daisy floral pattern.',
    description_fr: 'Une belle pochette artisanale avec notre motif floral marguerite signature.',
    price: 45.00,
    currency: 'CAD',
    images: ['/images/products/placeholder-1.jpg'],
    category: 'pouches' as const,
    tags: ['floral', 'daisy'],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Victoria Rose Tote Bag',
    name_fr: 'Sac Fourre-tout Rose Victoria',
    slug: 'victoria-rose-tote-bag',
    description: 'An elegant tote bag featuring the Victoria rose pattern.',
    description_fr: 'Un élégant sac fourre-tout avec le motif rose Victoria.',
    price: 85.00,
    currency: 'CAD',
    images: ['/images/products/placeholder-2.jpg'],
    category: 'bags' as const,
    tags: ['rose', 'tote'],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Frida Kahlo Clutch',
    name_fr: 'Pochette Frida Kahlo',
    slug: 'frida-kahlo-clutch',
    description: 'Inspired by Frida Kahlo with bold floral patterns.',
    description_fr: 'Inspirée de Frida Kahlo avec des motifs floraux audacieux.',
    price: 65.00,
    currency: 'CAD',
    images: ['/images/products/placeholder-3.jpg'],
    category: 'accessories' as const,
    tags: ['frida-kahlo', 'clutch'],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Liberty Crossbody Bag',
    name_fr: 'Sac Bandoulière Liberty',
    slug: 'liberty-crossbody-bag',
    description: 'Perfect for hands-free convenience while traveling or at festivals.',
    description_fr: 'Parfait pour une commodité mains libres en voyage ou aux festivals.',
    price: 75.00,
    currency: 'CAD',
    images: ['/images/products/placeholder-4.jpg'],
    category: 'bags' as const,
    tags: ['crossbody', 'travel'],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default async function HomePage() {
  // Try to fetch from Supabase, fall back to mock data
  let featuredProducts;
  try {
    featuredProducts = await getFeaturedProducts();
    if (featuredProducts.length === 0) {
      featuredProducts = mockFeaturedProducts;
    }
  } catch {
    featuredProducts = mockFeaturedProducts;
  }

  // Fetch products for persona sections
  let giftProducts;
  let travelProducts;
  try {
    giftProducts = await getProductsByPersona('gift-professional', 4);
    travelProducts = await getProductsByPersona('stylish-traveler', 4);

    // Fallback to all products if no persona-specific products
    if (giftProducts.length === 0 || travelProducts.length === 0) {
      const allProducts = await getProducts();
      if (giftProducts.length === 0) {
        giftProducts = allProducts.length > 0 ? allProducts.slice(0, 4) : mockFeaturedProducts.slice(0, 4);
      }
      if (travelProducts.length === 0) {
        travelProducts = allProducts.length > 0 ? allProducts.slice(0, 4) : mockFeaturedProducts.slice(0, 4);
      }
    }
  } catch {
    giftProducts = mockFeaturedProducts.slice(0, 4);
    travelProducts = mockFeaturedProducts.slice(0, 4);
  }

  return (
    <HomePageContent
      featuredProducts={featuredProducts}
      giftProducts={giftProducts}
      travelProducts={travelProducts}
    />
  );
}
