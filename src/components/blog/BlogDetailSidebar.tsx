'use client';

import { TableOfContents } from './TableOfContents';
import { BlogSidebar } from './BlogSidebar';

interface BlogStats {
  totalPosts: number;
  totalWords: number;
}

interface BlogDetailSidebarProps {
  categories: string[];
  tags: string[];
  locale: 'zh' | 'en';
  stats?: BlogStats;
}

export function BlogDetailSidebar({ categories, tags, locale, stats }: BlogDetailSidebarProps) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      <BlogSidebar
        categories={categories}
        tags={tags}
        onSearch={() => {}}
        onCategorySelect={() => {}}
        onTagSelect={() => {}}
        locale={locale}
        stats={stats}
      />
      <TableOfContents />
    </aside>
  );
}
