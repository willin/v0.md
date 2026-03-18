'use client';

import { useState } from 'react';
import { BlogCard } from './BlogCard';
import { BlogSidebar } from './BlogSidebar';
import { BlogPostSummary } from '@/types/blog';

interface BlogStats {
  totalPosts: number;
  totalWords: number;
}

interface BlogListProps {
  posts: BlogPostSummary[];
  categories: string[];
  tags: string[];
  locale: 'zh' | 'en';
  stats?: BlogStats;
}

export function BlogList({ posts, categories, tags, locale, stats }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentTag, setCurrentTag] = useState<string | null>(null);

  const isZh = locale === 'zh';

  // 过滤文章
  const filteredPosts = posts.filter((post) => {
    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(query);
      const matchDescription = post.description.toLowerCase().includes(query);
      const matchTags = post.tags?.some((tag) => tag.toLowerCase().includes(query));
      const matchCategories = post.categories?.some((cat) => cat.toLowerCase().includes(query));
      if (!matchTitle && !matchDescription && !matchTags && !matchCategories) {
        return false;
      }
    }

    // 分类过滤
    if (currentCategory && !post.categories?.includes(currentCategory)) {
      return false;
    }

    // 标签过滤
    if (currentTag && !post.tags?.includes(currentTag)) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-4 py-8">
      {/* 主内容区 - 文章列表 */}
      <div className="flex-1 min-w-0">
        {(currentCategory || currentTag || searchQuery) && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>
              {isZh ? '筛选：' : 'Filtering: '}
            </span>
            {searchQuery && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                🔍 {searchQuery}
              </span>
            )}
            {currentCategory && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                📁 {currentCategory}
              </span>
            )}
            {currentTag && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                #{currentTag}
              </span>
            )}
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {isZh ? '没有找到相关文章' : 'No articles found'}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post, index) => (
              <BlogCard key={`${post.locale}-${post.slug}`} post={post} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* 侧边栏 */}
      <BlogSidebar
        categories={categories}
        tags={tags}
        currentCategory={currentCategory}
        currentTag={currentTag}
        onSearch={setSearchQuery}
        onCategorySelect={setCurrentCategory}
        onTagSelect={setCurrentTag}
        locale={locale}
        stats={stats}
      />
    </div>
  );
}
