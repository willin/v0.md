'use client';

import React from 'react';

interface CalloutProps {
  emoji?: string;
  title?: string;
  children: React.ReactNode;
  color?: 'default' | 'blue' | 'green' | 'red' | 'purple';
}

const colorConfig = {
  default: {
    bgClass: 'bg-gray-100 dark:bg-gray-800',
    borderClass: 'border-gray-300 dark:border-gray-600',
  },
  blue: {
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-300 dark:border-blue-600',
  },
  green: {
    bgClass: 'bg-green-50 dark:bg-green-900/20',
    borderClass: 'border-green-300 dark:border-green-600',
  },
  red: {
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    borderClass: 'border-red-300 dark:border-red-600',
  },
  purple: {
    bgClass: 'bg-purple-50 dark:bg-purple-900/20',
    borderClass: 'border-purple-300 dark:border-purple-600',
  },
};

export default function Callout({ emoji, title, children, color = 'default' }: CalloutProps) {
  const config = colorConfig[color];

  return (
    <div className={`my-6 p-4 border-l-4 ${config.borderClass} ${config.bgClass} rounded-r-lg`}>
      {(emoji || title) && (
        <div className="flex items-center gap-2 mb-2">
          {emoji && <span className="text-xl">{emoji}</span>}
          {title && <span className="font-semibold text-gray-900 dark:text-gray-100">{title}</span>}
        </div>
      )}
      <div className="prose prose-sm dark:prose-invert">
        {children}
      </div>
    </div>
  );
}
