'use client';

import Link from 'next/link';
import PersonaCard from '@/components/persona/PersonaCard';
import { useTranslation } from '@/hooks/useTranslation';
import { Persona } from '@/types';

interface ShopForContentProps {
  personas: Persona[];
}

export default function ShopForContent({ personas }: ShopForContentProps) {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cream via-white to-accent-light py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl text-navy animate-fade-in">
              {t.shopFor.title}
            </h1>
            <p className="text-lg text-soft-gray mt-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
              {t.shopFor.description}
            </p>
          </div>
        </div>
      </section>

      {/* Personas Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {personas.map((persona, index) => (
              <div key={persona.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <PersonaCard persona={persona} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-cream">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl text-navy">
              {t.shopFor.notSure}
            </h2>
            <p className="text-soft-gray mt-4">
              {t.shopFor.notSureDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/products" className="btn-primary">
                {t.shopFor.viewAllProducts}
              </Link>
              <Link href="/contact" className="btn-secondary">
                {t.shopFor.contactUs}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
