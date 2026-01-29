'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, ShoppingBag, ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';

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
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { openCart, getItemCount } = useCartStore();
  const rawWishlistCount = useWishlistStore().getItemCount();
  const rawItemCount = getItemCount();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const itemCount = mounted ? rawItemCount : 0;
  const wishlistCount = mounted ? rawWishlistCount : 0;

  const handleCartClick = () => {
    openCart();
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
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
                      active ? 'text-primary' : 'text-navy'
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

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full touch-target"
              aria-current={active ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 ${
                    active ? 'text-primary' : 'text-navy'
                  }`}
                />
                {item.label === 'Wishlist' && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
