import { CollectionType, getLocaleCollection } from './collection';

export async function getStatistics(locale?: string) {
  const entries = await getLocaleCollection(locale, CollectionType.Posts);
  const articles = entries.length;
  let words = 0;
  for (const entry of entries) {
    const { remarkPluginFrontmatter } = await entry.render();
    words += remarkPluginFrontmatter.words;
  }
  const tags = [...new Set(entries.flatMap((entry) => entry.data.tags))];
  const categories = [
    ...new Set(entries.flatMap((entry) => entry.data.category))
  ];
  return { articles, words, tags, categories };
}

export async function getCategoryList(locale?: string) {
  const entries = await getLocaleCollection(locale, CollectionType.Posts);

  const count: { [key: string]: number } = {};
  entries.map((post) => {
    if (!post.data.category) {
      const ucKey = 'Uncategorized';
      count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
      return;
    }
    count[post.data.category] = count[post.data.category]
      ? count[post.data.category] + 1
      : 1;
  });

  const lst = Object.keys(count).sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  const ret: { name: string; count: number }[] = [];
  for (const c of lst) {
    ret.push({ name: c, count: count[c] });
  }
  return ret;
}
