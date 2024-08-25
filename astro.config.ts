import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { filterSitemapByDefaultLocale, i18n } from 'astro-i18n-aut/integration';
import { defineConfig } from 'astro/config';
import { defaultLocale, locales } from './src/consts';

// https://astro.build/config
export default defineConfig({
  site: 'https://v0.md',
  output: 'static',
  build: {
    format: 'directory'
  },
  integrations: [
    tailwind(),
    mdx(),
    i18n({
      locales,
      defaultLocale
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale })
    })
  ]
});
