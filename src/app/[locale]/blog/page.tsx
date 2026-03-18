import { getAllPosts, getAllCategories, getAllTags, getBlogStats } from '@/lib/blog';
import { BlogList } from '@/components/blog/BlogList';
import { HeaderNav } from '@/components/blog/HeaderNav';
import { getDictionary } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as any);

  return {
    title: locale === 'zh' ? '博客 - Willin Wang' : 'Blog - Willin Wang',
    description:
      locale === 'zh'
        ? '记录数字游民和 AI 创业的点点滴滴'
        : 'Sharing thoughts on digital nomadism and AI entrepreneurship',
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as any);
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();
  const stats = await getBlogStats();

  // 过滤当前语言的文章
  const filteredPosts = posts.filter((post) => post.locale === locale);

  return (
    <>
      <HeaderNav locale={locale as 'zh' | 'en'} dictionary={dictionary as any} />
      <BlogList posts={filteredPosts} categories={categories} tags={tags} locale={locale as 'zh' | 'en'} stats={stats} />
    </>
  );
}
