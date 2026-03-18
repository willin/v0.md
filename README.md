# Willin Wang - Personal Portfolio & Digital Twin

> A Next.js 16 application deployed to Cloudflare Workers featuring a personal portfolio and AI-powered digital twin chatbot with i18n support and theme switching.

[English](#english) | [中文](#中文)

---

## English {#english}

### Introduction

This is a [Next.js](https://nextjs.org) project featuring a personal homepage for Willin Wang with a digital twin chatbot. The application showcases:

- Internationalization support (English and Chinese)
- Dynamic theme switching (light/dark/system)
- Interactive digital twin chatbot with pre-programmed responses
- Responsive design for all device sizes
- Deployment to Cloudflare Workers using @opennextjs/cloudflare

### Tech Stack

- **Framework**: Next.js 16.1.7 (App Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS v4
- **Deployment**: Cloudflare Workers
- **Package Manager**: pnpm
- **Internationalization**: Next.js i18n
- **State Management**: React Context API

### Features

- Personal profile showcase
- Digital twin chatbot with AI-powered responses
- Dual theme support (light/dark)
- Multi-language support (English/Chinese)
- Responsive mobile-friendly design
- LocalStorage for theme persistence

### Quick Start

#### Prerequisites

- Node.js 18+
- pnpm
- Cloudflare account (for deployment)

#### Installation

```bash
pnpm install
```

#### Development

Start the Next.js development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Preview

Preview the application locally using Cloudflare runtime:

```bash
pnpm run preview
```

#### Deploy

Deploy to Cloudflare Workers:

```bash
pnpm run deploy
```

#### Lint

Run ESLint:

```bash
pnpm run lint
```

### Project Structure

```
├── src/
│   ├── app/                      # App Router pages and layouts
│   │   ├── [locale]/             # Internationalized routes
│   │   │   ├── layout.tsx        # Locale-aware layout
│   │   │   └── page.tsx          # Main home page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Root redirect
│   ├── components/               # Reusable components
│   │   ├── ThemeToggle.tsx       # Theme switching component
│   │   ├── profile/              # Profile section
│   │   │   └── ProfileSection.tsx
│   │   └── chat/                 # Chat section
│   │       └── DigitalTwinChat.tsx
│   ├── contexts/                 # React contexts
│   │   └── ThemeContext.tsx
│   ├── data/                     # Static data
│   │   ├── profile.ts            # User profile data
│   │   └── digital-twin-knowledge.ts
│   └── i18n/                     # Internationalization
│       ├── config.ts             # i18n configuration
│       └── locales/              # Translation files
│           ├── en.json
│           └── zh.json
├── docs/
│   ├── openapi.json              # OpenAPI Specification v3.1.1
│   └── README.md                 # API documentation
├── tasks/                        # Task management files
├── .claude/
│   ├── agents/                   # Agent configurations
│   └── settings.json             # MCP server configurations
├── open-next.config.ts           # OpenNext Cloudflare config
├── wrangler.jsonc                # Cloudflare Workers config
└── next.config.ts                # Next.js config
```

### API Documentation

- [OpenNext Cloudflare Docs](https://opennext.js.org/cloudflare)
- [Next.js Documentation](https://nextjs.org/docs)
- [API Documentation](./docs/openapi.json)

---

## 中文 {#中文}

### 项目简介

本项目是一个用于展示老王（v0）个人资料和AI数字分身聊天机器人的 Next.js 应用程序。应用程序特色：

- 国际化支持（英语和中文）
- 动态主题切换（明亮/暗黑/系统）
- 具有预编程响应的交互式数字分身聊天机器人
- 适用于所有设备尺寸的响应式设计
- 使用 @opennextjs/cloudflare 部署到 Cloudflare Workers

### 技术栈

- **框架**: Next.js 16.1.7 (App Router)
- **React**: 19.2.4
- **样式**: Tailwind CSS v4
- **部署**: Cloudflare Workers
- **包管理器**: pnpm
- **国际化**: Next.js i18n
- **状态管理**: React Context API

### 功能特色

- 个人资料展示
- 具有AI响应的数字分身聊天机器人
- 双主题支持（明亮/暗黑）
- 多语言支持（英语/中文）
- 响应式移动友好设计
- 本地存储实现主题持久化

### 快速开始

#### 前置要求

- Node.js 18+
- pnpm
- Cloudflare 账户（用于部署）

#### 安装

```bash
pnpm install
```

#### 开发

启动 Next.js 开发服务器：

```bash
pnpm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

#### 预览

使用 Cloudflare 运行时在本地预览：

```bash
pnpm run preview
```

#### 部署

部署到 Cloudflare Workers：

```bash
pnpm run deploy
```

#### 代码检查

运行 ESLint：

```bash
pnpm run lint
```

### 项目结构

```
├── src/
│   ├── app/                      # App Router 页面和布局
│   │   ├── [locale]/             # 国际化路由
│   │   │   ├── layout.tsx        # 本地化布局
│   │   │   └── page.tsx          # 主页
│   │   ├── globals.css           # 全局样式
│   │   ├── layout.tsx            # 根布局
│   │   └── page.tsx              # 根重定向
│   ├── components/               # 可复用组件
│   │   ├── ThemeToggle.tsx       # 主题切换组件
│   │   ├── profile/              # 个人资料区
│   │   │   └── ProfileSection.tsx
│   │   └── chat/                 # 聊天区
│   │       └── DigitalTwinChat.tsx
│   ├── contexts/                 # React 上下文
│   │   └── ThemeContext.tsx
│   ├── data/                     # 静态数据
│   │   ├── profile.ts            # 用户资料数据
│   │   └── digital-twin-knowledge.ts
│   └── i18n/                     # 国际化
│       ├── config.ts             # i18n 配置
│       └── locales/              # 翻译文件
│           ├── en.json
│           └── zh.json
├── docs/
│   ├── openapi.json              # OpenAPI 规范 v3.1.1
│   └── README.md                 # API 文档说明
├── tasks/                        # 任务管理文件
├── .claude/
│   ├── agents/                   # Agent 配置
│   └── settings.json             # MCP 服务器配置
├── open-next.config.ts           # OpenNext Cloudflare 配置
├── wrangler.jsonc                # Cloudflare Workers 配置
└── next.config.ts                # Next.js 配置
```

### 文档资源

- [OpenNext Cloudflare 文档](https://opennext.js.org/cloudflare)
- [Next.js 文档](https://nextjs.org/docs)
- [API 文档](./docs/openapi.json)

---

## License

MIT
