# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm run dev       # Start Next.js development server
pnpm run build     # Build for production
pnpm run lint      # Run ESLint with auto-fix
pnpm run deploy    # Build and deploy to Cloudflare Workers
pnpm run preview   # Preview locally using Cloudflare runtime
pnpm run cf-typegen # Generate Cloudflare environment types
```

## Development Principles

### Package Manager
- **Always use `pnpm`** instead of `npm` for all commands
- Example: `pnpm run dev`, `pnpm add <package>`, `pnpm remove <package>`

### Debugging & Testing
- **Use `next-devtools-mcp`** for debugging Next.js applications
- **Use Context7 MCP** (`query-docs`) to fetch library documentation
- **Use Cloudflare MCP** for Cloudflare-related queries
- **Avoid `curl` for testing** - Next.js apps are better tested in a real browser or with browser-based tools

### Documentation Resources
- Next.js docs: Use `next-devtools-mcp` or Context7 with "nextjs"
- Cloudflare docs: Use Cloudflare MCP `search_cloudflare_documentation`
- Other libraries: Use Context7 `query-docs`

## Architecture

This is a Next.js 16 application deployed to Cloudflare Workers using OpenNext.

### Stack
- **Framework**: Next.js 16.1.7 (App Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS v4
- **Deployment**: Cloudflare Workers via `@opennextjs/cloudflare`
- **Package Manager**: pnpm (inferred from node_modules structure)

### Key Files
- `src/app/` - App Router pages and layouts
- `open-next.config.ts` - OpenNext Cloudflare configuration
- `wrangler.jsonc` - Cloudflare Workers configuration
- `next.config.ts` - Next.js config with MCP server and Cloudflare context enabled

### Cloudflare Integration
- `getCloudflareContext()` available in dev and production
- Image optimization enabled via `IMAGES` binding
- R2 incremental cache available (commented out by default)
- Remote bindings enabled for local development

## Development Guidelines

### Internationalization (i18n)

**IMPORTANT**: This is a multi-language application that supports Chinese (zh), English (en), and potentially more languages in the future.

#### Prohibited Patterns

**DO NOT use these patterns:**

1. **No hardcoded language type assertions**: `as 'zh' | 'en'`
   - These will break when adding a third language
   - Use `Locale` type from `@/i18n/config` instead

2. **No `isZh` + ternary operator pattern**: `isZh ? '中文' : 'English'`
   - This binary pattern doesn't scale to multiple languages
   - Use dictionary-based translations instead

3. **No direct locale comparisons for content**: `locale === 'zh' ? ... : ...`
   - Content should come from dictionary files
   - Use `getDictionary()` for translated strings

#### Correct Patterns

```typescript
// ✅ Import and use the Locale type
import { Locale, getDictionary } from '@/i18n/config';

// ✅ Use dictionary for translations
const dictionary = await getDictionary(locale as Locale);
<p>{dictionary.nav.home}</p>

// ✅ Use Locale type for type safety
function MyComponent({ locale }: { locale: Locale }) {
  // ...
}

// ✅ Use getDictionary() in components
const dictionary = await getDictionary(locale);
```

#### Adding New Languages

When adding a new language (e.g., Japanese 'ja'):
1. Add to `i18n.locales` in `src/i18n/config.ts`
2. Create `src/i18n/locales/ja.json` dictionary
3. Update type definitions if needed
4. No changes needed to existing components using dictionaries

#### ESLint Rule

A custom ESLint rule `custom/no-hardcoded-locale` is configured to catch these patterns:
- `as 'zh' | 'en'` type assertions
- `locale === 'zh'` direct comparisons
- `isZh ? ... : ...` binary ternary expressions

Run `pnpm run lint` to check for violations.

#### Allowed Exceptions (Functional Logic)

The following patterns are **allowed** because they are functional logic, not display text:

1. **Date formatting** in blog components:
   ```typescript
   const dateLocale = locale === 'zh' ? 'zh-CN' : 'en-US';
   const dateStr = new Date(post.date).toLocaleDateString(dateLocale);
   ```

2. **Content filtering** by language (e.g., filtering categories/tags by Chinese characters):
   ```typescript
   const isZh = locale === 'zh';
   const filteredCategories = filterByLanguage(categories, isZh);
   ```

3. **Route/link generation** in page components:
   ```typescript
   {post.translations.zh && locale !== 'zh' && (
     <Link href={`/zh/blog/${post.translations.zh}`}>...</Link>
   )}
   ```

4. **Data layer** files (`lib/blog.ts`, `data/`) for translation lookups:
   ```typescript
   if (file.locale === 'zh') {
     translations.zh = slug;
   }
   ```

5. **Config files** (`i18n/config.ts`) for locale detection and dictionary loading.

#### Translation Files

- `src/i18n/locales/zh.json` - Chinese translations
- `src/i18n/locales/en.json` - English translations

Translation keys are organized by feature:
- `home.*` - Homepage (about, chat, theme toggle, etc.)
- `nav.*` - Navigation links
- `blog.*` - Blog pages (post, sidebar, card, filter, notFound)
- `common.*` - Shared strings (home, blog)
- `footer.*` - Footer text
- `notFound.*` - 404 pages

#### i18n Implementation Summary

**Refactored Components** (using dictionary-based translations):
- `src/components/layout/Footer.tsx`
- `src/components/blog/BlogCard.tsx`
- `src/components/blog/BlogList.tsx`
- `src/components/blog/PostHero.tsx`
- `src/components/blog/BlogSidebar.tsx` (functional filtering allowed)
- `src/components/chat/DigitalTwinChat.tsx`
- `src/app/[locale]/blog/page.tsx`
- `src/app/[locale]/blog/[slug]/page.tsx`
- `src/app/[locale]/blog/[slug]/not-found.tsx`
- `src/app/[locale]/not-found.tsx`

**Utility Files**:
- `src/i18n/client.ts` - `useTranslation` hook for client components
- `src/i18n/config.ts` - `getDictionary()` for server components, `Locale` type
- `eslint/rules/no-hardcoded-locale.js` - Custom ESLint rule

### Code Examples

#### ❌ Bad: Hardcoded locale type

```typescript
// Don't do this
const locale = params.locale as 'zh' | 'en';
```

#### ✅ Good: Use Locale type

```typescript
import { Locale } from '@/i18n/config';

const locale = params.locale as Locale;
```

#### ❌ Bad: Binary language check

```typescript
// Don't do this
const isZh = locale === 'zh';
return <p>{isZh ? '首页' : 'Home'}</p>;
```

#### ✅ Good: Dictionary-based translation

```typescript
import { getDictionary } from '@/i18n/config';

const dictionary = await getDictionary(locale);
return <p>{dictionary.nav.home}</p>;
```

#### ❌ Bad: Hardcoded date format

```typescript
// Don't do this
const dateStr = date.toLocaleDateString(isZh ? 'zh-CN' : 'en-US');
```

#### ✅ Good: Use locale-specific format

```typescript
// Create a helper function or use a library like date-fns
import { formatDate } from '@/lib/date';
const dateStr = formatDate(date, locale);
```
