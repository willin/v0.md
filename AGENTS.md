# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Next.js development server
npm run build     # Build for production
npm run lint      # Run ESLint with auto-fix
npm run deploy    # Build and deploy to Cloudflare Workers
npm run preview   # Preview locally using Cloudflare runtime
npm run cf-typegen # Generate Cloudflare environment types
```

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
