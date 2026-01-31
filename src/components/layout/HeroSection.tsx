'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const FLORAL_SPEEDS = [-0.03, -0.05, -0.04, -0.06, -0.08];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const floralRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const setFloralRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      floralRefs.current[index] = el;
    },
    []
  );

  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        if (!heroRef.current) {
          ticking.current = false;
          return;
        }
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom < 0) {
          ticking.current = false;
          return;
        }

        const y = window.scrollY;

        floralRefs.current.forEach((el, i) => {
          if (el) {
            el.style.transform = `translateY(${y * FLORAL_SPEEDS[i]}px)`;
          }
        });

        if (scrollIndicatorRef.current) {
          if (y > 100) {
            scrollIndicatorRef.current.classList.add('faded');
          } else {
            scrollIndicatorRef.current.classList.remove('faded');
          }
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="home-hero relative home-hero-gradient"
    >
      {/* Floral background decorations */}
      <div className="home-hero-floral home-hero-f1" ref={setFloralRef(0)} />
      <div className="home-hero-floral home-hero-f2" ref={setFloralRef(1)} />
      <div className="home-hero-floral home-hero-f3" ref={setFloralRef(2)} />
      <div className="home-hero-floral home-hero-f4" ref={setFloralRef(3)} />
      <div className="home-hero-floral home-hero-f5" ref={setFloralRef(4)} />

      <div className="container">
        <div className="home-hero-content grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <span className="home-hero-stagger-1 inline-block px-4 py-2 bg-primary-light/30 text-primary rounded-full text-sm font-medium mb-6">
              {t.hero.badge}
            </span>

            {/* Heading */}
            <h1 className="home-hero-stagger-2 font-display text-4xl md:text-5xl lg:text-6xl text-navy leading-tight">
              {t.hero.headingBeautiful}{' '}
              <span className="relative inline-block">
                <span className="text-primary">{t.hero.headingFloral}</span>
                <svg
                  className="home-hero-keyword-underline"
                  viewBox="0 0 120 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 C 20 2, 40 12, 60 6 S 100 2, 118 8"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>{' '}
              {t.hero.headingAccessories}
              <br />
              <span className="text-primary-dark">{t.hero.headingTagline}</span>
            </h1>

            {/* Paragraph */}
            <p className="home-hero-stagger-3 mt-6 text-lg text-soft-gray max-w-lg">
              {t.hero.paragraph}
            </p>

            {/* Social proof */}
            <div className="home-hero-stagger-4 mt-6 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <span className="text-sm text-soft-gray font-medium">
                {t.hero.socialProof}
              </span>
            </div>

            {/* CTAs */}
            <div className="home-hero-stagger-5 mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                {t.hero.ctaShop}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/custom-order" className="btn-secondary">
                {t.hero.ctaCustom}
              </Link>
            </div>
          </div>

          {/* Hero Image Collage */}
          <div className="hidden md:block relative">
            <div className="home-hero-collage">
              <div className="home-hero-collage-main">
                <Image
                  src="/images/products/hero-tote.jpg"
                  alt="Trousse Capucine en tissu Liberty floral sur osier"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="home-hero-collage-sm">
                <Image
                  src="/images/products/hero-pouch.jpg"
                  alt="Pochette en tissu Liberty bleu"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="home-hero-collage-sm">
                <Image
                  src="/images/products/hero-clutch.jpg"
                  alt="Trousse Liberty et accessoires assortis"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Floral decorations around collage frame */}
            <div className="home-hero-img-floral home-hero-img-f1" />
            <div className="home-hero-img-floral home-hero-img-f3" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="home-hero-scroll-indicator"
        aria-hidden="true"
      >
        <ChevronDown className="w-6 h-6 text-navy/40" />
      </div>
    </section>
  );
}
