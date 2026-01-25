'use client';

import Link from 'next/link';
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
} from 'lucide-react';
import { Persona } from '@/types';

interface PersonaCardProps {
  persona: Persona;
  compact?: boolean;
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

export default function PersonaCard({ persona, compact = false }: PersonaCardProps) {
  const Icon = iconMap[persona.icon || 'heart'] || Heart;

  if (compact) {
    return (
      <Link
        href={`/shop-for/${persona.slug}`}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream transition-colors group"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-charcoal group-hover:text-primary transition-colors truncate">
            {persona.name}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/shop-for/${persona.slug}`} className="group">
      <article className="card h-full">
        {/* Icon Header */}
        <div className="p-6 bg-gradient-to-br from-cream to-accent-light flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg text-charcoal group-hover:text-primary transition-colors">
            {persona.name}
          </h3>
          <p className="text-soft-gray text-sm mt-2 line-clamp-3">
            {persona.description}
          </p>
          <div className="mt-4 flex items-center text-primary font-medium text-sm">
            <span>Shop now</span>
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
