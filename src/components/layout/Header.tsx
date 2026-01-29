'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, ChevronDown, Users, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchBar from '@/components/search/SearchBar';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Logo from '@/components/layout/Logo';

const navigation = [
  { name: 'Shop', href: '/products' },
  { name: 'Bags', href: '/products?category=bags' },
  { name: 'Pouches', href: '/products?category=pouches' },
  { name: 'Accessories', href: '/products?category=accessories' },
  { name: 'Custom Orders', href: '/custom-order' },
];

const shopForLinks = [
  { name: 'Chic City Commuter', href: '/shop-for/chic-commuter' },
  { name: 'Busy Quebec Mom', href: '/shop-for/busy-mom' },
  { name: 'Ethical Minimalist', href: '/shop-for/ethical-minimalist' },
  { name: 'Gift Ideas', href: '/shop-for/gift-professional' },
  { name: 'Stylish Traveler', href: '/shop-for/stylish-traveler' },
  { name: 'Arts & Culture Lover', href: '/shop-for/arts-culture' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopForOpen, setShopForOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const shopForRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const { openCart, getItemCount } = useCartStore();
  const rawWishlistCount = useWishlistStore().getItemCount();
  const rawItemCount = getItemCount();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const itemCount = mounted ? rawItemCount : 0;
  const wishlistCount = mounted ? rawWishlistCount : 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shopForRef.current && !shopForRef.current.contains(event.target as Node)) {
        setShopForOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smart scroll: hide on scroll-down, show on scroll-up
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < 50) {
      setHeaderHidden(false);
    } else if (currentScrollY > lastScrollY.current) {
      setHeaderHidden(true);
    } else {
      setHeaderHidden(false);
    }
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Active link helpers
  const isNavActive = (href: string) => {
    if (href === '/products') return pathname === '/products';
    if (href.includes('?category=')) {
      const cat = href.split('category=')[1];
      return pathname === '/products' && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('category') === cat;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isShopForActive = pathname.startsWith('/shop-for');

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream transition-transform duration-300 ${
          headerHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Announcement Bar — inside fixed header */}
        <AnnouncementBar />

        {/* Nav area with floral decorations */}
        <div className="relative">
          {/* Floral corner decorations - hidden on mobile */}
          <div
            className="hidden md:block absolute -top-4 -left-4 w-[80px] h-[80px] bg-contain bg-no-repeat opacity-10 -rotate-[15deg] pointer-events-none"
            style={{ backgroundImage: 'var(--floral-roses)' }}
          />
          <div
            className="hidden md:block absolute -top-4 -right-4 w-[70px] h-[70px] bg-contain bg-no-repeat opacity-10 rotate-[15deg] pointer-events-none"
            style={{ backgroundImage: 'var(--floral-wildflowers)' }}
          />

          <nav className="container flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="Liberty Chérie - Home">
              <Logo size="compact" className="sm:hidden" />
              <Logo size="full" className="hidden sm:block" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.slice(0, 1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${isNavActive(item.href) ? 'nav-link-active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Shop For Dropdown */}
              <div className="relative" ref={shopForRef}>
                <button
                  onClick={() => setShopForOpen(!shopForOpen)}
                  className={`nav-link flex items-center gap-1 ${isShopForActive ? 'nav-link-active' : ''}`}
                  aria-expanded={shopForOpen}
                  aria-haspopup="true"
                >
                  Shop For
                  <ChevronDown className={`w-4 h-4 transition-transform ${shopForOpen ? 'rotate-180' : ''}`} />
                </button>

                {shopForOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-cream py-2 animate-fade-in">
                    <Link
                      href="/shop-for"
                      className="flex items-center gap-2 px-4 py-2 text-navy hover:bg-cream hover:text-primary transition-colors font-medium"
                      onClick={() => setShopForOpen(false)}
                    >
                      <Users className="w-4 h-4" />
                      All Collections
                    </Link>
                    <div className="border-t border-cream my-2" />
                    {shopForLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-2 text-navy hover:bg-cream hover:text-primary transition-colors"
                        onClick={() => setShopForOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navigation.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${isNavActive(item.href) ? 'nav-link-active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <SearchBar />

              <Link
                href="/wishlist"
                className="p-2 text-navy hover:text-primary transition-colors relative"
                aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}` : ''}`}
              >
                <Heart className="w-[22px] h-[22px]" />
                {wishlistCount > 0 && (
                  <span className="cart-count" aria-hidden="true">{wishlistCount}</span>
                )}
              </Link>

              <button
                onClick={openCart}
                className="p-2 text-navy hover:text-primary transition-colors relative"
                aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? 's' : ''}` : ''}`}
              >
                <ShoppingBag className="w-[22px] h-[22px]" />
                {itemCount > 0 && (
                  <span className="cart-count" aria-hidden="true">{itemCount}</span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-navy"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-cream animate-fade-in">
            <div className="container py-4 space-y-2">
              <Link
                href="/products"
                className="block py-2 text-navy hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop All
              </Link>

              {/* Mobile Shop For Section */}
              <div className="py-2">
                <Link
                  href="/shop-for"
                  className="flex items-center gap-2 text-navy hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  Shop For...
                </Link>
                <div className="ml-6 mt-2 space-y-1">
                  {shopForLinks.slice(0, 4).map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block py-1 text-soft-gray hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/shop-for"
                    className="block py-1 text-primary text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View all →
                  </Link>
                </div>
              </div>

              {navigation.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-navy hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Spacer for fixed header — adjusts for announcement bar via CSS variable */}
      <div style={{ height: 'calc(72px + var(--announcement-height, 0px))' }} />
    </>
  );
}
