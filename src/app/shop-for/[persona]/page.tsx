import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPersonaBySlug, getProductsByPersona, isValidPersonaSlug } from '@/lib/personas';
import { getProducts } from '@/lib/products';
import { PersonaSlug, Product } from '@/types';
import PersonaHero from '@/components/persona/PersonaHero';
import PersonaStructuredData from '@/components/persona/PersonaStructuredData';
import ProductGrid from '@/components/product/ProductGrid';

interface Props {
  params: Promise<{ persona: string }>;
}

// Mock products for fallback
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'floral-daisy-pouch',
    name: 'Floral Daisy Pouch',
    name_fr: 'Pochette Marguerite Florale',
    description: 'A beautiful handcrafted pouch featuring our signature daisy floral pattern.',
    description_fr: 'Une belle pochette artisanale avec notre motif floral marguerite signature.',
    price: 45,
    currency: 'CAD',
    images: ['/images/products/daisy-pouch-1.jpg'],
    category: 'pouches',
    tags: ['floral', 'daisy', 'handmade'],
    in_stock: true,
    stock_quantity: 10,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'victoria-rose-tote-bag',
    name: 'Victoria Rose Tote Bag',
    name_fr: 'Sac Fourre-tout Rose Victoria',
    description: 'An elegant tote bag featuring the Victoria rose pattern.',
    description_fr: 'Un élégant sac fourre-tout avec le motif rose Victoria.',
    price: 85,
    currency: 'CAD',
    images: ['/images/products/victoria-tote-1.jpg'],
    category: 'bags',
    tags: ['rose', 'victoria', 'tote'],
    in_stock: true,
    stock_quantity: 5,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'frida-kahlo-clutch',
    name: 'Frida Kahlo Collection Clutch',
    name_fr: 'Pochette Collection Frida Kahlo',
    description: 'Inspired by the vibrant artistry of Frida Kahlo.',
    description_fr: "Inspirée par l'art vibrant de Frida Kahlo.",
    price: 65,
    currency: 'CAD',
    images: ['/images/products/frida-clutch-1.jpg'],
    category: 'accessories',
    tags: ['frida-kahlo', 'clutch', 'colorful'],
    in_stock: true,
    stock_quantity: 8,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { persona: slug } = await params;

  if (!isValidPersonaSlug(slug)) {
    return {
      title: 'Collection Not Found | Liberty Chérie Creation',
    };
  }

  const persona = await getPersonaBySlug(slug as PersonaSlug);

  if (!persona) {
    return {
      title: 'Collection Not Found | Liberty Chérie Creation',
    };
  }

  const title = persona.seo_title || `${persona.name} | Liberty Chérie Creation`;
  const description = persona.seo_description || persona.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export const revalidate = 300; // Revalidate every 5 minutes

export default async function PersonaPage({ params }: Props) {
  const { persona: slug } = await params;

  if (!isValidPersonaSlug(slug)) {
    notFound();
  }

  const persona = await getPersonaBySlug(slug as PersonaSlug);

  if (!persona) {
    notFound();
  }

  // Try to get products for this persona
  let products = await getProductsByPersona(slug as PersonaSlug);

  // Fallback to all products if no persona-specific products
  if (products.length === 0) {
    const allProducts = await getProducts();
    products = allProducts.length > 0 ? allProducts : mockProducts;
  }

  return (
    <main className="min-h-screen">
      <PersonaStructuredData persona={persona} products={products} />

      {/* Hero Section */}
      <PersonaHero persona={persona} />

      {/* Products Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl text-charcoal">
              Recommended for You
            </h2>
            <span className="text-soft-gray">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          <ProductGrid products={products} />

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-soft-gray">
                No products found for this collection yet. Check back soon!
              </p>
              <a href="/products" className="btn-primary mt-4 inline-block">
                Browse All Products
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cream">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl text-charcoal">
              Looking for Something Special?
            </h2>
            <p className="text-soft-gray mt-4">
              We also offer custom orders. Tell us your vision and we&apos;ll create
              a unique piece just for you.
            </p>
            <a href="/custom-order" className="btn-primary mt-6 inline-block">
              Request Custom Order
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// Generate static params for all personas
export async function generateStaticParams() {
  const slugs: PersonaSlug[] = [
    'chic-commuter',
    'busy-mom',
    'ethical-minimalist',
    'gift-professional',
    'stylish-traveler',
    'arts-culture',
    'casual-dad',
    'market-explorer',
    'young-creative',
    'sport-wellness',
  ];

  return slugs.map((persona) => ({ persona }));
}
