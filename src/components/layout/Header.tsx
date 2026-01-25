'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag, Search, ChevronDown, Users } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import CartDrawer from '@/components/cart/CartDrawer';

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
  const shopForRef = useRef<HTMLDivElement>(null);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <nav className="container flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* Mobile: Icon only */}
            <Image
              src="/images/logo-icon.svg"
              alt="Liberty Chérie"
              width={40}
              height={40}
              className="sm:hidden"
              priority
            />
            {/* Desktop: Horizontal logo */}
            <Image
              src="/images/logo-horizontal.svg"
              alt="Liberty Chérie Creation"
              width={180}
              height={45}
              className="hidden sm:block"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.slice(0, 1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Shop For Dropdown */}
            <div className="relative" ref={shopForRef}>
              <button
                onClick={() => setShopForOpen(!shopForOpen)}
                className="flex items-center gap-1 text-charcoal hover:text-primary transition-colors font-medium"
                aria-expanded={shopForOpen}
                aria-haspopup="true"
              >
                Shop For
                <ChevronDown className={`w-4 h-4 transition-transform ${shopForOpen ? 'rotate-180' : ''}`} />
              </button>

              {shopForOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-fade-in">
                  <Link
                    href="/shop-for"
                    className="flex items-center gap-2 px-4 py-2 text-charcoal hover:bg-cream hover:text-primary transition-colors font-medium"
                    onClick={() => setShopForOpen(false)}
                  >
                    <Users className="w-4 h-4" />
                    All Collections
                  </Link>
                  <div className="border-t border-gray-100 my-2" />
                  {shopForLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-charcoal hover:bg-cream hover:text-primary transition-colors"
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
                className="text-charcoal hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="p-2 text-charcoal hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={openCart}
              className="p-2 text-charcoal hover:text-primary transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-charcoal"
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
            <div className="container py-4 space-y-2">
              <Link
                href="/products"
                className="block py-2 text-charcoal hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop All
              </Link>

              {/* Mobile Shop For Section */}
              <div className="py-2">
                <Link
                  href="/shop-for"
                  className="flex items-center gap-2 text-charcoal hover:text-primary transition-colors font-medium"
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
                  className="block py-2 text-charcoal hover:text-primary transition-colors font-medium"
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

      {/* Spacer for fixed header */}
      <div className="h-[72px]" />
    </>
  );
}
