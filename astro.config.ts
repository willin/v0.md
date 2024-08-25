import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://v0.md',
  output: 'static',
  build: {
    format: 'directory'
  },
  integrations: [tailwind(), sitemap(), mdx()]
});