'use client';

import Link from 'next/link';
import { BlogPostSummary } from '@/types/blog';
import { useTranslation } from '@/i18n/client';
import { Locale } from '@/i18n/config';

interface BlogCardProps {
  post: BlogPostSummary;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const { t } = useTranslation(post.locale);
  const locale = post.locale as Locale;
  const dateLocale = locale === 'zh' ? 'zh-CN' : 'en-US';
  const dateStr = new Date(post.date).toLocaleDateString(dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/${post.locale}/blog/${post.slug}`} className="block">
      <article
        className="blog-card bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        style={{
          viewTransitionName: `post-${post.slug}`,
          animation: `slideUp 0.4s ease-out ${index * 0.05}s both`,
        }}
      >
      {post.cover?.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={post.cover.image}
            alt={post.cover.alt || post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 mb-3">
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
            {Math.round(post.readingTime.minutes)} {t('blog.card.minutes')}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {Math.round(post.readingTime.words)} {t('blog.card.words')}
          </span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
    </Link>
  );
}
