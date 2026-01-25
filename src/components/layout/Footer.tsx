'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MapPin } from 'lucide-react';
import NewsletterFooter from '@/components/newsletter/NewsletterFooter';

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
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-icon.svg"
                alt="Liberty Chérie"
                width={40}
                height={40}
                className="brightness-0 invert"
              />
              <div>
                <span className="font-display text-xl text-white">Liberty</span>
                <span className="font-display text-xl text-primary-light ml-1">Chérie</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Handcrafted bags, pouches, and accessories made with love in Saint-Sauveur, Quebec.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/libertycheriecreation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@libertycherie.ca"
                className="text-gray-400 hover:text-primary-light transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display text-lg text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop For Links */}
          <div>
            <h3 className="font-display text-lg text-white mb-4">Shop For</h3>
            <ul className="space-y-2">
              {footerLinks.shopFor.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display text-lg text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg text-white mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Saint-Sauveur, QC<br />J0R 1K0, Canada</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:contact@libertycherie.ca"
                  className="hover:text-primary-light transition-colors"
                >
                  contact@libertycherie.ca
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Liberty Chérie Creation. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-primary-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
