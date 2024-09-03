import { type CollectionEntry, getCollection } from 'astro:content';
import { defaultLocale } from '@/consts';
import { getLocaleFromUrl, getRelativeUrlWithoutLocale } from '@/i18n';

export enum CollectionType {
  Posts = 'posts'
}

export async function getLocaleCollection(
  locale: string,
  collection: CollectionType = CollectionType.Posts,
  sort = 'reverseChronological'
): Promise<CollectionEntry<'posts'>[]> {
  const entries = await getCollection(collection);

  const result =
    locale === ''
      ? entries
      : entries.filter((entry) => getLocaleFromUrl(entry.slug) === locale);

  if (sort === 'reverseChronological') {
    return result.sort(
      (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) =>
        a.data.published.valueOf() < b.data.published.valueOf() ? 1 : -1
    );
  }
  return result;
}

export function groupingEntries<T>(posts: T[], getYear: (arg0: T) => number) {
  const groupedPosts = posts.reduce((grouped: Record<string, T[]>, post: T) => {
    const year = getYear(post);
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(post);
    return grouped;
  }, {});

  // convert the object to an array
  const groupedPostsArray = Object.keys(groupedPosts).map((key) => ({
    year: key,
    posts: groupedPosts[key]
  }));

  // sort years by latest first
  groupedPostsArray.sort(
    (a, b) => Number.parseInt(b.year) - Number.parseInt(a.year)
  );
  return groupedPostsArray;
}

export function getPostUrl(
  entryOrSlug: CollectionEntry<'posts'> | string | undefined
) {
  if (entryOrSlug === undefined) return '';
  if (typeof entryOrSlug === 'string') {
    const locale = getLocaleFromUrl(entryOrSlug);
    return locale === defaultLocale
      ? `/blog${getRelativeUrlWithoutLocale(entryOrSlug)}`
      : `/${locale}/blog${getRelativeUrlWithoutLocale(entryOrSlug)}`;
  }
  return getPostUrl(entryOrSlug.slug);
}
