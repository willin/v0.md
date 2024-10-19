import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeComponents from 'rehype-components';
import rehypeSlug from 'rehype-slug';
import remarkDirective from 'remark-directive';
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives';
import { defaultLocale, locales } from './src/consts';
import { AdmonitionComponent } from './src/plugins/rehype-component-admonition.mjs';
import { GithubCardComponent } from './src/plugins/rehype-component-github-card.mjs';
import { parseDirectiveNode } from './src/plugins/remark-directive-rehype';
import { remarkExcerpt } from './src/plugins/remark-excerpt';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

import react from '@astrojs/react';

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
  integrations: [mdx(), tailwind({
    applyBaseStyles: false,
    nesting: true
  }), icon({
    iconDir: 'src/assets/icons'
  }), sitemap({
    i18n: {
      locales,
      defaultLocale
    }
  }), react()],
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      remarkExcerpt,
      remarkGithubAdmonitionsToDirectives,
      remarkDirective,
      parseDirectiveNode
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeComponents,
        {
          components: {
            github: GithubCardComponent,
            note: (x, y) => AdmonitionComponent(x, y, 'note'),
            tip: (x, y) => AdmonitionComponent(x, y, 'tip'),
            important: (x, y) => AdmonitionComponent(x, y, 'important'),
            caution: (x, y) => AdmonitionComponent(x, y, 'caution'),
            warning: (x, y) => AdmonitionComponent(x, y, 'warning')
          }
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['anchor']
          },
          content: {
            type: 'element',
            tagName: 'span',
            properties: {
              className: ['anchor-icon'],
              'data-pagefind-ignore': true
            },
            children: [
              {
                type: 'text',
                value: '#'
              }
            ]
          }
        }
      ]
    ]
  },
  devToolbar: {
    enabled: false
  }
});