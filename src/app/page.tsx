import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flower2, Sparkles, Heart, Truck, Gift, Plane, Star } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import { getFeaturedProducts, getProducts } from '@/lib/products';
import { getProductsByPersona } from '@/lib/personas';
import PersonaSection from '@/components/persona/PersonaSection';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import Testimonials, { TestimonialStats } from '@/components/product/Testimonials';
import AnimatedSection from '@/components/ui/AnimatedSection';
import HeroSection from '@/components/layout/HeroSection';

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

const features = [
  {
    icon: Flower2,
    title: 'Premium Liberty Fabrics',
    description: 'Each piece is crafted with authentic Liberty of London fabrics.',
  },
  {
    icon: Sparkles,
    title: 'Handmade with Love',
    description: 'Every item is carefully handcrafted in Saint-Sauveur, Quebec.',
  },
  {
    icon: Heart,
    title: 'Custom Orders Welcome',
    description: 'Transform your jacket or request a custom piece just for you.',
  },
  {
    icon: Truck,
    title: 'Free Shipping over $100',
    description: 'Enjoy free shipping on all orders over $100 CAD.',
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
    <div className="animate-fade-in">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection
                key={feature.title}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-light/20 text-primary mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-soft-gray text-sm">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl text-navy">
                Featured Creations
              </h2>
              <p className="mt-4 text-soft-gray max-w-2xl mx-auto">
                Our most loved pieces, handpicked for you. Each item is uniquely
                crafted with attention to detail.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <ProductGrid products={featuredProducts} />
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Link href="/products" className="btn-secondary">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Perfect for Gifting Section */}
      <section className="bg-white">
        <div className="container py-16">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy">
                Perfect for Gifting
              </h2>
              <p className="text-soft-gray mt-2">
                Looking for a thoughtful gift? Our handcrafted pieces make memorable presents for any occasion.
              </p>
            </div>
          </div>
          <PersonaSection
            title=""
            products={giftProducts}
            personaSlug="gift-professional"
            ctaText="Shop Gift Ideas"
            className="!py-0"
          />
        </div>
      </section>

      {/* Travel Essentials Section */}
      <section className="bg-cream">
        <div className="container py-16">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Plane className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-navy">
                Travel Essentials
              </h2>
              <p className="text-soft-gray mt-2">
                Compact, stylish accessories perfect for your next adventure, festival, or market visit.
              </p>
            </div>
          </div>
          <PersonaSection
            title=""
            products={travelProducts}
            personaSlug="stylish-traveler"
            ctaText="Shop Travel Accessories"
            className="!py-0"
          />
        </div>
      </section>

      {/* Shop by Lifestyle CTA */}
      <section className="py-16 bg-white">
        <div className="container">
          <AnimatedSection animation="zoom-in">
            <div className="bg-gradient-to-br from-cream to-accent-light rounded-2xl p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-3xl text-navy mb-4">
                Shop for Your Lifestyle
              </h2>
              <p className="text-soft-gray max-w-2xl mx-auto mb-8">
                Whether you&apos;re a busy mom, a stylish commuter, or an art lover, we have curated collections just for you.
              </p>
              <Link href="/shop-for" className="btn-primary">
                Explore Collections
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-navy mb-4">
                What Our Customers Say
              </h2>
              <p className="text-soft-gray max-w-2xl mx-auto">
                Join hundreds of happy customers who have discovered the beauty of handcrafted Liberty fabric accessories.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <TestimonialStats className="mb-12" />
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={400}>
            <Testimonials limit={3} variant="grid" />
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl text-navy mb-4">
                Stay in the Loop
              </h2>
              <p className="text-soft-gray mb-8">
                Subscribe to receive updates on new collections, exclusive offers, and behind-the-scenes content.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm showInterests source="homepage" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Custom Orders CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="font-display text-3xl lg:text-4xl mb-6">
              Want Something Unique?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Transform your favorite jacket with our custom floral appliqué service,
              or request a completely custom piece designed just for you.
            </p>
            <Link
              href="/custom-order"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-medium hover:bg-cream transition-colors"
            >
              Request Custom Order
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Instagram Feed CTA */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-navy mb-4">
            Follow Our Journey
          </h2>
          <p className="text-soft-gray mb-8">
            See our latest creations and behind-the-scenes moments on Instagram
          </p>
          <a
            href="https://instagram.com/libertycheriecreation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            @libertycheriecreation
          </a>
        </div>
      </section>
    </div>
  );
}
