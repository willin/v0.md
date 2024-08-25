// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Willin Wang (v0)' as const;
export const SITE_DESCRIPTION = 'To be Willin is to be Willing.' as const;
export const SITE_DOMAIN = 'https://v0.md' as const;

export const defaultLocale = 'zh' as const;
export const locales = {
  en: 'en-US', // the `defaultLocale` value must present in `locales` keys
  zh: 'zh-CN'
} as const;
