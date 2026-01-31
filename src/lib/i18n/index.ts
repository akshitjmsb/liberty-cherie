import { en, type TranslationKeys } from './en';
import { fr } from './fr';
import type { Locale } from '@/types/locale';

export type { TranslationKeys };

export const dictionaries: Record<Locale, TranslationKeys> = { en, fr };
