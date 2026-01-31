'use client';

import {
  Briefcase,
  Heart,
  Leaf,
  Gift,
  Plane,
  Palette,
  Search,
  MapPin,
  Sparkles,
  Activity,
  LucideIcon,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { Persona } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { localized } from '@/lib/i18n/localize';

interface PersonaHeroProps {
  persona: Persona;
}

const iconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  heart: Heart,
  leaf: Leaf,
  gift: Gift,
  plane: Plane,
  palette: Palette,
  search: Search,
  'map-pin': MapPin,
  sparkles: Sparkles,
  activity: Activity,
};

export default function PersonaHero({ persona }: PersonaHeroProps) {
  const { t, locale } = useTranslation();
  const Icon = iconMap[persona.icon || 'heart'] || Heart;

  return (
    <section className="bg-gradient-to-b from-cream via-white to-accent-light py-16">
      <div className="container">
        {/* Breadcrumb */}
        <Link
          href="/shop-for"
          className="inline-flex items-center gap-2 text-soft-gray hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.shopFor.allCollections}</span>
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Icon */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-lg flex items-center justify-center animate-fade-in">
            <Icon className="w-16 h-16 md:w-20 md:h-20 text-primary" />
          </div>

          {/* Content */}
          <div className="text-center md:text-left flex-1">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-navy">
              {localized(persona, 'name', locale)}
            </h1>
            <p className="text-xl md:text-2xl text-primary mt-4 font-display">
              {localized(persona, 'headline', locale)}
            </p>
            <p className="text-soft-gray mt-4 max-w-2xl text-lg">
              {localized(persona, 'description', locale)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
