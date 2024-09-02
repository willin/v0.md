import { type CollectionEntry, getCollection } from 'astro:content';
import { getLocaleFromUrl } from '@/i18n';

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
