import typography from '@tailwindcss/typography';
import type { CSSRuleObject, PluginAPI } from 'tailwindcss/types/config';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor'
    }
  },
  plugins: [typography]
};
