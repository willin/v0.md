import Link from 'next/link';
import { HeaderNav } from '@/components/blog/HeaderNav';
import { Footer } from '@/components/layout/Footer';
import { headers } from 'next/headers';

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-nextjs-pathname') || '';

  // 从 pathname 提取 locale
  const match = pathname.match(/^\/(zh|en)\//);
  const locale = match ? match[1] : 'zh';
  const isZh = locale === 'zh';

  return (
    <>
      <HeaderNav locale={locale as 'zh' | 'en'} dictionary={{ home: { localeToggle: { en: 'English', zh: '中文' }, themeToggle: { light: '浅色', dark: '深色', system: '系统' } }, nav: { home: '首页', blog: '博客' } }} />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            {isZh ? '页面未找到' : 'Page Not Found'}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isZh
              ? '抱歉，您访问的页面不存在'
              : 'Sorry, the page you are looking for does not exist'}
          </p>
          <Link
            href={`/${locale}`}
            className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {isZh ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </div>
      <Footer locale={locale as 'zh' | 'en'} />
    </>
  );
}
