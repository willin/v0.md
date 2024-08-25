import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://v0.md',
  output: 'static',
  build: {
    format: 'directory'
  }
});
