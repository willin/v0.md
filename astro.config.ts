import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
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
  i18n: {
    defaultLocale,
    locales: Object.keys(locales),
    routing: {
      prefixDefaultLocale: false,
      strategy: 'pathname',
      fallbackType: 'rewrite'
    }
  },
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false
    }),
    icon({
      iconDir: 'src/assets/icons'
    }),
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
