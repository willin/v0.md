/**
 * 部署前准备脚本
 * 1. 复制 MDX 文件从 src/content/blog 到 public/content/blog
 * 2. 生成博客元数据缓存（包含 frontmatter 信息）
 * 3. 生成文件索引
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const srcBlogDirectory = path.join(__dirname, '../src/content/blog');
const publicBlogDirectory = path.join(__dirname, '../public/content/blog');
const indexFilePath = path.join(publicBlogDirectory, 'index.json');
const metadataFilePath = path.join(__dirname, '../public/blog-metadata.json');

// 确保目标目录存在
if (!fs.existsSync(publicBlogDirectory)) {
  fs.mkdirSync(publicBlogDirectory, { recursive: true });
}

// 读取源博客目录
let files;
try {
  files = fs.readdirSync(srcBlogDirectory);
} catch (error) {
  console.error('Error reading source blog directory:', error);
  process.exit(1);
}

// 复制 MDX 文件
for (const file of files) {
  if (!file.endsWith('.mdx')) continue;

  const srcPath = path.join(srcBlogDirectory, file);
  const destPath = path.join(publicBlogDirectory, file);

  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${file}`);
  } catch (error) {
    console.error(`Error copying ${file}:`, error);
    process.exit(1);
  }
}

// 解析文件名
function parseFilename(filename) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(zh|en)\.mdx$/);
  if (!match) return null;

  const [, dateStr, slug, locale] = match;
  return {
    slug,
    date: new Date(dateStr).toISOString(),
    locale: locale,
  };
}

// 提取 frontmatter 元数据
function extractMetadata(filename, srcBlogDirectory) {
  const srcPath = path.join(srcBlogDirectory, filename);
  try {
    const content = fs.readFileSync(srcPath, 'utf-8');
    const { data } = matter(content);
    return {
      title: data.title || '',
      description: data.description || '',
      categories: data.categories || [],
      tags: data.tags || [],
      cover: data.cover || null,
    };
  } catch (error) {
    console.warn(`Warning: Could not extract metadata from ${filename}:`, error.message);
    return null;
  }
}

// 生成索引和元数据
const index = {
  generated: new Date().toISOString(),
  files: []
};

const metadata = {
  generated: new Date().toISOString(),
  posts: []
};

for (const file of files) {
  if (!file.endsWith('.mdx')) continue;

  const parsed = parseFilename(file);
  if (!parsed) continue;

  // 文件索引
  index.files.push({
    filename: file,
    slug: parsed.slug,
    date: parsed.date,
    locale: parsed.locale
  });

  // 元数据
  const fileMetadata = extractMetadata(file, srcBlogDirectory);
  if (fileMetadata) {
    metadata.posts.push({
      slug: parsed.slug,
      locale: parsed.locale,
      date: parsed.date,
      title: fileMetadata.title,
      description: fileMetadata.description,
      categories: fileMetadata.categories,
      tags: fileMetadata.tags,
      cover: fileMetadata.cover,
    });
  }
}

// 按日期排序（倒序）
index.files.sort((a, b) => new Date(b.date) - new Date(a.date));
metadata.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// 写入索引文件
try {
  fs.writeFileSync(indexFilePath, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`\nGenerated blog index with ${index.files.length} files`);
} catch (error) {
  console.error('Error writing index file:', error);
  process.exit(1);
}

// 写入元数据文件
try {
  fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2), 'utf-8');
  console.log(`Generated blog metadata with ${metadata.posts.length} posts`);
} catch (error) {
  console.error('Error writing metadata file:', error);
  process.exit(1);
}

console.log('\nDeploy preparation complete!');
