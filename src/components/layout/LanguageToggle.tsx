'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface LanguageToggleProps {
  variant?: 'default' | 'mobile-menu';
}

export default function LanguageToggle({ variant = 'default' }: LanguageToggleProps) {
  const { locale, toggleLocale } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleLocale}
      className={`lang-toggle ${variant === 'mobile-menu' ? 'lang-toggle-mobile' : ''}`}
      aria-label={locale === 'fr' ? 'Switch to English' : 'Passer au français'}
    >
      <span className={locale === 'en' ? 'lang-toggle-active' : ''}>EN</span>
      <span className="lang-toggle-separator">|</span>
      <span className={locale === 'fr' ? 'lang-toggle-active' : ''}>FR</span>
    </button>
  );
}
