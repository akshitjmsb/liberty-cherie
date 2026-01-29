import Image from 'next/image';
import Link from 'next/link';
import { Flower2, Heart, MapPin, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Liberty Chérie Creation - handcrafted bags and accessories made with love in Saint-Sauveur, Quebec.',
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream via-white to-primary-light/20 py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary-light/30 text-primary rounded-full text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 className="font-display text-4xl lg:text-5xl text-navy mb-6">
              Handcrafted with <span className="text-primary">Love</span> in Quebec
            </h1>
            <p className="text-lg text-soft-gray">
              Every stitch tells a story. Every pattern holds a memory. Welcome to Liberty Chérie Creation.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about-maker.jpg"
                  alt="The maker behind Liberty Chérie Creation"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-light rounded-full opacity-40 -z-10" />
            </div>

            <div>
              <h2 className="font-display text-3xl text-navy mb-6">
                The Heart Behind the Craft
              </h2>
              <div className="space-y-4 text-soft-gray">
                <p>
                  Liberty Chérie Creation was born from a passion for beautiful fabrics and the art
                  of handcrafting. Based in the charming town of Saint-Sauveur in the Laurentians,
                  each piece is created with meticulous attention to detail and a deep love for
                  timeless design.
                </p>
                <p>
                  Our journey began with a simple idea: to transform the world&apos;s most beautiful
                  Liberty of London fabrics into functional works of art. From elegant tote bags
                  to delicate pouches, every creation is designed to bring joy and beauty to
                  your everyday life.
                </p>
                <p>
                  What makes us special? We believe in slow fashion, sustainable practices, and
                  the irreplaceable value of handmade goods. When you carry a Liberty Chérie
                  piece, you carry a piece of our heart.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-primary">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Saint-Sauveur, Quebec, Canada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <h2 className="font-display text-3xl text-navy text-center mb-12">
            Our Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-light/20 flex items-center justify-center">
                <Flower2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl text-navy mb-3">Quality Materials</h3>
              <p className="text-soft-gray">
                We source only the finest Liberty of London fabrics and premium materials
                to ensure lasting beauty and durability.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary-light/30 flex items-center justify-center">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl text-navy mb-3">Made with Love</h3>
              <p className="text-soft-gray">
                Every stitch is placed with care, every seam finished with precision.
                Our pieces are made to be treasured for years to come.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-light/30 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl text-navy mb-3">Unique Designs</h3>
              <p className="text-soft-gray">
                No two pieces are exactly alike. We celebrate individuality and create
                accessories that reflect your personal style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="font-display text-3xl text-navy mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-soft-gray max-w-xl mx-auto mb-8">
            Browse our collection of handcrafted bags and accessories, or request a custom
            creation made just for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-primary">
              Shop Collection
            </Link>
            <Link href="/custom-order" className="btn-secondary">
              Request Custom Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
