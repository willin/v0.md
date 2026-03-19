import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getAllCategories, getAllTags, getBlogStats } from '@/lib/blog';
import { BlogDetailSidebar } from '@/components/blog/BlogDetailSidebar';
import { HeaderNav } from '@/components/blog/HeaderNav';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import Link from 'next/link';
import MDXContent from './MDXContent';
import { getDictionary } from '@/i18n/config';
import { PostHero } from '@/components/blog/PostHero';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
    locale: post.locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale as 'zh' | 'en');
  const dictionary = await getDictionary(locale as any);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - ${(dictionary as any).blog.postTitle.replace('{title}', '')}`.trim(),
    description: post.description,
    keywords: post.seo?.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.seo?.ogImage ? [{ url: post.seo.ogImage }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dictionary = await getDictionary(locale as any);
  const post = await getPostBySlug(slug, locale as 'zh' | 'en');

  if (!post) {
    notFound();
  }

  const categories = await getAllCategories();
  const tags = await getAllTags();
  // 获取当前语言的统计信息
  const stats = await getBlogStats(locale as 'zh' | 'en');

  const isZh = locale === 'zh';
  const dateStr = new Date(post.date).toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 查找上一篇和下一篇文章
  const allPosts = (await getAllPosts()).filter((p) => p.locale === locale);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <HeaderNav locale={locale as 'zh' | 'en'} dictionary={dictionary as any} />
      <ReadingProgress />
      <PostHero
        post={post}
        locale={locale}
        dateStr={dateStr}
        isZh={isZh}
      />
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
              {post.categories && post.categories.length > 0 && (
                <>
                  <li>/</li>
                  <li>
                    <span className="text-gray-700 dark:text-gray-300">{post.categories[0]}</span>
                  </li>
                </>
              )}
            </ol>
          </nav>

          {/* 文章头部信息（紧凑版） */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dateStr}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime.minutes} {isZh ? '分钟阅读' : 'min read'}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {Math.round(post.readingTime.words)} {isZh ? '字' : 'words'}
            </span>
            {post.categories && post.categories.length > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                {post.categories.join(', ')}
              </span>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 翻译提示 */}
          {post.translations && Object.keys(post.translations).length > 0 && (
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.148" />
                </svg>
                {isZh ? '提示：本文有英文版本' : 'Note: This article has an English version'}
                {post.translations.zh && locale !== 'zh' && (
                  <Link
                    href={`/zh/blog/${post.translations.zh}`}
                    className="underline hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {isZh ? '切换到中文版' : 'Switch to Chinese'}
                  </Link>
                )}
                {post.translations.en && locale !== 'en' && (
                  <Link
                    href={`/en/blog/${post.translations.en}`}
                    className="underline hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {isZh ? 'Switch to English' : '切换到英文版'}
                  </Link>
                )}
              </p>
            </div>
          )}

          {/* 文章内容 */}
          <div id="post-content">
            <MDXContent content={post.content} />
          </div>

          {/* 上一篇/下一篇导航 */}
          <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-4">
              {/* 上一篇按钮 */}
              {prevPost ? (
                <Link
                  href={`/${locale}/blog/${prevPost.slug}`}
                  className="group p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors block"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {isZh ? '← 上一篇' : '← Previous'}
                  </p>
                  <p className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {isZh ? '← 上一篇' : '← Previous'}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">
                    {isZh ? '没有上一篇' : 'No previous post'}
                  </p>
                </div>
              )}

              {/* 下一篇按钮 */}
              {nextPost ? (
                <Link
                  href={`/${locale}/blog/${nextPost.slug}`}
                  className="group p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors block md:col-start-2"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-right">
                    {isZh ? '下一篇 →' : 'Next →'}
                  </p>
                  <p className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 text-right">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 md:col-start-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-right">
                    {isZh ? '下一篇 →' : 'Next →'}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm text-right">
                    {isZh ? '没有下一篇' : 'No next post'}
                  </p>
                </div>
              )}
            </div>
          </nav>
        </article>

        {/* 侧边栏 */}
        <BlogDetailSidebar categories={categories} tags={tags} locale={locale as 'zh' | 'en'} stats={stats} />
      </div>
    </>
  );
}
