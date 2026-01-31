'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const STORAGE_KEY = 'lc-announcement-dismissed';

export default function AnnouncementBar() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
      document.documentElement.style.setProperty('--announcement-height', '36px');
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
    document.documentElement.style.setProperty('--announcement-height', '0px');
  };

  if (!visible) return null;

  return (
    <div
      className="bg-navy text-cream text-center text-xs tracking-wide font-body animate-slide-down"
      style={{ height: 36 }}
      role="banner"
      aria-label="Announcement"
    >
      <div className="container flex items-center justify-center h-full relative">
        <p className="px-8">{t.announcement.freeShipping}</p>
        <button
          onClick={dismiss}
          className="absolute right-0 p-2 text-cream/70 hover:text-cream transition-colors"
          aria-label={t.announcement.dismiss}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
