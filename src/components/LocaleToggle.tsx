'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface LocaleToggleProps {
  currentLocale: string;
  dictionary: {
    home: {
      localeToggle: {
        en: string;
        zh: string;
      };
    };
  };
  variant?: 'header' | 'page';
}

export default function LocaleToggle({ currentLocale, dictionary, variant = 'page' }: LocaleToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  // 统一按钮样式
  const buttonBaseClass = variant === 'header'
    ? 'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200'
    : 'px-2 py-1 rounded text-sm transition-colors';

  const activeClass = variant === 'header'
    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 shadow-sm'
    : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium';

  const inactiveClass = variant === 'header'
    ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200';

  return (
    <div className={`flex gap-1${variant === 'header' ? ' border-r border-gray-300 dark:border-gray-600 pr-2' : ''}`}>
      <button
        onClick={() => switchLocale('en')}
        className={`${buttonBaseClass} ${currentLocale === 'en' ? activeClass : inactiveClass}`}
        title={dictionary.home.localeToggle.en}
        aria-label={dictionary.home.localeToggle.en}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('zh')}
        className={`${buttonBaseClass} ${currentLocale === 'zh' ? activeClass : inactiveClass}`}
        title={dictionary.home.localeToggle.zh}
        aria-label={dictionary.home.localeToggle.zh}
      >
        中文
      </button>
    </div>
  );
}
