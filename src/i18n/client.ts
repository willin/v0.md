'use client';

import { useEffect, useState, cache } from 'react';
import { i18n, type Locale } from './config';

type TranslationDict = Record<string, unknown>;

// 缓存已加载的翻译
const translationsCache = new Map<string, TranslationDict>();

/**
 * 客户端翻译 hook
 * 用于在客户端组件中获取翻译
 *
 * @example
 * const { t } = useTranslation(locale);
 * <p>{t('blog.post.readingTime')}</p>
 */
export function useTranslation(locale: string) {
  const [translations, setTranslations] = useState<TranslationDict>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cacheKey = locale;
    const cached = translationsCache.get(cacheKey);

    if (cached) {
      setTranslations(cached);
      setIsLoading(false);
      return;
    }

    // 动态导入翻译文件
    import(`./locales/${locale}.json`)
      .then((module) => {
        const dict = module.default as TranslationDict;
        translationsCache.set(cacheKey, dict);
        setTranslations(dict);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`Failed to load translation for ${locale}:`, error);
        setIsLoading(false);
      });
  }, [locale]);

  // 支持嵌套键的翻译函数
  const t = (key: string): string => {
    if (isLoading) return key;

    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key; // 返回路径作为 fallback
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, isLoading };
}

