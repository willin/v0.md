import dlv from 'dlv';
import tmpl, { type Values } from 'templite';
import { defaultLocale, locales } from '../consts';
import en from './en.json';
import zh from './zh.json';

const messages = {
  zh,
  en
};

export const i18n =
  (url: URL) =>
  (key: string, params: Values = {}): string => {
    const lang = getLocaleFromUrl(url);
    const val = dlv(messages?.[lang as keyof typeof locales], key, '');
    if (typeof val === 'function') return val(params);
    if (typeof val === 'string') return tmpl(val, params);
    return val;
  };

const langs = Object.keys(locales);
/**
 * Get Locale from URL
 * @param url
 * @returns zh | en
 */
export function getLocaleFromUrl(url: URL | string): string {
  const parts = (typeof url === 'string' ? url : url.pathname)
    .split('/')
    .filter((el) => el !== '');
  let match = '';
  for (const part of parts) {
    if (langs.includes(part)) match = part;
  }
  if (match) return match;
  return defaultLocale;
}

/**
 * Get Relative URL without Locale
 * @param url sth like: /zh/about/
 * @returns /about/
 */
export function getRelativeUrlWithoutLocale(url: URL | string): string {
  const parts = (typeof url === 'string' ? url : url.pathname)
    .split('/')
    .filter((el) => el !== '');
  const newParts = parts.filter((el) => !langs.includes(el));
  const u = `/${newParts.join('/')}`;
  return u.endsWith('/') ? u : `${u}/`;
}

/**
 * Get Locale URL
 * @param url /about/
 * @param locale zh | en
 * @returns /en/about/
 */
export function getLocaleUrl(
  url: URL | string,
  locale: string = defaultLocale
): string {
  const u = getRelativeUrlWithoutLocale(url);
  return locale === defaultLocale ? u : `/${locale}${u}`;
}
