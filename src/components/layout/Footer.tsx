'use client';

import Link from 'next/link';
import { Instagram, Mail, MapPin } from 'lucide-react';
import NewsletterFooter from '@/components/newsletter/NewsletterFooter';
import TrustBadges from '@/components/ui/TrustBadges';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

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
      <div className="ft-f1" />
      <div className="ft-f2" />
      <div className="ft-f3" />
      <div className="ft-f4" />
      <div className="ft-f5" />
      <div className="ft-f6" />

      {/* Newsletter Section */}
      <div className="bg-primary py-8 relative z-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-display text-xl text-white">{t.footer.joinNewsletter}</h4>
              <p className="text-white/80 text-sm mt-1">
                {t.footer.newsletterSubtitle}
              </p>
            </div>
            <div className="w-full md:w-auto md:min-w-[320px]">
              <NewsletterFooter />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16 relative z-10">
        <div className="footer-grid">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
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
          <div>
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
          </div>

          {/* Shop For Links */}
          <div>
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
          </div>

          {/* Info & Contact */}
          <div>
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
            <div className="mt-4 space-y-3 text-sm text-white/70">
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
        <div className="mt-12 pt-8 border-t border-white/10">
          <TrustBadges
            variant="compact"
            showPaymentIcons={true}
            className="justify-center text-white/60 [&_svg]:text-white/60 [&_.text-soft-gray]:text-white/60"
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
    </footer>
  );
}
