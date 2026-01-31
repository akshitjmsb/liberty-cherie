import type { Locale } from '@/types/locale';

/**
 * Pick the localized field from a data entity.
 * e.g. localized(product, 'name', 'fr') returns product.name_fr ?? product.name
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localized(
  entity: any,
  field: string,
  locale: Locale,
): string {
  if (locale === 'fr') {
    const frField = `${field}_fr`;
    const frValue = entity[frField];
    if (typeof frValue === 'string' && frValue.length > 0) {
      return frValue;
    }
  }
  const value = entity[field];
  return typeof value === 'string' ? value : '';
}

/**
 * Pick from a bilingual label object { en: string; fr: string }.
 */
export function localizedLabel(
  labels: { en: string; fr: string } | undefined,
  locale: Locale,
): string {
  if (!labels) return '';
  return labels[locale] || labels.en || '';
}
