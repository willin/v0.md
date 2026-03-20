'use client';

import { useTranslation } from '@/i18n/client';
import { Locale } from '@/i18n/config';

interface FooterProps {
  locale: Locale | string;
}

export function Footer({ locale }: FooterProps) {
  const { t } = useTranslation(locale);

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Sitemap
            </a>
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              RSS
            </a>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Willin Wang. {t('footer.rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
