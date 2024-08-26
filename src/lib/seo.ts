import type { SEOProps } from 'astro-seo';
import { SITE_DOMAIN, SITE_TITLE } from '../consts';

export function getSeo(config: {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}): SEOProps {
  const {
    title = SITE_TITLE,
    description,
    image = new URL('/icon-512.png', SITE_DOMAIN).href,
    type = 'website',
    noindex = false
  } = config;

  return {
    title,
    description,
    openGraph: {
      basic: {
        type,
        title,
        image
      }
    },
    noindex,
    twitter: {
      creator: '@willinwang',
      card: config.image ? 'summary_large_image' : 'summary',
      image,
      title,
      description
    }
  };
}
