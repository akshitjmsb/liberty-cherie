'use client';

import { PersonaSlug } from '@/types';
import { personaLabels } from '@/lib/personas';

interface InterestSelectorProps {
  selected: PersonaSlug[];
  onChange: (interests: PersonaSlug[]) => void;
  disabled?: boolean;
  maxSelections?: number;
}

const interestOptions: { slug: PersonaSlug; label: string }[] = [
  { slug: 'chic-commuter', label: 'Work & Commute' },
  { slug: 'busy-mom', label: 'Family & Everyday' },
  { slug: 'gift-professional', label: 'Gifts & Special Occasions' },
  { slug: 'stylish-traveler', label: 'Travel & Festivals' },
  { slug: 'arts-culture', label: 'Art & Culture' },
  { slug: 'sport-wellness', label: 'Sport & Wellness' },
];

export default function InterestSelector({
  selected,
  onChange,
  disabled = false,
  maxSelections = 3,
}: InterestSelectorProps) {
  const handleToggle = (slug: PersonaSlug) => {
    if (selected.includes(slug)) {
      onChange(selected.filter((s) => s !== slug));
    } else if (selected.length < maxSelections) {
      onChange([...selected, slug]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-2">
        What interests you? (optional, select up to {maxSelections})
      </label>
      <div className="flex flex-wrap gap-2">
        {interestOptions.map(({ slug, label }) => {
          const isSelected = selected.includes(slug);
          const isDisabled = disabled || (!isSelected && selected.length >= maxSelections);

          return (
            <button
              key={slug}
              type="button"
              onClick={() => handleToggle(slug)}
              disabled={isDisabled}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-cream text-navy hover:bg-cream'
                }
                ${isDisabled && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              aria-pressed={isSelected}
              title={personaLabels[slug]?.shortDescription.en}
            >
              {label}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-soft-gray mt-2">
          {selected.length} of {maxSelections} selected
        </p>
      )}
    </div>
  );
}
