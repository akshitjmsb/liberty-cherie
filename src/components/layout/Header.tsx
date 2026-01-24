'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import CartDrawer from '@/components/cart/CartDrawer';

const navigation = [
  { name: 'Shop', href: '/products' },
  { name: 'Bags', href: '/products?category=bags' },
  { name: 'Pouches', href: '/products?category=pouches' },
  { name: 'Accessories', href: '/products?category=accessories' },
  { name: 'Custom Orders', href: '/custom-order' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

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
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
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
            <div className="container py-4 space-y-4">
              {navigation.map((item) => (
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
