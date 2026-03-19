'use client';

interface FooterProps {
  locale: 'zh' | 'en';
}

export function Footer({ locale }: FooterProps) {
  const isZh = locale === 'zh';

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Willin Wang. {isZh ? '版权所有' : 'All rights reserved'}
          </p>
        </div>
      </div>
    </footer>
  );
}
