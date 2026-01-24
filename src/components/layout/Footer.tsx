import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Bags', href: '/products?category=bags' },
    { name: 'Pouches', href: '/products?category=pouches' },
    { name: 'Accessories', href: '/products?category=accessories' },
  ],
  services: [
    { name: 'Custom Orders', href: '/custom-order' },
    { name: 'Jacket Customization', href: '/custom-order?type=jacket-customization' },
  ],
  info: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Shipping & Returns', href: '/shipping' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream mt-20">
      {/* Decorative Border */}
      <div className="h-1 bg-gradient-to-r from-primary-light via-secondary-light to-accent-light" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-icon.svg"
                alt="Liberty Chérie"
                width={40}
                height={40}
              />
              <div>
                <span className="font-display text-xl text-charcoal">Liberty</span>
                <span className="font-display text-xl text-primary ml-1">Chérie</span>
              </div>
            </Link>
            <p className="text-soft-gray text-sm mb-4">
              Handcrafted bags, pouches, and accessories made with love in Saint-Sauveur, Quebec.
            </p>
            <div className="flex items-center gap-3 text-soft-gray">
              <a
                href="https://instagram.com/libertycheriecreation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@libertycherie.ca"
                className="hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display text-lg text-charcoal mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-soft-gray hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display text-lg text-charcoal mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-soft-gray hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg text-charcoal mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-soft-gray">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Saint-Sauveur, QC<br />J0R 1K0, Canada</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:contact@libertycherie.ca"
                  className="hover:text-primary transition-colors"
                >
                  contact@libertycherie.ca
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-soft-gray text-sm">
            © {currentYear} Liberty Chérie Creation. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-soft-gray">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
