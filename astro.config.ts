import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { defaultLocale, locales } from './src/consts';

// https://astro.build/config
export default defineConfig({
  site: 'https://v0.md',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      i18n: {
        locales,
        defaultLocale
      }
    })
  ],
  devToolbar: {
    enabled: false
  }
});
