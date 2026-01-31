import { useLocaleStore } from '@/store/locale';
import { dictionaries, type TranslationKeys } from '@/lib/i18n';

export function useTranslation() {
  const { locale, setLocale, toggleLocale } = useLocaleStore();
  const t: TranslationKeys = dictionaries[locale];
  return { t, locale, setLocale, toggleLocale };
}
