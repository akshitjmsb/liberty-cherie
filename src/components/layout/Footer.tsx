'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Mail, MapPin, ChevronUp } from 'lucide-react';
import TrustBadges from '@/components/ui/TrustBadges';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    shop: [
      { name: t.footer.allProducts, href: '/products' },
      { name: t.footer.bags, href: '/products?category=bags' },
      { name: t.footer.pouches, href: '/products?category=pouches' },
      { name: t.footer.accessories, href: '/products?category=accessories' },
    ],
    shopFor: [
      { name: t.footer.chicCommuter, href: '/shop-for/chic-commuter' },
      { name: t.footer.busyMom, href: '/shop-for/busy-mom' },
      { name: t.footer.giftIdeas, href: '/shop-for/gift-professional' },
      { name: t.footer.allCollections, href: '/shop-for' },
    ],
    info: [
      { name: t.footer.customOrders, href: '/custom-order' },
      { name: t.footer.aboutUs, href: '/about' },
      { name: t.footer.contact, href: '/contact' },
      { name: t.footer.shippingReturns, href: '/shipping' },
    ],
  };
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Floral decorations */}
      <div className="ft-f1" aria-hidden="true" />
      <div className="ft-f2" aria-hidden="true" />
      <div className="ft-f3" aria-hidden="true" />
      <div className="ft-f4" aria-hidden="true" />
      <div className="ft-f5" aria-hidden="true" />
      <div className="ft-f6" aria-hidden="true" />

      {/* Main Footer */}
      <div className="container py-12 md:py-16 relative z-10">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" className="footer-logo">
              <span className="font-display text-[32px] tracking-[8px] text-white">
                LIBERTY
              </span>
              <span className="font-display text-lg italic text-secondary tracking-[2px] -mt-1">
                chérie
              </span>
            </Link>
            <p className="text-white/60 text-sm mb-4 italic font-display">
              {t.footer.brandTagline}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/libertycheriecreation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@libertycherie.ca"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <nav aria-label={t.footer.shop}>
            <h4>{t.footer.shop}</h4>
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
          </nav>

          {/* Shop For Links */}
          <nav aria-label={t.footer.shopFor}>
            <h4>{t.footer.shopFor}</h4>
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
          </nav>

          {/* Info & Contact */}
          <nav aria-label={t.footer.infoContact}>
            <h4>{t.footer.infoContact}</h4>
            <ul className="space-y-2">
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
            <address className="mt-4 space-y-3 text-sm text-white/70 not-italic">
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
            </address>
          </nav>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <TrustBadges
            variant="compact"
            showPaymentIcons={true}
            theme="dark"
            className="justify-center"
          />
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} Liberty Chérie Creation. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {t.footer.privacyPolicy}
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              {t.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label={t.footer.backToTop}
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
