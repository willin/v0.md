import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss/types/config';

function getCssSpring(interval = 2) {
  const spring = (t: number) =>
    -0.5 *
    Math.E ** (-6 * t) *
    (-2 * Math.E ** (6 * t) + Math.sin(12 * t) + 2 * Math.cos(12 * t));
  const percentage = Array.from(
    { length: 102 / interval },
    (_, i) => i * interval
  ).filter((i) => i <= 100);
  const values = percentage.map((i) => spring(i / 100));
  return percentage.map((i, index) => [i, values[index]]);
}

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: ['selector'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      cursor: {
        default: `url('/default.cur'),default`,
        pointer: `url('/pointer.cur'),pointer`
      },
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
        },
        content: {
          50: 'var(--content-50)',
          100: 'var(--content-100)',
          200: 'var(--content-200)',
          primary: 'oklch(var(--content-primary) / <alpha-value>)'
        }
      }),
      borderRadius: {
        card: '0.75rem' // rounded-xl
      },
      animation: {
        onload: 'fadeInUpSpring 1s linear forwards',
        onload_small: 'fadeInUpSpringSmall 0.5s linear forwards'
      },
      keyframes: {
        fadeInUpSpring: Object.fromEntries(
          getCssSpring().map(([i, v]) => {
            return [
              `${i}%`,
              {
                transform: `translateY(${(2 - 2 * v).toFixed(6)}rem)`,
                opacity: v.toFixed(2)
              }
            ];
          })
        ),
        fadeInUpSpringSmall: Object.fromEntries(
          getCssSpring().map(([i, v]) => {
            return [
              `${i}%`,
              {
                transform: `translateY(${(1 - 1 * v).toFixed(6)}rem)`,
                opacity: v.toFixed(2)
              }
            ];
          })
        )
      }
    }
  },
  plugins: [typography, require('tailwindcss-animated')]
};

export default config;
