/**
 * 博客文章 Frontmatter 类型定义
 */

export interface BlogFrontmatter {
  // 基本信息（必填）
  title: string;
  description: string;

  // 分类和标签（可选）
  categories?: string[];
  tags?: string[];

  // 封面图（可选）
  cover?: {
    image: string;
    alt: string;
    relative?: boolean;
  };

  // 知识库配置（用于 RAG）
  knowledge?: {
    enabled: boolean;
    keywords?: string[];
    chunkStrategy?: 'by-heading' | 'by-paragraph' | 'custom';
    priority?: number;
  };
}

/**
 * 博客文章完整类型（包含自动生成的字段）
 */
export interface BlogPost extends BlogFrontmatter {
  // 从文件名提取
  slug: string;
  // 从 Git 提交时间获取
  date: string;
  updated?: string;
  // 从文件后缀提取
  locale: 'zh' | 'en';
  // 自动检测同 slug 的其他语言
  translations?: {
    zh?: string;
    en?: string;
  };
  // 自动计算
  readingTime: {
    minutes: number;
    text: string;
    words: number;
  };
  // 自动生成
  seo: {
    keywords: string[];
    ogImage?: string;
  };
  // 固定配置
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  // 内容
  content: string;
}

/**
 * 博客列表项（精简版）
 */
export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  locale: 'zh' | 'en';
  tags?: string[];
  categories?: string[];
  cover?: {
    image: string;
    alt: string;
  };
  readingTime: {
    minutes: number;
    text: string;
    words: number;
  };
  hasTranslation: boolean;
}
