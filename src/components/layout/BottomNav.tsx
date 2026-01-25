'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, ShoppingBag, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isButton?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Shop', icon: ShoppingBag },
  { href: '#cart', label: 'Cart', icon: ShoppingCart, isButton: true },
  { href: '#menu', label: 'Menu', icon: Menu, isButton: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { openCart, getItemCount } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = getItemCount();

  const handleCartClick = () => {
    openCart();
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="fixed bottom-[calc(var(--bottom-nav-height)+var(--safe-area-inset-bottom))] left-0 right-0 bg-white z-40 md:hidden rounded-t-2xl shadow-lg animate-slide-up">
          <nav className="p-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-cream transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-cream transition-colors font-medium"
            >
              All Products
            </Link>
            <Link
              href="/products?category=bags"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-cream transition-colors"
            >
              Bags
            </Link>
            <Link
              href="/products?category=pouches"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-cream transition-colors"
            >
              Pouches
            </Link>
            <Link
              href="/products?category=accessories"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-cream transition-colors"
            >
              Accessories
            </Link>
            <hr className="border-cream" />
            <Link
              href="/custom-order"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-cream transition-colors font-medium text-primary"
            >
              Custom Order
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-cream transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-cream transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav
        className="bottom-nav md:hidden"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around h-[var(--bottom-nav-height)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = !item.isButton && isActive(item.href);

            if (item.href === '#cart') {
              return (
                <button
                  key={item.label}
                  onClick={handleCartClick}
                  className="flex flex-col items-center justify-center flex-1 h-full relative touch-target"
                  aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
                >
                  <div className="relative">
                    <Icon
                      className={`w-6 h-6 ${
                        active ? 'text-primary' : 'text-charcoal'
                      }`}
                    />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {itemCount > 99 ? '99+' : itemCount}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-1 ${
                      active ? 'text-primary font-medium' : 'text-soft-gray'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            }

            if (item.href === '#menu') {
              return (
                <button
                  key={item.label}
                  onClick={handleMenuClick}
                  className="flex flex-col items-center justify-center flex-1 h-full touch-target"
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? (
                    <X className="w-6 h-6 text-primary" />
                  ) : (
                    <Icon className="w-6 h-6 text-charcoal" />
                  )}
                  <span
                    className={`text-xs mt-1 ${
                      menuOpen ? 'text-primary font-medium' : 'text-soft-gray'
                    }`}
                  >
                    {menuOpen ? 'Close' : item.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full touch-target"
                aria-current={active ? 'page' : undefined}
              >
                <Icon
                  className={`w-6 h-6 ${
                    active ? 'text-primary' : 'text-charcoal'
                  }`}
                />
                <span
                  className={`text-xs mt-1 ${
                    active ? 'text-primary font-medium' : 'text-soft-gray'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
