'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { HeaderNav } from '@/components/blog/HeaderNav';
import { Footer } from '@/components/layout/Footer';
import { BlogDetailSidebar } from '@/components/blog/BlogDetailSidebar';

// 注意：not-found 组件无法获取分类、标签等数据，也无法检查翻译版本
// 因为它是错误边界组件，在服务端渲染时无法访问路由参数
export default function BlogNotFound() {
  // 使用 fallback，因为 params 可能为 undefined
  const params = useParams<{ locale: string; slug: string }>();
  const locale = params?.locale || 'zh';
  const slug = params?.slug || '';
  const isZh = locale === 'zh';

  // 静态字典数据
  const dictionary = {
    home: {
      localeToggle: { en: 'English', zh: '中文' },
      themeToggle: { light: '浅色', dark: '深色', system: '系统' }
    },
    nav: { home: '首页', blog: '博客' }
  };

  return (
    <>
      <HeaderNav locale={locale as 'zh' | 'en'} dictionary={dictionary as any} />
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-4 py-8">
        {/* 主内容区 */}
        <article className="flex-1 min-w-0">
          {/* 面包屑导航 */}
          <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-gray-700 dark:hover:text-gray-200">
                  {isZh ? '首页' : 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-gray-700 dark:hover:text-gray-200">
                  {isZh ? '博客' : 'Blog'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-700 dark:text-gray-300">
                {slug}
              </li>
            </ol>
          </nav>

          {/* 404 内容 */}
          <div className="text-center py-16">
            <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-700">404</h1>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
              {isZh ? '文章未找到' : 'Article Not Found'}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isZh
                ? '抱歉，您访问的文章不存在'
                : 'Sorry, the article you are looking for does not exist'}
            </p>

            <div className="mt-8 flex gap-4 justify-center">
              <Link
                href={`/${locale}/blog`}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {isZh ? '返回博客列表' : 'Back to Blog'}
              </Link>
              <Link
                href={`/${locale}`}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
              >
                {isZh ? '返回首页' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </article>

        {/* 侧边栏 */}
        <BlogDetailSidebar categories={[]} tags={[]} locale={locale as 'zh' | 'en'} stats={{ totalPosts: 0, totalWords: 0 }} />
      </div>
      <Footer locale={locale as 'zh' | 'en'} />
    </>
  );
}
