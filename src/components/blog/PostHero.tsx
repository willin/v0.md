'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface PostHeroProps {
  post: BlogPost;
  locale: string;
  dateStr: string;
  isZh: boolean;
}

export function PostHero({ post, locale, dateStr, isZh }: PostHeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || 600;
      const progress = Math.min(window.scrollY / heroHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 计算缩放和透明度
  const scale = 1 - scrollProgress * 0.3;
  const opacity = 1 - scrollProgress * 1.5;
  const translateY = scrollProgress * 100;

  return (
    <div
      ref={heroRef}
      className="relative h-[500px] w-full overflow-hidden"
      style={{
        viewTransitionName: 'post-hero',
      }}
    >
      {/* 封面图 */}
      {post.cover?.image ? (
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${scale}) translateY(${translateY}px)`,
            opacity,
          }}
        >
          <img
            src={post.cover.image}
            alt={post.cover.alt || post.title}
            className="w-full h-full object-cover"
          />
          {/* 渐变遮罩 */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,${0.3 + scrollProgress * 0.4}))`,
            }}
          />
        </div>
      ) : (
        // 无封面图时的渐变背景
        <div
          className="absolute inset-0 transition-opacity duration-100 ease-out"
          style={{
            opacity: 1 - scrollProgress,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        />
      )}

      {/* Hero 内容 */}
      <div
        className="absolute inset-0 flex items-end pb-16"
        style={{
          opacity: 1 - scrollProgress * 1.2,
          transform: `translateY(${scrollProgress * 30}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* 面包屑导航（半透明） */}
          <nav className="mb-4 text-sm text-white/80">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-white transition-colors">
                  {isZh ? '首页' : 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
                  {isZh ? '博客' : 'Blog'}
                </Link>
              </li>
              {post.categories && post.categories.length > 0 && (
                <>
                  <li>/</li>
                  <li className="text-white">{post.categories[0]}</li>
                </>
              )}
            </ol>
          </nav>

          {/* 文章标题 */}
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
            style={{
              viewTransitionName: 'post-title',
            }}
          >
            {post.title}
          </h1>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
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
          </div>

          {/* 标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 翻译提示 */}
          {post.translations && Object.keys(post.translations).length > 0 && (
            <div className="mt-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
              <p className="text-sm text-white flex items-center gap-2 flex-wrap">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.148" />
                </svg>
                {isZh ? '提示：本文有其他语言版本' : 'Note: This article has other language versions'}
                {post.translations.zh && locale !== 'zh' && (
                  <Link
                    href={`/zh/blog/${post.translations.zh}`}
                    className="underline hover:text-blue-200 transition-colors"
                  >
                    {isZh ? '切换到中文版' : 'Switch to Chinese'}
                  </Link>
                )}
                {post.translations.en && locale !== 'en' && (
                  <Link
                    href={`/en/blog/${post.translations.en}`}
                    className="underline hover:text-blue-200 transition-colors"
                  >
                    {isZh ? 'Switch to English' : '切换到英文版'}
                  </Link>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 滚动提示 */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 animate-bounce"
        style={{
          opacity: 1 - scrollProgress * 2,
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
