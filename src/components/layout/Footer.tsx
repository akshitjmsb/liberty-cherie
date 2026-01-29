'use client';

import Link from 'next/link';
import { Instagram, Mail, MapPin } from 'lucide-react';
import NewsletterFooter from '@/components/newsletter/NewsletterFooter';
import TrustBadges from '@/components/ui/TrustBadges';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Bags', href: '/products?category=bags' },
    { name: 'Pouches', href: '/products?category=pouches' },
    { name: 'Accessories', href: '/products?category=accessories' },
  ],
  shopFor: [
    { name: 'Chic Commuter', href: '/shop-for/chic-commuter' },
    { name: 'Busy Mom', href: '/shop-for/busy-mom' },
    { name: 'Gift Ideas', href: '/shop-for/gift-professional' },
    { name: 'All Collections', href: '/shop-for' },
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
    <footer className="bg-charcoal text-white mt-20">
      {/* Newsletter Section */}
      <div className="bg-primary py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display text-xl text-white">Join Our Newsletter</h3>
              <p className="text-white/80 text-sm mt-1">
                Get updates on new arrivals and exclusive offers
              </p>
            </div>
            <div className="w-full md:w-auto md:min-w-[320px]">
              <NewsletterFooter />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex flex-col items-start mb-4">
              {/* Text-based logo for dark background - as per branding kit */}
              <span className="font-display text-[32px] tracking-[8px] text-white">
                LIBERTY
              </span>
              <span className="font-display text-lg italic text-secondary tracking-[2px] -mt-1">
                chérie
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4 italic font-display">
              Handcrafted bags, pouches, and accessories made with love in Saint-Sauveur, Quebec.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/libertycheriecreation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@libertycherie.ca"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-body text-[11px] font-medium tracking-[2px] uppercase text-secondary mb-6">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop For Links */}
          <div>
            <h3 className="font-body text-[11px] font-medium tracking-[2px] uppercase text-secondary mb-6">Shop For</h3>
            <ul className="space-y-2">
              {footerLinks.shopFor.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-body text-[11px] font-medium tracking-[2px] uppercase text-secondary mb-6">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-body text-[11px] font-medium tracking-[2px] uppercase text-secondary mb-6">Contact</h3>
            <div className="space-y-3 text-sm text-white/70">
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

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <TrustBadges
            variant="compact"
            showPaymentIcons={true}
            className="justify-center text-gray-400 [&_svg]:text-gray-400 [&_.text-soft-gray]:text-gray-400"
          />
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} Liberty Chérie Creation. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
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
