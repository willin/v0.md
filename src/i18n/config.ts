import { notFound } from 'next/navigation';

export const i18n = {
  locales: ['en', 'zh'],
  defaultLocale: 'zh',
} as const;

export type Locale = typeof i18n.locales[number];

export function getCurrentLocale(): Locale {
  // This function would typically get locale from params, headers, etc.
  // For now, returning default locale
  return i18n.defaultLocale;
}

export function getDictionary(locale: Locale) {
  switch (locale) {
    case 'en':
      return import('./locales/en.json').then(module => module.default);
    case 'zh':
      return import('./locales/zh.json').then(module => module.default);
    default:
      notFound();
  }
}
