import { getAllPosts, getAllCategories, getAllTags, getBlogStats } from '@/lib/blog';
import { BlogList } from '@/components/blog/BlogList';
import { BlogListSkeleton } from '@/components/blog/BlogListSkeleton';
import { HeaderNav } from '@/components/blog/HeaderNav';
import { getDictionary } from '@/i18n/config';
import { Locale } from '@/i18n/config';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  return {
    title: (dictionary as any).blog.title,
    description: (dictionary as any).blog.description,
  };
}

async function BlogContent({ locale }: { locale: string }) {
  const dictionary = await getDictionary(locale as Locale);
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();
  // 获取当前语言的统计信息
  const stats = await getBlogStats(locale as Locale);

  // 过滤当前语言的文章
  const filteredPosts = posts.filter((post) => post.locale === locale);

  return (
    <BlogList posts={filteredPosts} categories={categories} tags={tags} locale={locale} stats={stats} />
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HeaderNav locale={locale as 'zh' | 'en'} dictionary={{}} />
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogContent locale={locale} />
      </Suspense>
    </>
  );
}
