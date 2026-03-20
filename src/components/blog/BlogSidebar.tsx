'use client';

import { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { Locale } from '@/i18n/config';

interface BlogStats {
  totalPosts: number;
  totalWords: number;
}

interface SidebarProps {
  categories: string[];
  tags: string[];
  currentCategory?: string | null;
  currentTag?: string | null;
  onSearch?: (query: string) => void;
  onCategorySelect?: (category: string | null) => void;
  onTagSelect?: (tag: string | null) => void;
  locale: Locale | string;
  stats?: BlogStats;
}

/**
 * 检测字符串是否包含中文字符
 */
function containsChinese(str: string): boolean {
  return /[\u4e00-\u9fa5]/.test(str);
}

/**
 * 过滤当前语言的分类和标签
 */
function filterByLanguage(items: string[], isZh: boolean): string[] {
  return items.filter((item) => {
    const hasChinese = containsChinese(item);
    return isZh ? hasChinese : !hasChinese;
  });
}

/**
 * 博客侧边栏组件
 * 包含：作者信息、搜索框、分类列表、标签云、统计信息
 */
export function BlogSidebar({
  categories,
  tags,
  currentCategory,
  currentTag,
  onSearch,
  onCategorySelect,
  onTagSelect,
  locale,
  stats,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRssDropdown, setShowRssDropdown] = useState(false);
  const { t } = useTranslation(locale);

  // 注意：这里的 isZh 仅用于过滤分类和标签，不用于文本显示
  const isZh = locale === 'zh';

  // 过滤当前语言的分类和标签
  const filteredCategories = filterByLanguage(categories, isZh);
  const filteredTags = filterByLanguage(tags, isZh);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleCategoryClick = (category: string) => {
    if (currentCategory === category) {
      onCategorySelect?.(null);
    } else {
      onCategorySelect?.(category);
    }
  };

  const handleTagClick = (tag: string) => {
    if (currentTag === tag) {
      onTagSelect?.(null);
    } else {
      onTagSelect?.(tag);
    }
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      {/* 作者信息卡片 - 移到最上方 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 512 512" className="w-full h-full fill-gray-700 dark:fill-gray-300">
                <path d="M241.2,6.8c10.4,0,20.8,0,31.2,0c1.3,0.3,2.5,0.7,3.8,0.8c54.6,4.4,103.3,23.8,144,60.4c73.3,66,101.1,148.5,79.9,244.6
C470,449,334.6,531.8,198.6,500c-96.2-22.5-171.9-103.1-188-200.1c-1.5-9.1-2.5-18.3-3.8-27.5c0-10.4,0-20.8,0-31.2
c0.3-1.4,0.6-2.8,0.9-4.3c2-12.8,3.2-25.8,6.1-38.5c22.2-96,103.1-171.8,199.9-187.9C222.9,9.1,232.1,8.1,241.2,6.8z M257,51.8
C143.9,51.7,52,143.3,51.8,256.4c-0.2,113.3,91.6,205.4,204.9,205.5c113.2,0.1,205-91.5,205.2-204.7
C462.1,143.9,370.3,51.8,257,51.8z"/>
                <path d="M133.4,118.7c0,52.5,0,103.9,0,155.3c0.4,0.1,0.7,0.3,1.1,0.4c10.3-11.8,20.6-23.6,31.5-36c9.7,22.3,19.2,44.1,28.7,65.8
c0.4-0.1,0.8-0.2,1.2-0.2c0-1.9,0-3.8,0-5.6c0-70.3,0-140.6-0.1-210.9c0-4.6,1.3-6.4,5.7-7.7c17.9-5.2,36.1-8.3,55.1-8.4
c0,123.7,0,247.1,0,371.6c-9.4-0.9-18.8-1.2-28-2.7c-9.7-1.6-19.3-4.5-28.9-6.7c-3.5-0.8-5.3-2.7-6.3-6.3
c-8.3-28.2-16.9-56.3-25.5-84.5c-0.5-1.5-1.1-2.9-2-5.3c-10.1,20.5-19.8,40.1-29.5,59.7C56.3,333.4,44.8,197.9,133.4,118.7z"/>
                <path d="M378.4,275.8c-11.1-12.7-21.6-24.8-32.7-37.5c-9.7,22.2-19,43.7-28.4,65.2c-0.2-0.1-0.4-0.1-0.7-0.2c0-73.8,0-147.5,0-221.9
c1.5,0.5,3,0.9,4.4,1.4c20.3,7.6,38.6,18.6,55.1,32.7c1.4,1.2,2.7,3.4,2.7,5.2c0.1,50.9,0.1,101.9,0.1,152.8
C378.9,273.9,378.7,274.3,378.4,275.8z"/>
                <path d="M347.6,337.1c2.2,4.5,3.9,7.7,5.5,11c7.5,15.3,15.1,30.6,22.6,45.9c1.1,2.2,1.9,3.8-0.6,5.8c-16.7,13.6-34.9,24.2-56.2,31.8
C328.5,400,337.9,369.1,347.6,337.1z"/>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Willin Wang
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('blog.sidebar.authorTitle')}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <a
            href="https://github.com/willin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://x.com/willinwang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a
            href="mailto:willin@willin.org"
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          {t('blog.sidebar.search')}
        </h3>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={t('blog.sidebar.searchPlaceholder')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* RSS 订阅按钮 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          🔔 订阅
        </h3>
        <div className="relative">
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors group"
            onMouseEnter={() => setShowRssDropdown(true)}
            onMouseLeave={() => setShowRssDropdown(false)}
          >
            <span className="text-sm font-medium">订阅全部</span>
            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          {/* 下拉菜单 */}
          {showRssDropdown && (
            <div
              className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10"
              onMouseEnter={() => setShowRssDropdown(true)}
              onMouseLeave={() => setShowRssDropdown(false)}
            >
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                📄 订阅全部文章
              </a>
              <a
                href={`/${locale}/feed.xml`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                📄 订阅{locale === 'zh' ? '中文' : 'English'}文章
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 统计信息卡片 */}
      {stats && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {t('blog.sidebar.stats')}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {stats.totalPosts}
              </span>
              <span className="text-gray-500 dark:text-gray-500">
                {t('blog.sidebar.totalPosts')}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {(stats.totalWords / 10000).toFixed(1)}
              </span>
              <span className="text-gray-500 dark:text-gray-500">
                {t('blog.sidebar.totalWords')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 分类列表 - 只显示当前语言 */}
      {filteredCategories.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {t('blog.sidebar.categories')}
          </h3>
          <ul className="space-y-2">
            {filteredCategories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`text-sm transition-colors ${
                    currentCategory === category
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {category}
                  {currentCategory === category && (
                    <span className="ml-2 text-xs">✕</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 标签云 - 只显示当前语言 */}
      {filteredTags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {t('blog.sidebar.tags')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {filteredTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  currentTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                #{tag}
                {currentTag === tag && (
                  <span className="ml-1 text-xs">✕</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
