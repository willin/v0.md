import { getAllPosts } from '@/lib/blog';
import { Locale } from '@/i18n/config';
import { NextRequest } from 'next/server';

/**
 * 生成指定语言的 RSS Feed
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const allPosts = await getAllPosts();

  // 过滤当前语言的文章
  const posts = allPosts.filter(post => post.locale === locale);

  const siteUrl = 'https://v0.md';
  const author = 'Willin(v0) Wang';
  const language = locale === 'zh' ? 'zh-CN' : 'en-US';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Willin Wang's Blog - ${locale === 'zh' ? '中文' : 'English'}</title>
    <link>${siteUrl}/${locale}</link>
    <description>记录数字游民和 AI 创业的点点滴滴</description>
    <language>${language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/${locale}/feed.xml" rel="self" type="application/rss+xml"/>

    ${posts.map((post) => {
      const postUrl = `${siteUrl}/${post.locale}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const description = post.description || '';

      return `
    <item>
      <title><![CDATA[${escapeXml(post.title)}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${escapeXml(description)}]]></description>
      <author>${author}</author>
    </item>`;
    }).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

/**
 * 转义 XML 特殊字符
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
