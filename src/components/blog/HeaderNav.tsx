'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import LocaleToggle from '@/components/LocaleToggle';

interface HeaderNavProps {
  locale: 'zh' | 'en';
  dictionary: {
    home: {
      localeToggle: {
        en: string;
        zh: string;
      };
      themeToggle: {
        light: string;
        dark: string;
        system: string;
      };
    };
    nav: {
      home: string;
      blog: string;
      about?: string;
      projects?: string;
    };
  };
}

export function HeaderNav({ locale, dictionary }: HeaderNavProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBlog = pathname?.includes('/blog');
  const isBlogPost = isBlog && pathname?.match(/\/blog\/[\w-]+$/);

  // 判断当前是否为活动链接
  const isActive = (href: string) => {
    if (href === '/') return pathname === `/${locale}`;
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || !isBlog || isBlogPost
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700'
          : 'bg-transparent border-transparent'
      }`}
      style={{
        viewTransitionName: 'header-nav',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 左侧：Logo 和标题 */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            style={{ viewTransitionName: 'logo-link' }}
          >
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="font-semibold text-lg">Willin Wang</span>
          </Link>

          {/* 中间：导航链接 */}
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className={`text-sm font-medium transition-colors ${
                isActive(`/${locale}`)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
              style={{ viewTransitionName: 'nav-home' }}
            >
              {dictionary.nav.home}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className={`text-sm font-medium transition-colors ${
                isActive(`/${locale}/blog`)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
              style={{ viewTransitionName: 'nav-blog' }}
            >
              {dictionary.nav.blog}
            </Link>
          </div>

          {/* 右侧：语言和主题切换 */}
          <div className="flex items-center gap-2">
            <LocaleToggle
              currentLocale={locale}
              dictionary={dictionary as any}
            />
            <ThemeToggle dictionary={dictionary as any} />
          </div>
        </div>
      </nav>
    </header>
  );
}
