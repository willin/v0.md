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
export function getLocaleFromUrl(url: URL): string {
  const parts = url.pathname.split('/').filter((el) => el !== '');
  let match = '';
  for (const part of parts) {
    if (langs.includes(part)) match = part;
  }
  if (match) return match;
  return defaultLocale;
}
