import Link from 'next/link';
import { HeaderNav } from '@/components/blog/HeaderNav';
import { Footer } from '@/components/layout/Footer';
import { headers } from 'next/headers';
import { getDictionary } from '@/i18n/config';
import { Locale } from '@/i18n/config';

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-nextjs-pathname') || '';

  // 从 pathname 提取 locale
  const match = pathname.match(/^\/(zh|en)\//);
  const locale = (match ? match[1] : 'zh') as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <HeaderNav locale={locale} dictionary={dictionary as any} />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            {dictionary.notFound.title}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {dictionary.blog.notFound.description}
          </p>
          <Link
            href={`/${locale}`}
            className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {dictionary.notFound.backToHome}
          </Link>
        </div>
      </div>
      <Footer locale={locale} />
    </>
  );
}
