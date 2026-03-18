# 博客 + RAG 知识库项目计划

> **状态**: 第一阶段已完成，本计划为第二阶段（博客 + RAG 知识库）
> **创建日期**: 2026-03-18
> **最后更新**: 2026-03-18

---

## 第一阶段完成总结

✅ 已完成功能：
- 个人主页（头像、个人信息、兴趣标签）
- 数字分身聊天（基于关键词匹配的预定义知识库）
- 明暗主题切换（light/dark/system）
- 中英双语国际化（URL 路由 `/zh`、`/en`）
- 浏览器语言探测自动跳转
- Cloudflare Workers 部署配置

---

# 第二阶段：博客 + RAG 知识库

## 背景

为 Willin Wang 的个人主页添加博客功能，同时将博客内容转化为知识库，供数字分身聊天机器人使用。采用 RAG (Retrieval-Augmented Generation) 架构，使用 Cloudflare Workers AI 实现 Embed + Rerank 的向量检索方案。

## 需求

### 博客功能
- **基础功能**
  - 文章列表页（按日期排序）
  - 文章详情页（MDX 渲染，支持 React 组件）
  - 标签/分类系统
  - 中英双语支持 (zh/en)
- **进阶功能**
  - 文章搜索
  - RSS 订阅
  - 阅读时间估算
- **增强功能**（本次新增）
  - 丰富的博客布局（封面图、作者信息、相关文章）
  - 页面过渡动画
  - 交互效果（代码复制、目录导航）

### 知识库功能
- 博客发布时自动向量化（Embed 模型）
- 聊天时检索相关知识（向量相似度）
- Rerank 模型精排提高准确率
- 返回答案时附带博客原文链接（标注来源）

### 技术约束
- **内容格式**: MDX（支持 React 组件交互）
- **部署平台**: Cloudflare Workers
- **向量化触发**: 自动化 CI/CD 流程（GitHub Actions）
- **频率**: 每周 2-3 篇博客
- **实时性**: 不需要实时，批量更新可接受
- **成本**: 优先使用免费额度

---

## 技术架构

### 数据流

```
博客 (MDX)
    │
    ├───→ 博客页面 (带动画和交互)
    │      ├── /blog (列表页)
    │      └── /blog/[slug] (详情页)
    │
    └───→ 向量化管道 (CI/CD 触发)
           ├── Embed 模型 (@cf/baai/bge-base-en-v1.5)
           │
           ▼
           Vectorize (向量数据库)
           │
           └───→ 聊天检索
                  ├── 检索 Top 5 候选
                  ├── Rerank 精排 (@cf/bge-reranker-v2-m3)
                  └── 返回 Top 3 + 原文链接
```

### 技术栈

| 组件 | 技术选型 | 用途 |
|------|---------|------|
| 博客内容 | MDX + Frontmatter | 存储博客文章（支持 React 组件） |
| 向量数据库 | Cloudflare Vectorize | 存储 + 检索向量 |
| Embed 模型 | `@cf/baai/bge-base-en-v1.5` | 文本向量化 |
| Rerank 模型 | `@cf/bge-reranker-v2-m3` | 相关性精排 |
| 元数据缓存 | Cloudflare KV | 博客元数据、向量索引映射 |
| 页面过渡动画 | View Transitions API | 原生页面过渡效果 |
| 代码高亮 | Shiki | 代码块渲染 |
| 图片优化 | Next.js Image (Cloudflare IMAGES) | 图片自动优化（已配置） |
| 聊天 UI | 现有 DigitalTwinChat 增强 | 用户交互界面 |
| Git 时间戳 | git log | 获取文件修改时间 |

### 成本估算

```
免费额度 (每日):
- Embed: 10,000 维度/天 ≈ 50 篇文章/天
- Rerank: 500 次查询/天
- 对话模型：10,000 tokens/天

你的使用量:
- 博客：12 篇/月 ≈ 0.4 篇/天 << 免费额度
- 对话：假设 50 次/天 << 免费额度

结论：完全在免费额度内
```

---

## 详细设计

### 1. MDX FrontMatter 结构

```yaml
---
# 基本信息（必填）
title: "如何用 AI 建立被动收入"
description: "介绍用 AI 创建被动收入的 5 种方法和实战经验"

# 分类和标签（可选）
categories:
  - AI 创业
  - 被动收入
tags:
  - AI
  - 副业
  - 财务自由

# 封面图（可选）
cover:
  image: /images/blog/ai-passive-income/cover.jpg
  alt: "AI 被动收入示意图"
  relative: true  # 图片是否相对于博客目录

# 知识库配置（用于 RAG）
knowledge:
  enabled: true  # 是否将此文纳入知识库
  keywords:  # 用于检索的关键词
    - AI 创业
    - 被动收入
    - AI 赚钱
    - 人工智能副业
  chunkStrategy: "by-heading"  # by-heading | by-paragraph | custom
  priority: 1.0  # 检索权重，默认 1.0
---
```

**文件名格式**: `YYYY-MM-DD-SLUG.zh.mdx` 或 `YYYY-MM-DD-SLUG.en.mdx`

**自动生成的字段**:
| 字段 | 来源 | 说明 |
|------|------|------|
| `slug` | 文件名 | 从文件名提取，如 `2026-03-18-ai-passive-income-guide` |
| `date` | 文件修改时间 | 使用 `git log -1 --format=%ai` 获取最后提交时间 |
| `updated` | Git 提交时间 | 同上，避免本地修改导致时间变化 |
| `locale` | 文件名 | 从 `.zh.mdx` 或 `.en.mdx` 后缀提取 |
| `translations` | 自动检测 | 扫描同 slug 的其他语言文件 |
| `readingTime` | reading-time 包 | 构建时自动计算 |
| `seo` | 自动生成 | 基于 title、description、tags 生成 |
| `author` | 固定配置 | 固定为 Willin Wang，从配置文件读取 |

### 2. Rehype/Remark 插件推荐

```javascript
// 核心插件
const remarkPlugins = [
  // Frontmatter 解析
  'remark-frontmatter',
  // GitHub 风格 Markdown
  'remark-gfm',
  // 代码块语法高亮
  ['remark-shiki', { theme: 'github-dark' }],
  // 目录生成
  'remark-toc',
  // 自动链接标题
  'remark-slug',
];

const rehypePlugins = [
  // 外部链接处理
  'rehype-external-links',
  // 图片懒加载
  'rehype-lazyload',
  // 代码块复制按钮
  'rehype-add-classes',  // 为代码块添加类名
  // 响应式表格
  'rehype-responsive-tables',
  // 自定义组件映射
  'rehype-mdx-component-mapper',
];
```

### 3. 推荐的 npm 包

```json
{
  "dependencies": {
    "@next/mdx": "^15.0.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "@shikijs/remark": "^1.0.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.0",
    "remark-frontmatter": "^5.0.0",
    "remark-gfm": "^4.0.0",
    "remark-toc": "^9.0.0",
    "remark-slug": "^7.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.0.0",
    "rehype-external-links": "^3.0.0",
    "date-fns": "^3.0.0",
    "reading-time": "^1.5.0",
    "simple-git": "^3.0.0"
  }
}
```

### 4. 博客布局设计

#### 4.1 列表页布局（带侧边栏）

```
┌────────────────────────────────────────────────────────┐
│  博客标题 "Willin's Blog"                               │
│  副标题 "记录数字游民和 AI 创业的点滴"                     │
├───────────────────┬────────────────────────────────────┤
│   侧边栏          │         文章列表                    │
│                   │                                    │
│  ┌─────────────┐  │  ┌──────────────────────────────┐  │
│  │ [搜索框]    │  │  │  [无封面] 文章标题            │  │
│  └─────────────┘  │  │  文章描述 (最多两行)          │  │
│                   │  │  📅 2026-03-18  ⏱ 8 分钟      │  │
│  ┌─────────────┐  │  │  #AI #被动收入               │  │
│  │ 分类        │  │  └──────────────────────────────┘  │
│  │ - AI 创业    │  │                                    │
│  │ - 财务自由  │  │  ┌──────────────────────────────┐  │
│  │ - 数字游民  │  │  │ [封面图] 文章标题            │  │
│  └─────────────┘  │  │  文章描述...                  │  │
│                   │  │  ...                         │  │
│  ┌─────────────┐  │  └──────────────────────────────┘  │
│  │ 标签云      │  │                                    │
│  │ #AI #副业   │  │         < 1 2 3 4 > 分页            │
│  │ #创业       │  │                                    │
│  └─────────────┘  │                                    │
│                   │                                    │
│  ┌─────────────┐  │                                    │
│  │ 作者信息    │  │                                    │
│  │ [头像]      │  │                                    │
│  │ Willin Wang │  │                                    │
│  │ 数字游民    │  │                                    │
│  │ [GitHub]    │  │                                    │
│  │ [Twitter]   │  │                                    │
│  └─────────────┘  │                                    │
└───────────────────┴────────────────────────────────────┘
```

#### 4.2 详情页布局

```
┌────────────────────────────────────────────────────────┐
│  HeaderBar  随屏滚动                                     │
├────────────────────────────────────────────────────────┤
│  面包屑导航 主页 > 分类 > 文章名称                          │
├───────────────────┬────────────────────────────────────┤
│   侧边栏           │         文章内容                    │
│   (同上,           │                                    │
│  但有跟随滚动目录)   │  ┌─────────────────────────────┐   │
│                   │  │ [封面大图 - 如果有]          │   │
│                   │  └─────────────────────────────┘   │
│                   │                                    │
│                   │  文章标题                           │
│                   │  ─────────                         │
│                   │  📅 2026-03-18  |  ⏱ 8 分钟阅读     │
│                   │  📁 AI 创业  |  🏷️ #AI #被动收入     │
│                   │                                    │
│                   │  ┌─────────────────────────────┐   │
│                   │  │ 💡 提示：本文有英文版本      │   │
│                   │  │ [切换到英文版]               │   │
│                   │  └─────────────────────────────┘   │
│                   │                                    │
│                   │  正文开始...                        │
│                   │  [代码块 - 带复制按钮]              │
│                   │  [交互式组件]                       │
│                   │  [引用块]                          │
│                   │  ...                               │
│                   │                                    │
│                   │  上一篇：《XXX》 ←     → 下一篇：《XXX》│
│                   │                                    │
└───────────────────┴────────────────────────────────────┘
```

#### 4.3 侧边栏组件结构

```tsx
// src/components/blog/Sidebar.tsx
<aside className="w-64 flex-shrink-0">
  <BlogSearch />           {/* 搜索框 */}
  <CategoryList />         {/* 分类列表 */}
  <TagCloud />             {/* 标签云 */}
  <AuthorCard />           {/* 作者信息卡片 */}
</aside>
```

### 5. 动画和交互效果设计

#### 5.1 View Transitions 页面过渡动画

使用 **View Transitions API** 实现原生页面过渡效果，无需 Framer Motion 依赖。

**Nav 链接动画**: 从主页点击导航到博客列表时，导航按钮平滑过渡

```tsx
// src/components/Nav.tsx
'use client';

import { Link } from 'next/link';

export function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative inline-block px-4 py-2 text-sm font-medium transition-colors duration-200"
      style={{ viewTransitionName: 'nav-item' }}
    >
      {children}
      <span
        className="absolute inset-x-0 -bottom-px h-px bg-primary scale-x-0 transition-transform duration-300"
        style={{ viewTransitionName: 'nav-item-underline' }}
      />
    </Link>
  );
}
```

**页面内容呈现动画**:

```tsx
// src/app/[locale]/blog/layout.tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        viewTransitionName: 'page-content',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      {children}
    </div>
  );
}
```

**CSS 动画定义**:

```css
/* src/app/globals.css */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* View Transitions 样式 */
::view-transition-old(root) {
  animation: fade-out 0.2s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

**列表项卡片进入动画**:

```tsx
// src/components/blog/BlogCard.tsx
export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <article
      className="blog-card"
      style={{
        viewTransitionName: `post-${post.slug}`,
        animation: `slideUp 0.4s ease-out ${index * 0.05}s both`
      }}
    >
      {/* 卡片内容 */}
    </article>
  );
}
```

#### 5.2 交互效果清单

| 效果 | 描述 | 实现方式 |
|------|------|---------|
| 卡片悬停 | 列表卡片悬停时上浮 + 阴影 | CSS transform + box-shadow |
| 图片渐入 | 图片加载时淡入效果 | CSS opacity transition |
| 代码复制 | 一键复制代码块 | 复制按钮 + Clipboard API |
| 目录跟随 | 滚动时高亮当前章节 | Intersection Observer |
| 阅读进度 | 顶部显示阅读进度条 | 滚动监听 + progress bar |
| 锚点链接 | 标题自动生成锚点链接 | rehype-autolink-headings |
| 深色模式 | 代码块适配深色主题 | CSS variables + dark: classes |
| 图片优化 | 自动优化图片尺寸和格式 | Next.js Image + Cloudflare IMAGES |

#### 5.3 页面过渡实现示例

```tsx
// app/[locale]/blog/[slug]/page.tsx
'use client';

import { motion } from 'framer-motion';
import { usePageTransition } from '@/hooks/usePageTransition';

export default function BlogPostPage({ children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {children}
    </motion.article>
  );
}
```

---

## RAG 检索策略详解

### 检索流程

```
用户提问
    │
    ▼
┌─────────────────────────────────┐
│ 1. 关键词预处理                  │
│    - 去除停用词                  │
│    - 词干提取                   │
│    - 语言检测 (中/英)           │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│ 2. 双路检索                      │
│    ┌──────────┐  ┌──────────┐   │
│    │ 预定义知识│  │ 博客知识库│   │
│    │ 关键词匹配│  │ 向量检索  │   │
│    └────┬─────┘  └────┬─────┘   │
│         │             │         │
│         └──────┬──────┘         │
└────────────────┼────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ 3. 合并结果 (最多 10 条)          │
│    - 预定义知识：权重 1.5         │
│    - 博客知识：权重 1.0           │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│ 4. Rerank 精排                   │
│    @cf/bge-reranker-v2-m3       │
│    重排序后取 Top 3               │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│ 5. 生成回答                      │
│    - 拼接上下文                  │
│    - 标注来源 (博客链接)         │
│    - 返回最终答案                │
└─────────────────────────────────┘
```

### 来源标注示例

当聊天机器人检索到博客内容时，回答格式如下：

```
[回答内容]

根据你的问题，我找到了以下相关信息：

📖 来源：
1. [如何用 AI 建立被动收入](/blog/ai-passive-income-guide) - AI 创业
2. [数字游民的财务自由之路](/blog/digital-nomad-fi) - 财务自由

💡 提示：点击链接阅读完整文章了解更多细节。
```

---

## CI/CD 自动化流程

### GitHub Actions 工作流

```yaml
# .github/workflows/blog-embed.yml
name: Blog Embed Pipeline

on:
  push:
    paths:
      - 'src/content/blog/**'
    branches:
      - main

jobs:
  embed:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Generate embeddings
        run: npm run embed:blog
        env:
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
          CLOUDFLARE_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
          VECTORIZE_INDEX_ID: ${{ secrets.VECTORIZE_INDEX_ID }}

      - name: Update metadata
        run: npm run blog:meta
```

---

## 关键文件路径

### 新增文件
```
src/
├── content/
│   └── blog/
│       ├── example-post.zh.mdx    # 示例博客 (中文)
│       └── example-post.en.mdx    # 示例博客 (英文)
├── components/
│   └── blog/
│       ├── BlogList.tsx           # 博客列表组件
│       ├── BlogCard.tsx           # 博客卡片（带动画）
│       ├── BlogPost.tsx           # 博客详情组件
│       ├── BlogLayout.tsx         # 博客布局容器
│       ├── TableOfContents.tsx    # 目录组件
│       ├── ReadingProgress.tsx    # 阅读进度条
│       ├── CodeBlock.tsx          # 代码块（带复制）
│       ├── BlogSearch.tsx         # 博客搜索组件
│       └── BlogTags.tsx           # 标签云组件
├── lib/
│   ├── blog.ts                    # 博客解析工具
│   ├── rss.ts                     # RSS 生成工具
│   ├── knowledge-search.ts        # RAG 检索逻辑
│   └── embed.ts                   # Embed 工具函数
├── hooks/
│   ├── useBlogSearch.ts           # 搜索 Hook
│   ├── useReadingProgress.ts      # 阅读进度 Hook
│   └── usePageTransition.ts       # 页面过渡 Hook
├── types/
│   └── blog.ts                    # 博客类型定义
├── scripts/
│   ├── embed-blog.ts              # Embed 脚本
│   └── generate-metadata.ts       # 元数据生成
└── app/
    └── [locale]/
        └── blog/
            ├── page.tsx           # 博客列表页
            ├── search/
            │   └── page.tsx       # 搜索页
            ├── tags/
            │   └── [tag]/
            │       └── page.tsx   # 标签页
            └── [slug]/
                └── page.tsx       # 文章详情页
```

### 修改文件
```
src/
├── components/chat/DigitalTwinChat.tsx  # 集成 RAG 检索
├── data/digital-twin-knowledge.ts       # 保留预定义知识
├── wrangler.jsonc                        # 添加 Vectorize/KV 绑定
├── next.config.ts                        # 添加 MDX 配置
└── package.json                          # 添加新依赖
```

---

## 实施步骤

### 阶段 1：博客系统基础 (优先级：高，预计 2 天)

**目标**: 可以创建和展示博客文章，支持中英双语

**任务**:
- [ ] 1.1 创建内容目录结构 `src/content/blog/`
- [ ] 1.2 安装 MDX 相关依赖
- [ ] 1.3 配置 `next.config.ts` 支持 MDX
- [ ] 1.4 创建博客 Frontmatter 类型定义 (`src/types/blog.ts`)
- [ ] 1.5 编写博客解析工具 `src/lib/blog.ts`（含 Git 时间戳获取）
- [ ] 1.6 创建博客列表页 (`/blog`) 带侧边栏布局
- [ ] 1.7 创建博客详情页 (`/blog/[slug]`) 带侧边栏
- [ ] 1.8 创建侧边栏组件（搜索、分类、标签云、作者信息）
- [ ] 1.9 实现多语言翻译检测组件
- [ ] 1.10 添加 View Transitions 页面过渡动画

**验收标准**:
- [ ] 访问 `/zh/blog` 能看到示例文章列表（至少 1 篇中文示例）
- [ ] 点击文章能查看详情页，URL 格式为 `/zh/blog/YYYY-MM-DD-slug`
- [ ] 侧边栏显示：搜索框、分类列表、标签云、作者信息卡片
- [ ] 文章详情页侧边栏目录随页面滚动高亮当前章节
- [ ] 如果文章有另一语言版本，页面顶部显示语言切换提示
- [ ] 从首页导航到博客列表页时有 View Transitions 过渡动画
- [ ] 无封面图的文章在列表中正常显示（仅标题 + 描述）
- [ ] 有封面图的文章在列表中显示缩略图
- [ ] 点击侧边栏分类/标签能筛选文章

---

### 阶段 2：向量化管道 (优先级：高，预计 1 天)

**目标**: 博客文章可以自动向量化并存储到 Vectorize

**任务**:
- [ ] 2.1 创建 Cloudflare Vectorize 索引
- [ ] 2.2 创建 KV 命名空间（元数据缓存）
- [ ] 2.3 更新 `wrangler.jsonc` 添加绑定
- [ ] 2.4 编写 Embed 脚本 (`src/scripts/embed-blog.ts`)
- [ ] 2.5 创建批量处理脚本（历史文章）
- [ ] 2.6 配置 GitHub Actions CI/CD

**验收标准**:
- [ ] 运行 `npm run embed:blog` 能将所有博客文章向量化
- [ ] Vectorize 索引中能查询到向量数据
- [ ] KV 中存储了博客元数据（slug、标题、关键词等）
- [ ] 新增博客文章后，手动运行脚本能增量更新向量
- [ ] GitHub Actions 配置完成，push 博客文件后自动触发向量化

---

### 阶段 3：聊天集成 (优先级：高，预计 1 天)

**目标**: 聊天机器人能检索博客内容并标注来源

**任务**:
- [ ] 3.1 编写 RAG 检索逻辑 `src/lib/knowledge-search.ts`
- [ ] 3.2 实现向量检索（Top 5 候选）
- [ ] 3.3 集成 Rerank 精排（Top 3）
- [ ] 3.4 修改 `DigitalTwinChat.tsx` 支持混合检索
- [ ] 3.5 添加博客链接引用功能（标注来源）
- [ ] 3.6 测试检索准确率

**验收标准**:
- [ ] 聊天时提问能触发博客知识库检索
- [ ] 检索结果经过 Rerank 精排后返回 Top 3
- [ ] 回答中包含相关博客文章的链接和标题
- [ ] 来源标注格式正确，点击链接能跳转到博客原文
- [ ] 用中文提问能检索到中文博客内容
- [ ] 用英文提问能检索到英文博客内容
- [ ] 预定义知识和博客知识混合检索正常工作

---

### 阶段 4：进阶功能 (优先级：中，预计 1 天)

**目标**: 博客搜索、RSS、SEO 优化

**任务**:
- [ ] 4.1 实现博客搜索功能（侧边栏搜索框）
- [ ] 4.2 生成 RSS Feed
- [ ] 4.3 SEO 优化（meta 标签、sitemap）

**验收标准**:
- [ ] 在侧边栏搜索框输入关键词能实时过滤文章列表
- [ ] 访问 `/feed.xml` 能生成 RSS 订阅源
- [ ] RSS 包含最新文章标题、描述、链接
- [ ] 博客文章页面有正确的 meta 标签（title、description、og:image）
- [ ] 生成 sitemap.xml 包含所有博客文章

---

### 阶段 5：验证与部署 (优先级：中，预计 1 天)

**目标**: 完整功能测试并部署到 Cloudflare Workers

**任务**:
- [ ] 5.1 完整功能测试
- [ ] 5.2 性能优化（缓存策略）
- [ ] 5.3 部署到 Cloudflare Workers
- [ ] 5.4 监控和日志配置

**验收标准**:
- [ ] 博客列表页加载时间 < 1.5s
- [ ] 文章详情页加载时间 < 1s
- [ ] 聊天响应时间 < 3s（包含 Rerank）
- [ ] Vectorize 检索时间 < 500ms
- [ ] 部署到 Cloudflare Workers 后所有功能正常
- [ ] Observability 日志能看到聊天和检索记录

---

## 风险与注意事项

1. **Vectorize 索引限制**：免费层 100 万向量，需监控使用量
2. **多语言支持**：Embed 模型对中文支持可能不如英文，需测试
3. **增量更新**：需实现文章更新时的向量删除/重新生成机制
4. **隐私考虑**：博客内容公开，注意不要包含敏感信息
5. **动画性能**：移动端设备可能动画卡顿，需提供降级选项
6. **MDX 编译时间**：大量 MDX 文件可能增加构建时间
7. **Git 时间戳**：需确保使用 Git 提交时间而非文件修改时间，避免 clone 后时间变化

---

---

## 待决定事项

- [x] 评论系统：移至下一次迭代（Disqus / Giscus / 自建）
- [x] 数学公式：不需要 LaTeX/KaTeX 支持
- [x] 图片优化：使用 Next.js Image 组件（已配置 Cloudflare IMAGE binding）
- [x] FrontMatter 简化：slug/date/locale/translations 自动生成，封面图和分类标签可选
- [x] 页面过渡动画：使用 View Transitions API 替代 Framer Motion
- [x] 布局设计：侧边栏包含搜索、分类、标签云、作者信息

---

## 参考资源

- Cloudflare Workers AI: https://developers.cloudflare.com/workers-ai/
- Cloudflare Vectorize: https://developers.cloudflare.com/vectorize/
- RAG 最佳实践：https://developers.cloudflare.com/workers-ai/examples/rag/
- Next.js MDX: https://nextjs.org/docs/pages/building-your-application/configuring/mdx
- View Transitions API: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
- Shiki 高亮：https://shiki.style/
- Rehype 插件：https://github.com/rehypejs/rehype
