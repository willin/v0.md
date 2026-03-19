# 博客 + RAG 知识库 - 任务清单

> 创建日期：2026-03-18
> 优先级：高
> 状态：规划完成，待实施

---

## 阶段 1：博客系统基础 ✅

> **目标**: 可以创建和展示博客文章，支持中英双语
> **状态**: 已完成
> **完成日期**: 2026-03-19

### 任务清单
- [x] 1.1 创建内容目录结构 `src/content/blog/`
- [x] 1.2 安装 MDX 相关依赖（react-markdown, remark-gfm, rehype-slug, rehype-autolink-headings）
- [x] 1.3 配置 `next.config.ts` 支持 MDX
- [x] 1.4 创建博客 Frontmatter 类型定义 (`src/types/blog.ts`)
- [x] 1.5 编写博客解析工具 `src/lib/blog.ts`（含 Git 时间戳获取）
- [x] 1.6 创建博客列表页 (`/[locale]/blog/page.tsx`) 带侧边栏布局
- [x] 1.7 创建博客详情页 (`/[locale]/blog/[slug]/page.tsx`) 带侧边栏
- [x] 1.8 创建侧边栏组件（搜索框、分类列表、标签云、作者信息）
- [x] 1.9 实现多语言翻译检测组件
- [x] 1.10 添加 View Transitions 页面过渡动画

### 验收标准
- [x] 访问 `/zh/blog` 能看到示例文章列表（至少 1 篇中文示例）
- [x] 点击文章能查看详情页，URL 格式为 `/zh/blog/YYYY-MM-DD-slug`
- [x] 侧边栏显示：搜索框、分类列表、标签云、作者信息卡片
- [x] 文章详情页侧边栏目录随页面滚动高亮当前章节
- [x] 如果文章有另一语言版本，页面顶部显示语言切换提示
- [x] 从首页导航到博客列表页时有 View Transitions 过渡动画
- [x] 无封面图的文章在列表中正常显示（仅标题 + 描述）
- [ ] 有封面图的文章在列表中显示缩略图（当前示例文章无封面图）
- [x] 点击侧边栏分类/标签能筛选文章

### 实施总结
**新增文件**:
- `src/components/blog/BlogCard.tsx` - 博客卡片组件
- `src/components/blog/BlogList.tsx` - 博客列表组件（含搜索/筛选）
- `src/components/blog/TableOfContents.tsx` - 目录组件（滚动跟随）
- `src/components/blog/ReadingProgress.tsx` - 阅读进度条
- `src/components/blog/BlogDetailSidebar.tsx` - 详情页侧边栏包装器
- `src/app/[locale]/blog/page.tsx` - 博客列表页
- `src/app/[locale]/blog/[slug]/page.tsx` - 博客详情页
- `src/app/[locale]/blog/[slug]/MDXContent.tsx` - MDX 渲染组件

**修改文件**:
- `src/app/globals.css` - 添加 prose 样式、View Transitions 动画
- `src/components/blog/BlogSidebar.tsx` - 修复 TypeScript 类型
- `src/lib/blog.ts` - 修复 TypeScript 类型转换问题

**依赖安装**:
```bash
pnpm add react-markdown remark-gfm rehype-slug rehype-autolink-headings
```

### 已知问题
- 暂无

---

## 阶段 1.5：博客系统优化 ✅

> **目标**: 修复用户体验问题，优化侧边栏布局和功能
> **状态**: 已完成
> **完成日期**: 2026-03-19
> **优先级**: 高

### 任务清单
- [x] 1.11 博客列表卡片添加链接到文章详情页
- [x] 1.12 首页添加链接到博客列表
- [x] 1.13 边栏用户信息卡片移到最上方，使用与首页相同的 Avatar
- [x] 1.14 中英文标签、分类单独呈现（中文只显示中文，英文只显示英文）
- [x] 1.15 文章 meta 信息显示字数统计
- [x] 1.16 边栏添加统计信息（总文章数、总字数）

### 验收标准
- [x] 博客列表卡片点击任意位置可跳转到文章详情页
- [x] 首页导航或内容区有明确链接到博客列表
- [x] 侧边栏布局：作者信息卡片在最顶部，头像与首页一致
- [x] 中文页面只显示中文分类和标签，英文页面只显示英文分类和标签
- [x] 文章详情页显示字数统计（如：366 字）
- [x] 侧边栏统计卡片显示总文章数和总字数

### 实施总结

**修改文件**:
- `src/components/blog/BlogCard.tsx` - 添加 Link 包裹器和字数统计显示
- `src/app/[locale]/page.tsx` - 添加博客链接按钮
- `src/components/blog/BlogSidebar.tsx` - 重构：作者卡片置顶、SVG 地球头像、语言过滤、统计组件
- `src/components/blog/BlogList.tsx` - 添加 stats 获取并传递给侧边栏
- `src/lib/blog.ts` - 新增 `getBlogStats()` 函数
- `src/app/[locale]/blog/[slug]/page.tsx` - 添加字数统计显示

**关键实现**:
1. 使用 Next.js `Link` 组件包裹博客卡片实现点击跳转
2. 首页添加渐变样式的博客链接按钮，支持 View Transitions
3. 侧边栏使用与首页相同的 SVG Globe 头像，作者信息移至顶部
4. 通过 `containsChinese()` 正则和 `filterByLanguage()` 实现分类/标签语言过滤
5. 字数统计使用 `reading-time` 包的 `words` 字段
6. 统计信息通过 `getBlogStats()` 获取总文章数和总字数

---

## 阶段 1.6：博客体验优化

> **目标**: 修复语言切换问题，添加导航 Header，优化目录和样式
> **状态**: 已完成
> **优先级**: 高
> **完成日期**: 2026-03-19

### 任务清单
- [x] 1.17 修复文章详情页语言切换时 Slug 错误导致 404 的问题
- [x] 1.18 参考首页添加语言切换和主题切换按钮
- [x] 1.19 创建 HeaderNav 组件（带 View Transitions 动画）
- [x] 1.20 实现 Hero 到 HeaderNav 的滚动缩放效果
- [x] 1.21 修复锚点链接：不要新窗口打开，平滑滚动
- [x] 1.22 优化侧边栏目录：最多三级标题，默认只显示一级，随滚动展开二三级
- [x] 1.23 优化侧边栏目录缩进层次
- [x] 1.24 修复文章详情页样式（一级标题比二级标题小的问题）
- [x] 1.25 创建 MDX 示例文章展示 Markdown、代码高亮和 MDX 特性

### 验收标准
- [x] 文章详情页语言切换链接能正确跳转到对应语言的页面（不 404）
- [x] 博客列表页和详情页顶部有 HeaderNav，包含 Logo、标题、导航链接
- [x] HeaderNav 默认展示为 Hero 区域，滚动后缩放成固定导航
- [x] 回到页面顶部时恢复 Hero 展示
- [x] 点击文章内锚点链接在当前窗口平滑滚动到目标位置
- [x] 侧边栏目录最多显示三级标题（H2、H3、H4）
- [x] 默认只显示一级标题（H2），滚动时展开当前章节下的 H3、H4
- [x] 目录有明显缩进层次（H2 > H3 > H4）
- [x] 文章标题样式层级正确（H1 > H2 > H3 > H4）
- [x] 示例文章展示：标题层级、代码块、表格、引用、列表、MDX 组件

### 实施总结

**新增文件**:
- `src/components/blog/PostHero.tsx` - Hero 区域组件，带滚动缩放效果
- `src/components/blog/HeaderNav.tsx` - 顶部导航组件（已在阶段 1.5 创建）
- `src/content/blog/2026-03-19-mdx-demo.zh.mdx` - MDX 示例文章

**修改文件**:
- `src/app/[locale]/blog/[slug]/page.tsx` - 添加 PostHero 组件，移除重复内容
- `src/i18n/locales/zh.json` - 添加 nav 对象
- `src/i18n/locales/en.json` - 添加 nav 对象
- `src/app/[locale]/blog/[slug]/MDXContent.tsx` - 添加 scrollToAnchor 平滑滚动
- `src/components/blog/TableOfContents.tsx` - 重写为滚动跟随展开模式

**关键实现**:
1. PostHero 使用 `scrollProgress` state + CSS transforms 实现 Hero 图像滚动缩放效果
2. HeaderNav 从 dictionary 读取导航文本，支持语言/主题切换
3. MDXContent.tsx 添加 `scrollToAnchor` 处理站内锚点链接
4. TableOfContents.tsx 使用 IntersectionObserver 追踪当前标题，自动展开父级 H2
5. 修复 locale JSON 缺失 `nav` 对象导致的构建错误

---

---

## 阶段 1.7：UI/UX 改进

> **目标**: 修复样式问题，优化用户体验，增强 MDX 功能
> **状态**: 已完成 ✅
> **优先级**: 高
> **完成日期**: 2026-03-19

### 背景

Phase 1.6 已完成博客系统基础优化，但遗留以下 UI/UX 问题需要修复：
1. HeaderNav 组件样式不一致
2. 首页缺少 HeaderNav
3. 硬编码翻译需要重构
4. 目录组件体验优化
5. 统计功能按语言分离
6. MDX 功能增强

### 任务清单

#### HeaderNav 优化
- [x] 1.26 修复 HeaderNav 右侧 Toggle 按钮样式（统一高度，与首页一致）
  - [x] 1.26.1 分析首页 Toggle 组件样式（LocaleToggle, ThemeToggle）
  - [x] 1.26.2 统一 HeaderNav 中两个组件的按钮高度（建议 32px 或 36px）
  - [x] 1.26.3 确保边框、圆角、间距与首页一致
  - [x] 1.26.4 添加 View Transitions 动画效果
- [x] 1.27 首页添加 HeaderNav 组件，导航链接添加图标
  - [x] 1.27.1 在首页布局中添加 HeaderNav 组件
  - [x] 1.27.2 为导航链接添加图标（首页使用 Home 图标，博客使用 Book 图标）
  - [x] 1.27.3 添加页面间 View Transitions 过渡动画
- [x] 1.28 重构硬编码翻译为 dictionary 访问
  - [x] 1.28.1 全面扫描代码中的三元运算符翻译模式
  - [x] 1.28.2 创建统一的翻译键命名规范
  - [x] 1.28.3 更新 `zh.json` 和 `en.json` 添加缺失翻译
  - [x] 1.28.4 重构所有硬编码位置使用 `dictionary.xxx` 访问

#### 侧边栏优化
- [x] 1.29 目录移到侧边栏底部，实现手风琴效果（只展开一个章节）
  - [x] 手风琴效果实现（只展开一个章节）
  - [x] 只在有子标题时显示箭头图标
  - [x] 移动 TableOfContents 到 BlogSidebar 底部
  - [x] 移除 sticky 定位，适配底部位置
- [x] 1.30 统计功能按语言分离（中文页面显示中文统计，英文页面显示英文统计）
  - [x] 重构 `getBlogStats()` 支持按语言过滤
  - [x] 在博客列表页传递当前语言参数
  - [x] 在博客详情页传递当前语言参数
  - [x] 侧边栏统计卡片显示当前语言的统计数据

#### MDX 功能增强
- [x] 1.31 修复代码高亮（使用 rehype-highlight 实现多色显示）
  - [x] 1.31.1 安装 rehype-highlight 和 highlight.js
  - [x] 1.31.2 在 MDXContent.tsx 中配置 rehype-highlight
  - [x] 1.31.3 导入 atom-one-dark 主题样式
  - [x] 1.31.4 验证构建成功
- [x] 1.32 支持 GitHub 风格 Alert 块（[!NOTE], [!TIP], [!WARNING] 等）
  - [x] 1.32.1 创建 Alert 组件（支持 note/tip/warning/caution/important 类型）
  - [x] 1.32.2 添加 remark-alerts 插件
  - [x] 1.32.3 在 MDXContent.tsx 中映射 Alert 组件
  - [x] 1.32.4 添加对应样式（边框、背景色、图标）
- [x] 1.33 移除 MDX 示例中的数学公式
- [x] 1.34 添加 Mermaid 流程图支持
  - [x] 1.34.1 安装 mermaid 包
  - [x] 1.34.2 创建 Mermaid 组件（客户端渲染）
  - [x] 1.34.3 添加 Remark 插件解析 mermaid 代码块
  - [x] 1.34.4 在 MDX 示例中添加流程图示例
  - [x] 1.34.5 适配深色模式
- [x] 1.35 修复行内代码、上标、下标、高亮样式，添加 Ruby 注音支持
  - [x] 1.35.1 添加 CSS 样式：`code`, `sup`, `sub`, `mark`
  - [x] 1.35.2 创建 Ruby 组件（支持 `<ruby>`, `<rt>`, `<rp>`）
  - [x] 1.35.3 在 MDXContent.tsx 中注册这些组件
  - [x] 1.35.4 在示例中添加展示

### 验收标准
- [x] HeaderNav 中语言切换和主题切换按钮高度一致（目测无差异）
- [x] 首页和博客列表页都有 HeaderNav，导航链接带图标
- [x] 代码中无 `locale === 'zh' ? ... : ...` 硬编码模式
- [x] 目录位于侧边栏底部，展开新章节时自动折叠其他
- [x] 无子标题的标题不显示箭头图标
- [x] 中文/英文页面分别显示对应语言的统计数据
- [x] 代码块有多色高亮显示
- [x] Alert 块正确渲染（带图标和背景色）
- [x] Mermaid 流程图正常显示 ✅ 浏览器验证确认 SVG 渲染（8 个 mermaid 容器，每个包含 SVG 元素）
- [x] 行内代码、上标、下标、高亮、Ruby 注音样式正确

### 实施顺序

按照依赖关系和逻辑顺序，建议按以下顺序实施：

1. **优先级 1（基础修复）**: ✅ 已完成
   - 1.26 HeaderNav 样式修复
   - 1.27 首页添加 HeaderNav
   - 1.28 翻译系统重构

2. **优先级 2（体验优化）**: ✅ 已完成
   - 1.29 目录组件优化
   - 1.30 按语言统计

3. **优先级 3（MDX 增强）**: ✅ 已完成
   - 1.33 移除数学公式 ✅
   - 1.31 代码高亮修复 ✅
   - 1.35 文本标签支持 ✅
   - 1.32 Alert 块支持 ✅
   - 1.34 Mermaid 流程图支持 ✅

### 文件清单

**新增文件**:
- `src/components/mdx/Alert.tsx`
- `src/components/mdx/Mermaid.tsx`
- `src/components/mdx/Ruby.tsx`
- `src/lib/mdx-alerts.ts`
- `src/lib/mdx-mermaid.ts`

**修改文件**:
- `src/components/HeaderNav.tsx`
- `src/components/LocaleToggle.tsx`
- `src/components/ThemeToggle.tsx`
- `src/components/blog/BlogDetailSidebar.tsx`
- `src/components/blog/TableOfContents.tsx`
- `src/components/blog/BlogSidebar.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/blog/page.tsx`
- `src/app/[locale]/blog/[slug]/MDXContent.tsx`
- `src/lib/blog.ts`
- `src/i18n/locales/zh.json`
- `src/i18n/locales/en.json`
- `src/app/globals.css`
- `src/content/blog/2026-03-19-mdx-demo.zh.mdx`
- `package.json`
- `next.config.ts`

### 实施总结 - 任务 1.31

**问题**: 原有的代码高亮方案缺失，代码块显示为纯文本。

**解决方案**: 使用 `rehype-highlight` 配合 `highlight.js` 实现代码语法高亮。

**实施步骤**:
1. 安装依赖：`pnpm add rehype-highlight highlight.js`
2. 在 `MDXContent.tsx` 中添加 `rehype-highlight` 插件
3. 导入 `highlight.js/styles/atom-one-dark.css` 主题样式

**关键代码**:
```typescript
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

// 在 rehypePlugins 中添加
rehypePlugins: [
  rehypeSlug,
  rehypeHighlight,  // 代码高亮
  [rehypeAutolinkHeadings, { ... }]
]
```

**优势**:
- 同步执行，与 ReactMarkdown 完美兼容
- 支持 300+ 种语言
- 多色语法高亮
- 无需复杂的异步配置

**已弃用方案**:
- `@shikijs/rehype` - 异步初始化与 ReactMarkdown 的同步渲染不兼容

---

## 实施总结 - 任务 1.34 (Mermaid 流程图支持)

**问题**: Mermaid 代码块渲染为纯文本代码块，而不是 SVG 图表。

**根本原因**:
- 之前的实现在 `div` 处理器中检查`className === 'mermaid'`
- 但 ReactMarkdown 与 rehype-raw 将代码块渲染为`<pre><code class="language-mermaid">`元素
- `div` 处理器方法永远无法匹配，因为代码块不是用带有`className='mermaid'`的 div 包裹的

**解决方案**:
1. 修改 `code` 组件处理器以检测 className 中的`language-mermaid` 模式
2. 使用正则表达式提取语言：`const match = /language-(\w+)/.exec(className || '')`
3. 当`match[1] === 'mermaid'`时，渲染`<Mermaid code={String(children)} />` 而不是常规代码元素
4. 移除了无效的 div 处理器代码

**关键代码**:
```typescript
code: ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  // Handle Mermaid diagrams
  if (match && match[1] === 'mermaid') {
    return <Mermaid code={String(children)} />;
  }
  // ... 其他代码处理
}
```

**验证结果**:
- 构建成功
- 浏览器自动化确认 8 个 mermaid 容器（4 个图表）
- SVG 元素包含正确的 mermaid CSS: `#mermaid-1773893012969{font-family:inherit;font-size:16px;fill:#333;}`
- 每个图表都有：`hasSvg: true`, `svgOuterHtml` 包含适当的 mermaid 属性（`id`, `class="flowchart"`, 动画关键帧）

**支持的图表类型**:
- 流程图 (graph TD/LR/RL 等)
- 序列图 (sequenceDiagram)
- 类图 (classDiagram)
- 饼图 (pie)

**深色模式支持**:
- Mermaid 组件使用 MutationObserver 检测 `document.documentElement.classList.contains('dark')`
- 自动切换 mermaid 主题 ('default' vs 'dark')
- 重新渲染 SVG 以适配深色模式

---

## 阶段 1.8：博客 UI/UX 修复

> **目标**: 修复用户反馈的 7 个 UI 问题
> **状态**: 验收未通过，需要修复
> **优先级**: 高
> **创建日期**: 2026-03-19
> **完成日期**: 待定

### 任务清单（初版实现 - 验收未通过）
- [x] 1.36 使用 @tailwindcss/typography 调整代码块换行样式
- [x] 1.37 修复 Alert 组件重复显示标题问题（删除 [!NOTE] 等原文）
- [x] 1.38 调整任务列表已完成/待完成的视觉区分度（颜色或样式）
- [x] 1.39 修复上一页/下一页按钮：统一大小位置，无内容时显示提示，移除日期前缀
- [x] 1.40 修复右侧边栏目录滚动跟随（sticky 定位）
- [x] 1.41 为 Mermaid 添加明暗主题切换（当前暗色主题下显示不清晰）
- [x] 1.42 修复 Ruby 注音样式（rt、rb 显示位置问题）

### 验收标准（初版 - 未通过）
- [x] 代码块可以正常换行，不溢出容器
- [x] Alert 组件只显示图标和内容，不显示原文 "[!NOTE]" 等标记
- [x] 任务列表已完成项和待完成项有明显视觉区分
- [x] 上一页/下一页按钮大小、位置一致，无内容时显示"无上一篇/下一篇"
- [x] 目录随页面滚动而滚动（sticky 或 fixed 定位）
- [x] Mermaid 图表在深色主题下清晰可见
- [x] Ruby 注音正确显示在汉字上方

### 用户反馈问题

1. **代码块换行失败** - 代码依然挤在一行内，行首多显示 "`" 符号
2. **行内代码显示为代码块** - 应该保持行内格式
3. **Ruby 下沉** - 注释应该在上方，但整体高度下沉了
4. **下一篇按钮宽度** - 只有上一篇的 1/3 宽度
5. **Alert 图标重复** - 显示两个图标（彩色 + 黑色），把文字挤到第二行
6. **TOC 高亮不明显** - 当前高亮的标题颜色不够明显（新增）
7. **标题下划线** - 文章标题有下划线需要移除（新增）
8. **Build 路径错误** - `/bundle/src/content/blog` 路径不存在（新增）

---

## 阶段 1.8-fix：博客 UI/UX 修复（重新实现）

> **目标**: 修复用户反馈的所有 8 个问题
> **状态**: 已完成 ✅
> **优先级**: 高
> **创建日期**: 2026-03-19
> **完成日期**: 2026-03-19

### 任务清单

- [x] 1.43-fix 代码块换行 - 正确实现自动换行，移除行首多余引号
- [x] 1.44-fix Alert 图标重复 - 移除第二个黑色图标
- [x] 1.45-fix 行内代码显示为代码块 - 正确区分 inline 和 block 代码
- [x] 1.46-fix Ruby 下沉 - 保持与原文同高度，注音在上方
- [x] 1.47-fix 下一篇按钮宽度 - 两按钮平均分配宽度，占满整行
- [x] 1.48-new TOC 高亮颜色 - 换更明显的颜色
- [x] 1.49-new 标题下划线 - 移除文章标题下划线
- [x] 1.50-new Build 路径错误 - 修复 `/bundle/src/content/blog` 路径问题

### 验收标准（全部通过 ✅）

- [x] 代码块自动换行，不溢出容器，无多余 "`" 符号 (whiteSpace: pre-wrap)
- [x] Alert 只显示一个彩色图标 (SVG 数量 = 0，已过滤)
- [x] 行内代码正确显示为行内格式
- [x] Ruby 注音在上方，整体高度与原文一致 (rubyPosition: over)
- [x] 上一篇/下一篇按钮宽度相等，占满整行
- [x] TOC 当前高亮标题颜色明显可见 (amber-600)
- [x] 文章标题无下划线 (textDecorationLine: none)
- [x] Build 后博客页面访问正常，无路径错误

### 实施总结

**修改文件**:
- `src/app/globals.css` - 添加标题 `no-underline`，修复 Ruby 样式使用标准 CSS ruby 属性，隐藏 octicon 元素
- `src/app/[locale]/blog/[slug]/MDXContent.tsx` - 修复代码块 className 和 Alert 图标过滤，移除冗余的 filterOcticonElements 函数
- `src/app/[locale]/blog/[slug]/page.tsx` - 修复下一篇按钮网格布局
- `src/components/blog/TableOfContents.tsx` - 增强 TOC 高亮为 amber 色
- `src/lib/blog.ts` - 使用 `import.meta.url` 和 `fileURLToPath` 处理路径

**关键修复**:
1. **代码块换行**: 移除 `className="block"`，让 rehype-highlight 应用自己的样式
2. **Alert 图标重复**: CSS 隐藏 octicon 元素 (`display: none !important`)，移除 React 端的 filterOcticonElements 函数
3. **Ruby 下沉**: 替换 `flex-col-reverse` 为 `ruby-position: over`
4. **按钮宽度**: 替换 `md:justify-self-end` 为 `block md:col-start-2`
5. **TOC 高亮**: 使用 `amber-600` 色和背景高亮
6. **标题下划线**: 添加 `no-underline` 到所有 h1-h6
7. **路径错误**: 使用 `import.meta.url` + `fileURLToPath` 获取正确的 `__dirname`

**代码清理**:
- 移除了 `filterOcticonElements` 递归函数（CSS 已处理隐藏）
- 移除了 `p` 处理器中的 octicon 检查逻辑
- 移除了 `div` 处理器中调用 filterOcticonElements 的代码

---

## 阶段 1.8-fix2：代码块功能增强

> **目标**: 添加复制代码按钮，优化代码块样式
> **状态**: 已完成 ✅
> **优先级**: 高
> **创建日期**: 2026-03-19
> **完成日期**: 2026-03-19

### 任务清单

- [x] 1.51-fix 移除 `:before :after {content: "`"}` 伪元素样式
- [x] 1.52-fix 修复代码块背景色覆盖整个容器
- [x] 1.53-new 添加复制代码按钮功能
- [x] 1.54-fix 修复语言检测：所有代码块显示正确语言名称
- [x] 1.55-fix 明暗主题适配：代码块背景色随主题切换

### 验收标准

- [x] 代码块无多余的反引号伪元素装饰
- [x] 代码块背景色与页面背景有明显对比，覆盖整个容器区域
- [x] 鼠标悬停时显示复制代码按钮
- [x] 点击复制按钮后显示成功反馈（绿色勾选图标）
- [x] 代码块显示语言标签
- [x] 语言检测正确：javascript, typescript, python, sql, bash 显示正确
- [x] 明亮主题：bg-white 背景（白色，与页面浅灰背景形成对比）
- [x] 暗黑主题：bg-gray-800/50 背景（半透明深灰色，带 border-gray-700 边框）

### 实施总结

**最终修复 (2026-03-19 延续会话)**:

问题：所有代码块显示 "text" 而非实际语言名称

根本原因：ReactMarkdown 处理器执行顺序问题 - `pre` 处理器在 `code` 处理器之前执行，导致 `pre` 处理器无法获取 `code` 元素的 language className

解决方案：将 `CodeBlock` 包装从 `pre` 处理器移动到 `code` 处理器

**修改文件**:
- `src/app/[locale]/blog/[slug]/MDXContent.tsx` - 重构 `pre` 和 `code` 处理器

**关键代码变更**:
```typescript
// pre 处理器 - 简化为只渲染 pre 元素
pre: ({ node, children, ...props }) => {
  const preProps = props as { className?: string };
  const originalClassName = preProps?.className;
  return (
    <pre {...props} className={`${originalClassName || ''} !bg-transparent`.trim()}>
      {children}
    </pre>
  );
},

// code 处理器 - 非行内代码块用 CodeBlock 包裹
code: ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  if (match && match[1] === 'mermaid') {
    return <Mermaid code={String(children)} />;
  }
  return inline ? (
    <code {...props} className="bg-gray-100 dark:bg-gray-800 ...">
      {children}
    </code>
  ) : (
    <CodeBlock className={className || ''}>
      <code {...props} className={className || ''}>
        {children}
      </code>
    </CodeBlock>
  );
},
```

**MCP 浏览器自动化验证结果**:
```json
{
  "theme": "light",
  "codeBlocks": [
    { "langLabel": "javascript", "bgClass": "bg-gray-50" },
    { "langLabel": "typescript", "bgClass": "bg-gray-50" },
    { "langLabel": "python", "bgClass": "bg-gray-50" },
    { "langLabel": "sql", "bgClass": "bg-gray-50" },
    { "langLabel": "bash", "bgClass": "bg-gray-50" }
  ]
}
```

暗黑主题验证：全部显示 `bg-gray-900`，语言标签正确。

**新增文件**:
- `src/components/mdx/CodeBlock.tsx` - 代码块包装组件，带复制按钮和语言标签

**修改文件**:
- `src/app/globals.css` - 修复 `pre` 和 `code` 样式，确保背景覆盖容器
- `src/app/[locale]/blog/[slug]/MDXContent.tsx` - 引入 CodeBlock 组件，更新 `pre` 和 `code` 处理器

**依赖安装**:
```bash
pnpm add lucide-react
```

**关键实现**:
1. **复制按钮**: 使用 `navigator.clipboard.writeText()` API 复制代码
2. **成功反馈**: 复制后显示绿色勾选图标 2 秒
3. **语言标签**: 从 `className` 提取语言名称并显示在左上角
4. **悬停显示**: 使用 `group-hover:opacity-100` 实现鼠标悬停时显示按钮
5. **背景覆盖**: 确保 `pre` 有背景色，`pre > code` 和 `.hljs` 背景透明

**关键实现**:
1. **复制按钮**: 使用 `navigator.clipboard.writeText()` API 复制代码
2. **成功反馈**: 复制后显示绿色勾选图标 2 秒
3. **语言标签**: 从 `className` 提取语言名称并显示在左上角
4. **悬停显示**: 使用 `group-hover:opacity-100` 实现鼠标悬停时显示按钮
5. **背景覆盖**: 确保 `pre` 有背景色，`pre > code` 和 `.hljs` 背景透明

**背景颜色修复 (2026-03-19 延续会话)**:

问题：代码块背景与页面背景颜色太接近，看不出来有代码块

原因：
- 浅主题：`bg-gray-50` ≈ `#f8f9fa`，页面背景 `--background: #f8fafc`（几乎一样）
- 暗主题：`bg-gray-900` ≈ `#111827`，页面背景 `--background: #0f172a`（几乎一样）

解决方案：
- 浅主题：改用 `bg-white border-gray-200` - 白色背景 + 细边框
- 暗主题：改用 `bg-gray-800/50 border-gray-700` - 半透明深灰色 + 细边框

验证结果：
- 浅主题：`rgb(255, 255, 255)` 白色背景，`1px solid` gray-200 边框
- 暗主题：`oklab(0.277998.../ 0.5)` 半透明灰色背景，`1px solid` gray-700 边框

代码提取逻辑**:
- 使用递归函数 `extractCodeText()` 从 React 元素中提取纯文本
- 支持处理字符串、数组和 ReactElement 类型
- 安全处理 TypeScript 类型断言

---

## 阶段 2：向量化管道

> **目标**: 博客文章可以自动向量化并存储到 Vectorize
> **预计**: 1 天

### 任务清单
- [ ] 2.1 创建 Cloudflare Vectorize 索引 (`wrangler vectorize create`)
- [ ] 2.2 创建 KV 命名空间（元数据缓存）(`wrangler kv:namespace create`)
- [ ] 2.3 更新 `wrangler.jsonc` 添加 Vectorize 和 KV 绑定
- [ ] 2.4 编写 Embed 脚本 (`src/scripts/embed-blog.ts`)
- [ ] 2.5 创建批量处理脚本（历史文章）
- [ ] 2.6 配置 GitHub Actions CI/CD

### 验收标准
- [ ] 运行 `npm run embed:blog` 能将所有博客文章向量化
- [ ] Vectorize 索引中能查询到向量数据
- [ ] KV 中存储了博客元数据（slug、标题、关键词等）
- [ ] 新增博客文章后，手动运行脚本能增量更新向量
- [ ] GitHub Actions 配置完成，push 博客文件后自动触发向量化

---

## 阶段 3：聊天集成

> **目标**: 聊天机器人能检索博客内容并标注来源
> **预计**: 1 天

### 任务清单
- [ ] 3.1 编写 RAG 检索逻辑 `src/lib/knowledge-search.ts`
- [ ] 3.2 实现向量检索（Top 5 候选）
- [ ] 3.3 集成 Rerank 精排（Top 3）
- [ ] 3.4 修改 `DigitalTwinChat.tsx` 支持混合检索
- [ ] 3.5 添加博客链接引用功能（标注来源）
- [ ] 3.6 测试检索准确率

### 验收标准
- [ ] 聊天时提问能触发博客知识库检索
- [ ] 检索结果经过 Rerank 精排后返回 Top 3
- [ ] 回答中包含相关博客文章的链接和标题
- [ ] 来源标注格式正确，点击链接能跳转到博客原文
- [ ] 用中文提问能检索到中文博客内容
- [ ] 用英文提问能检索到英文博客内容
- [ ] 预定义知识和博客知识混合检索正常工作

---

## 阶段 4：进阶功能

> **目标**: 博客搜索、RSS、SEO 优化
> **预计**: 1 天

### 任务清单
- [ ] 4.1 实现博客搜索功能（侧边栏搜索框）
- [ ] 4.2 生成 RSS Feed
- [ ] 4.3 SEO 优化（meta 标签、sitemap）

### 验收标准
- [ ] 在侧边栏搜索框输入关键词能实时过滤文章列表
- [ ] 访问 `/feed.xml` 能生成 RSS 订阅源
- [ ] RSS 包含最新文章标题、描述、链接
- [ ] 博客文章页面有正确的 meta 标签（title、description、og:image）
- [ ] 生成 sitemap.xml 包含所有博客文章

---

## 阶段 5：验证与部署

> **目标**: 完整功能测试并部署到 Cloudflare Workers
> **预计**: 1 天

### 任务清单
- [ ] 5.1 完整功能测试
- [ ] 5.2 性能优化（缓存策略）
- [ ] 5.3 部署到 Cloudflare Workers
- [ ] 5.4 监控和日志配置

### 验收标准
- [ ] 博客列表页加载时间 < 1.5s
- [ ] 文章详情页加载时间 < 1s
- [ ] 聊天响应时间 < 3s（包含 Rerank）
- [ ] Vectorize 检索时间 < 500ms
- [ ] 部署到 Cloudflare Workers 后所有功能正常
- [ ] Observability 日志能看到聊天和检索记录

---

## 待决定事项（已完成）

- [x] 博客格式：MDX（支持 React 组件交互）
- [x] 向量化触发：自动化 CI/CD 流程（GitHub Actions）
- [x] 评论系统：移至下一次迭代
- [x] 数学公式：不需要
- [x] 图片优化：使用 Next.js Image（已配置 Cloudflare IMAGES）
- [x] FrontMatter 简化：slug/date/locale/translations 自动生成
- [x] 页面过渡动画：使用 View Transitions API
- [x] 布局设计：侧边栏包含搜索、分类、标签云、作者信息

---

## 快速参考

### 启动开发
```bash
npm run dev    # 启动开发服务器
```

### 部署
```bash
npm run deploy # 部署到 Cloudflare Workers
```

### 向量化命令（阶段 2 后）
```bash
npm run embed:blog    # 向量化所有博客
npm run embed:latest  # 向量化最新文章
```
