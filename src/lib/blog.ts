import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogPostSummary, BlogFrontmatter } from '@/types/blog';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 使用 import.meta.url 获取当前文件路径（ESM 标准方式）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 博客内容目录路径
// - Cloudflare Workers 环境：Wrangler rules 将 MDX 文件打包到 /bundle/content/blog
// - 本地开发环境：使用 src/content/blog
// 使用 try-catch 判断：/bundle 目录存在则为 CF 环境，否则为本地环境
let blogDirectory: string;
try {
  readdirSync('/bundle/content/blog');
  blogDirectory = '/bundle/content/blog';
} catch {
  blogDirectory = path.join(__dirname, '../content/blog');
}

/**
 * 从文件名提取 slug、日期和语言
 * 格式：YYYY-MM-DD-SLUG.zh.mdx 或 YYYY-MM-DD-SLUG.en.mdx
 */
function parseFilename(filename: string): { slug: string; date: string; locale: 'zh' | 'en' } | null {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(zh|en)\.mdx$/);
  if (!match) return null;

  const [, dateStr, slug, locale] = match;
  return {
    slug,
    date: new Date(dateStr).toISOString(),
    locale: locale as 'zh' | 'en',
  };
}

/**
 * 生成 SEO 数据
 */
function generateSeo(frontmatter: BlogFrontmatter): { keywords: string[]; ogImage?: string } {
  const keywords = [
    ...(frontmatter.tags || []),
    ...(frontmatter.categories || []),
  ].filter(Boolean);

  return {
    keywords,
    ogImage: frontmatter.cover?.image,
  };
}

/**
 * 固定的作者信息
 */
const AUTHOR = {
  name: 'Willin Wang',
  avatar: '/avatar.jpg',
  title: '数字游民 & AI 创业者',
};

/**
 * 检测文章是否有其他语言的翻译版本
 */
function findTranslations(
  slug: string,
  allFiles: Array<{ slug: string; locale: string }>
): { zh?: string; en?: string } {
  const translations: { zh?: string; en?: string } = {};

  for (const file of allFiles) {
    if (file.slug === slug) {
      if (file.locale === 'zh') {
        translations.zh = slug;
      } else if (file.locale === 'en') {
        translations.en = slug;
      }
    }
  }

  // 只有当两种语言都存在时才返回 translations
  return Object.keys(translations).length > 1 ? translations : {};
}

/**
 * 获取所有博客文章（用于列表页）
 */
export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const files = readdirSync(blogDirectory);

  const posts: BlogPostSummary[] = [];

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;

    const parsed = parseFilename(file);
    if (!parsed) continue;

    const filePath = path.join(blogDirectory, file);
    const fileContent = readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    // 查找翻译版本
    const translations = findTranslations(parsed.slug, files.map(f => {
      const p = parseFilename(f);
      return p ? { slug: p.slug, locale: p.locale } : null;
    }).filter(Boolean) as Array<{ slug: string; locale: string }>);

    posts.push({
      slug: parsed.slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: parsed.date,
      locale: parsed.locale,
      tags: data.tags || [],
      categories: data.categories || [],
      cover: data.cover,
      readingTime: readingTime(fileContent),
      hasTranslation: Object.keys(translations).length > 0,
    });
  }

  // 按日期倒序排序
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 根据 slug 获取博客文章详情
 */
export async function getPostBySlug(
  slug: string,
  locale: 'zh' | 'en'
): Promise<BlogPost | null> {
  const files = readdirSync(blogDirectory);

  // 查找匹配的文件
  const targetFile = files.find((file) => {
    const parsed = parseFilename(file);
    return parsed?.slug === slug && parsed.locale === locale;
  });

  if (!targetFile) return null;

  const filePath = path.join(blogDirectory, targetFile);
  const fileContent = readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);
  const parsed = parseFilename(targetFile)!;
  const translations = findTranslations(slug, files.map(f => {
    const p = parseFilename(f);
    return p ? { slug: p.slug, locale: p.locale } : null;
  }).filter(Boolean) as Array<{ slug: string; locale: string }>);

  // Type assertion for frontmatter data
  const frontmatter = data as BlogFrontmatter;

  return {
    title: frontmatter.title || 'Untitled',
    description: frontmatter.description || '',
    categories: frontmatter.categories || [],
    tags: frontmatter.tags || [],
    cover: frontmatter.cover,
    slug: parsed.slug,
    date: parsed.date,
    updated: parsed.date,
    locale: parsed.locale,
    translations: Object.keys(translations).length > 0 ? translations : undefined,
    readingTime: readingTime(content),
    seo: generateSeo(frontmatter),
    author: AUTHOR,
    content,
  } as BlogPost;
}

/**
 * 获取所有分类
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set<string>();

  for (const post of posts) {
    if (post.categories) {
      post.categories.forEach((cat) => categories.add(cat));
    }
  }

  return Array.from(categories).sort();
}

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  for (const post of posts) {
    if (post.tags) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  }

  return Array.from(tags).sort();
}

/**
 * 根据分类筛选文章
 */
export async function getPostsByCategory(category: string): Promise<BlogPostSummary[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.categories?.includes(category));
}

/**
 * 根据标签筛选文章
 */
export async function getPostsByTag(tag: string): Promise<BlogPostSummary[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags?.includes(tag));
}

/**
 * 获取博客统计信息
 * @param locale 可选，指定语言则只统计该语言的文章
 */
export async function getBlogStats(locale?: 'zh' | 'en'): Promise<{ totalPosts: number; totalWords: number }> {
  const posts = await getAllPosts();
  const filteredPosts = locale ? posts.filter((post) => post.locale === locale) : posts;
  const totalPosts = filteredPosts.length;
  const totalWords = filteredPosts.reduce((sum, post) => sum + Math.round(post.readingTime.words), 0);
  return { totalPosts, totalWords };
}
