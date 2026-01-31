'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Flower2, Sparkles, Heart, Truck, Gift, Plane, Star } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import PersonaSection from '@/components/persona/PersonaSection';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import Testimonials, { TestimonialStats } from '@/components/product/Testimonials';
import AnimatedSection from '@/components/ui/AnimatedSection';
import HeroSection from '@/components/layout/HeroSection';
import { useTranslation } from '@/hooks/useTranslation';
import { Product } from '@/types';

interface HomePageContentProps {
  featuredProducts: Product[];
  giftProducts: Product[];
  travelProducts: Product[];
}

export default function HomePageContent({
  featuredProducts,
  giftProducts,
  travelProducts,
}: HomePageContentProps) {
  const { t } = useTranslation();

  const features = useMemo(
    () => [
      {
        icon: Flower2,
        title: t.home.featureFabrics,
        description: t.home.featureFabricsDesc,
      },
      {
        icon: Sparkles,
        title: t.home.featureHandmade,
        description: t.home.featureHandmadeDesc,
      },
      {
        icon: Heart,
        title: t.home.featureCustom,
        description: t.home.featureCustomDesc,
      },
      {
        icon: Truck,
        title: t.home.featureShipping,
        description: t.home.featureShippingDesc,
      },
    ],
    [t]
  );

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
                key={index}
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
                {t.home.featuredTitle}
              </h2>
              <p className="mt-4 text-soft-gray max-w-2xl mx-auto">
                {t.home.featuredDesc}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <ProductGrid products={featuredProducts} />
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Link href="/products" className="btn-secondary">
                {t.home.viewAllProducts}
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
                {t.home.giftTitle}
              </h2>
              <p className="text-soft-gray mt-2">
                {t.home.giftDesc}
              </p>
            </div>
          </div>
          <PersonaSection
            title=""
            products={giftProducts}
            personaSlug="gift-professional"
            ctaText={t.home.shopGiftIdeas}
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
                {t.home.travelTitle}
              </h2>
              <p className="text-soft-gray mt-2">
                {t.home.travelDesc}
              </p>
            </div>
          </div>
          <PersonaSection
            title=""
            products={travelProducts}
            personaSlug="stylish-traveler"
            ctaText={t.home.shopTravelAccessories}
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
                {t.home.lifestyleTitle}
              </h2>
              <p className="text-soft-gray max-w-2xl mx-auto mb-8">
                {t.home.lifestyleDesc}
              </p>
              <Link href="/shop-for" className="btn-primary">
                {t.home.exploreCollections}
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
                {t.home.testimonialsTitle}
              </h2>
              <p className="text-soft-gray max-w-2xl mx-auto">
                {t.home.testimonialsDesc}
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
                {t.home.newsletterTitle}
              </h2>
              <p className="text-soft-gray mb-8">
                {t.home.newsletterDesc}
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
              {t.home.customTitle}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              {t.home.customDesc}
            </p>
            <Link
              href="/custom-order"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-medium hover:bg-cream transition-colors"
            >
              {t.home.requestCustomOrder}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Instagram Feed CTA */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-navy mb-4">
            {t.home.instagramTitle}
          </h2>
          <p className="text-soft-gray mb-8">
            {t.home.instagramDesc}
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
