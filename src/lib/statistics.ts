import { CollectionType, getLocaleCollection } from './collection';

export async function getStatistics(locale: string) {
  const entries = await getLocaleCollection(locale, CollectionType.Posts);
  const articles = entries.length;
  let words = 0;
  for (const entry of entries) {
    const { remarkPluginFrontmatter } = await entry.render();
    words += remarkPluginFrontmatter.words;
  }
  const tags = [...new Set(entries.flatMap((entry) => entry.data.tags))].length;
  const categories = [
    ...new Set(entries.flatMap((entry) => entry.data.category))
  ].length;
  return { articles, words, tags, categories };
}
