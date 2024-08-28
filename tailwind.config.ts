import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss/types/config';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: ['selector'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: () => ({
        transparent: 'transparent',
        current: 'currentColor',
        heading: {
          DEFAULT: 'var(--text-primary)'
        },
        primary: {
          DEFAULT: 'oklch(var(--text-card) / <alpha-value>)'
        },
        card: {
          DEFAULT: 'oklch(var(--bg-card) / <alpha-value>)'
        }
      })
    }
  },
  plugins: [typography]
};

export default config;
