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
}

export default function LocaleToggle({ currentLocale, dictionary }: LocaleToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-1 border-l border-gray-300 dark:border-gray-600 pl-2">
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 rounded text-sm transition-colors ${
          currentLocale === 'en'
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        title={dictionary.home.localeToggle.en}
        aria-label={dictionary.home.localeToggle.en}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('zh')}
        className={`px-2 py-1 rounded text-sm transition-colors ${
          currentLocale === 'zh'
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        title={dictionary.home.localeToggle.zh}
        aria-label={dictionary.home.localeToggle.zh}
      >
        中文
      </button>
    </div>
  );
}
