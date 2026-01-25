import { Metadata } from 'next';
import { getActivePersonas } from '@/lib/personas';
import PersonaCard from '@/components/persona/PersonaCard';

export const metadata: Metadata = {
  title: 'Shop For | Liberty Chérie Creation',
  description:
    'Find the perfect handcrafted accessories for your lifestyle. Shop our curated collections designed for city commuters, busy moms, gift-givers, travelers, and more.',
  openGraph: {
    title: 'Shop For | Liberty Chérie Creation',
    description:
      'Find the perfect handcrafted accessories for your lifestyle. Shop our curated collections designed for city commuters, busy moms, gift-givers, travelers, and more.',
  },
};

export const revalidate = 300; // Revalidate every 5 minutes

export default async function ShopForPage() {
  const personas = await getActivePersonas();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cream via-white to-accent-light py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl text-charcoal animate-fade-in">
              Shop For Your Lifestyle
            </h1>
            <p className="text-lg text-soft-gray mt-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Find handcrafted accessories perfectly suited to your unique style and needs.
              Each collection is thoughtfully curated to help you discover pieces you&apos;ll love.
            </p>
          </div>
        </div>
      </section>

      {/* Personas Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {personas.map((persona, index) => (
              <div
                key={persona.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
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
            <h2 className="font-display text-2xl md:text-3xl text-charcoal">
              Not Sure What You&apos;re Looking For?
            </h2>
            <p className="text-soft-gray mt-4">
              Browse our full collection or reach out for personalized recommendations.
              We&apos;d love to help you find the perfect piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="/products" className="btn-primary">
                View All Products
              </a>
              <a href="/contact" className="btn-secondary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
