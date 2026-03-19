'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  dictionary: {
    home: {
      themeToggle: {
        light: string;
        dark: string;
        system: string;
      };
    };
  };
  variant?: 'header' | 'page';
}

export default function ThemeToggle({ dictionary, variant = 'page' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  // 统一按钮样式
  const buttonBaseClass = variant === 'header'
    ? 'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200'
    : 'p-2 rounded transition-colors';

  const activeClass = variant === 'header'
    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 shadow-sm'
    : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300';

  const inactiveClass = variant === 'header'
    ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200';

  // 统一图标尺寸
  const iconClass = 'w-5 h-5';

  return (
    <div className={`flex gap-1${variant === 'header' ? '' : ''}`}>
      <button
        onClick={() => setTheme('light')}
        className={`${buttonBaseClass} ${theme === 'light' ? activeClass : inactiveClass}`}
        title={dictionary.home.themeToggle.light}
        aria-label={dictionary.home.themeToggle.light}
      >
        {/* Sun icon */}
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`${buttonBaseClass} ${theme === 'dark' ? activeClass : inactiveClass}`}
        title={dictionary.home.themeToggle.dark}
        aria-label={dictionary.home.themeToggle.dark}
      >
        {/* Moon icon */}
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`${buttonBaseClass} ${theme === 'system' ? activeClass : inactiveClass}`}
        title={dictionary.home.themeToggle.system}
        aria-label={dictionary.home.themeToggle.system}
      >
        {/* Monitor/System icon */}
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}
