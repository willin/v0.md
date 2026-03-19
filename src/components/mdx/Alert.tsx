'use client';

import React from 'react';

interface AlertProps {
  type?: 'note' | 'tip' | 'warning' | 'caution' | 'important';
  children: React.ReactNode;
}

const alertConfig = {
  note: {
    title: 'Note',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    borderClass: 'border-blue-500',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    textClass: 'text-blue-800 dark:text-blue-300',
    iconClass: 'text-blue-500',
  },
  tip: {
    title: 'Tip',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    borderClass: 'border-amber-500',
    bgClass: 'bg-amber-50 dark:bg-amber-900/20',
    textClass: 'text-amber-800 dark:text-amber-300',
    iconClass: 'text-amber-500',
  },
  warning: {
    title: 'Warning',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    borderClass: 'border-yellow-500',
    bgClass: 'bg-yellow-50 dark:bg-yellow-900/20',
    textClass: 'text-yellow-800 dark:text-yellow-300',
    iconClass: 'text-yellow-500',
  },
  caution: {
    title: 'Caution',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    borderClass: 'border-red-500',
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    textClass: 'text-red-800 dark:text-red-300',
    iconClass: 'text-red-500',
  },
  important: {
    title: 'Important',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    borderClass: 'border-pink-500',
    bgClass: 'bg-pink-50 dark:bg-pink-900/20',
    textClass: 'text-pink-800 dark:text-pink-300',
    iconClass: 'text-pink-500',
  },
};

export default function Alert({ type = 'note', children }: AlertProps) {
  const config = alertConfig[type] || alertConfig.note;

  return (
    <div className={`my-6 border-l-4 ${config.borderClass} ${config.bgClass} rounded-r-lg overflow-hidden`}>
      <div className={`flex items-start gap-3 px-4 py-3 ${config.textClass}`}>
        <span className={`flex-shrink-0 ${config.iconClass}`}>
          {config.icon}
        </span>
        <div className="flex-1">
          <div className="text-sm opacity-90 [&>:first-child]:mt-0 [&>:last-child]:mb-0 prose prose-sm dark:prose-invert">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
