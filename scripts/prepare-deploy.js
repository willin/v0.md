/**
 * 部署前准备脚本
 * 1. 复制 MDX 文件从 src/content/blog 到 public/content/blog
 * 2. 生成博客索引文件
 */

const fs = require('fs');
const path = require('path');

const srcBlogDirectory = path.join(__dirname, '../src/content/blog');
const publicBlogDirectory = path.join(__dirname, '../public/content/blog');
const indexFilePath = path.join(publicBlogDirectory, 'index.json');

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

// 生成索引
const index = {
  generated: new Date().toISOString(),
  files: []
};

for (const file of files) {
  if (!file.endsWith('.mdx')) continue;

  const parsed = parseFilename(file);
  if (!parsed) continue;

  index.files.push({
    filename: file,
    slug: parsed.slug,
    date: parsed.date,
    locale: parsed.locale
  });
}

// 按日期排序
index.files.sort((a, b) => new Date(b.date) - new Date(a.date));

// 写入索引文件
try {
  fs.writeFileSync(indexFilePath, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`Generated blog index with ${index.files.length} files`);
} catch (error) {
  console.error('Error writing index file:', error);
  process.exit(1);
}

console.log('Deploy preparation complete!');
