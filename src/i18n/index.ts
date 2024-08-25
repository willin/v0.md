import dlv from 'dlv';
import tmpl, { type Values } from 'templite';
import type { locales } from '../consts';
import en from './en.json';
import zh from './zh.json';

const messages = {
  zh,
  en
};

export const i18n =
  (lang: string) =>
  (key: string, params: Values = {}): string => {
    const val = dlv(messages?.[lang as keyof typeof locales], key, '');
    if (typeof val === 'function') return val(params);
    if (typeof val === 'string') return tmpl(val, params);
    return val;
  };
