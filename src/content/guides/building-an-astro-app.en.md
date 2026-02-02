---
title: "Building a Portfolio Site with Astro"
description: "Technical guide documenting how this site is built using Astro, including routing, content collections, and internationalization."
tags: ["astro", "frontend", "architecture", "guides"]
date: 2026-02-01T00:00:00-6:00
updatedDate: 2026-02-01T00:00:00-6:00
draft: false
---

# Building a Portfolio Site with Astro

This guide documents the architecture and design decisions behind a real portfolio site built with Astro. Rather than focusing on code details, it explains **why** things are structured the way they are, making it useful for developers new to Astro who want to understand how to build maintainable, scalable sites.

> **Reference project**: [devfolio on GitHub](https://github.com/box-bm/devfolio)

## Table of Contents

- [Why Astro?](#why-astro)
- [Project Overview](#project-overview)
- [Core Architecture Decisions](#core-architecture-decisions)
- [File-Based Routing](#file-based-routing)
- [Internationalization Strategy](#internationalization-strategy)
- [Content Collections](#content-collections)
- [Component Structure](#component-structure)
- [TypeScript Configuration](#typescript-configuration)
- [Conclusion](#conclusion)

## Why Astro?

Astro was chosen for this project because it excels at **content-first websites**. Unlike traditional SPAs that ship entire JavaScript frameworks to the browser, Astro generates static HTML by default and only adds JavaScript where specifically needed.

Key benefits for this use case:

- **Zero JS by default**: Perfect for portfolios and content sites where interactivity is minimal
- **Performance out of the box**: Static generation means fast load times without optimization work
- **Content Collections**: Type-safe content management with Markdown/MDX
- **Island Architecture**: Add React, Vue, or other frameworks only where needed
- **Developer Experience**: File-based routing, hot reload, and great TypeScript support

The official Astro documentation provides comprehensive information on these concepts: [docs.astro.build](https://docs.astro.build)

## Project Overview

The site serves multiple purposes:

- Personal portfolio showcasing projects and skills
- Technical guides and blog posts
- Legal documentation for mobile apps
- Multi-language support (English and Spanish)

The architecture needed to handle:

- Dynamic content in multiple languages
- Type-safe content schemas
- Reusable UI components
- Clean, maintainable code structure

## Core Architecture Decisions

### Separation of Concerns

The project structure clearly separates different responsibilities:

```
src/
├── pages/           # Routes and page templates
├── layouts/         # Shared page structures
├── components/      # Reusable UI elements
├── content/         # Markdown content
├── i18n/           # Translation logic
├── styles/         # Global styles
└── constants/      # Shared constants
```

**Why this matters**: Each directory has a single, clear purpose. When you need to modify routing, you go to `pages/`. When you need to update a reusable button, you go to `components/`. This predictability makes the codebase easier to navigate and maintain as it grows.

### Static Site Generation

The entire site is pre-rendered at build time using Astro's Static Site Generation (SSG). No content is fetched at runtime.

**Why this matters**:

- Every page is pure HTML, loaded instantly
- No runtime data fetching means no loading states or spinners
- Better SEO because search engines see complete content immediately
- Lower hosting costs (can be served from CDN)

Learn more: [Static Site Generation in Astro](https://docs.astro.build/en/guides/server-side-rendering/)

## File-Based Routing

Astro generates routes based on files in `src/pages/`. This project uses a dynamic routing strategy with language prefixes.

### The Route Structure

```
src/pages/
├── index.astro                          → / (redirects to /en)
├── [...lang]/
│   ├── index.astro                     → /en, /es
│   └── guides/
│       ├── index.astro                 → /en/guides, /es/guides
│       └── [slug].astro                → /en/guides/getting-started-with-nvim
└── legal/
    └── [appName]/
        └── [type]/
            ├── index.astro
            └── [lang].astro
```

### Why Dynamic Routes?

The `[...lang]` syntax creates a catch-all route that captures the language code. This approach has several advantages:

1. **Single source of truth**: One template generates all language variants
2. **Type safety**: TypeScript knows what params are available
3. **Easy to extend**: Adding a new language requires minimal changes
4. **URL consistency**: `/en/guides` and `/es/guides` follow the same pattern

### How Static Paths Work

For dynamic routes to work with SSG, you must tell Astro which paths to generate using `getStaticPaths()`:

```typescript
export async function getStaticPaths() {
  return [{ params: { lang: "en" } }, { params: { lang: "es" } }];
}
```

This explicitly defines which language routes should be pre-rendered at build time.

**Official documentation**: [Dynamic Routes](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes)

## Internationalization Strategy

Rather than using folder-based routing (`/en/` vs `/es/`) or query parameters, this project uses **language prefixes in URLs**.

### Key Principles

1. **Every language has a prefix**: Even the default language uses `/en`
2. **No implicit redirects**: The root `/` explicitly redirects to `/en`
3. **Language extracted from URL**: The `getLangFromUrl()` utility reads params, not cookies or headers

### Astro i18n Configuration

```javascript
// astro.config.mjs
export default defineConfig({
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false, // Set to false for cleaner URLs
    },
  },
});
```

**Why this approach?**

- URLs are predictable and shareable
- No server-side logic needed to determine language
- Better for SEO (each language has distinct URLs)
- Users can manually switch languages by editing the URL

The i18n utilities handle translation lookup:

```typescript
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
```

**Learn more**: [Astro Internationalization Guide](https://docs.astro.build/en/guides/internationalization/)

## Content Collections

Content Collections are Astro's recommended way to manage structured content like blog posts, documentation, or project descriptions.

### Why Content Collections?

Instead of manually importing Markdown files, Content Collections provide:

- **Type safety**: Define schemas with Zod
- **Automatic validation**: Content is checked at build time
- **Organized content**: Clear separation from code
- **Powerful queries**: Filter and sort with JavaScript

### Schema Definition

The project defines two collections in `src/content.config.ts`:

```typescript
const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    updatedDate: z.date(),
    draft: z.boolean().default(false),
  }),
});
```

**What this achieves**:

- TypeScript knows exactly what frontmatter fields exist
- Required fields are enforced
- Date fields are parsed correctly
- Draft posts can be excluded from production builds

### Content File Naming

Content files follow a specific pattern:

```
content/guides/
├── building-an-astro-app.en.md
├── building-an-astro-app.es.md
├── getting-started-with-nvim.en.md
└── getting-started-with-nvim.es.md
```

The naming convention `{slug}.{lang}.md` makes it easy to:

- Identify content by language
- Generate routes programmatically
- Keep related translations together

### Loading Content in Pages

Dynamic guide pages use `getStaticPaths()` to generate all possible routes:

```typescript
export async function getStaticPaths() {
  const guides = await getCollection("guides", (guide) => !guide.data.draft);

  return guides.flatMap((guide) => ({
    props: { guide },
    params: {
      lang: guide.id.split(".")[1],
      slug: guide.id.split(".")[0],
    },
  }));
}
```

This creates routes like `/en/guides/building-an-astro-app` and `/es/guides/construyendo-un-sitio-con-astro`.

**Official docs**: [Content Collections](https://docs.astro.build/en/guides/content-collections/)

## Component Structure

Components are organized by responsibility, not by page. This makes them more reusable and easier to maintain.

### Component Categories

**Layout Components** (`src/layouts/`)

- `Base.astro`: HTML structure, fonts, theme initialization
- `Website.astro`: Portfolio page wrapper with header/footer
- `Guides.astro`: Guide page wrapper with breadcrumbs
- `Legal.astro`: Legal document wrapper

**UI Components** (`src/components/`)

- `Button.astro`: Reusable button with variants
- `Card.astro`: Content cards with hover effects
- `Chip.astro`: Tags and labels
- `Header.astro`: Navigation with mobile menu
- `Footer.astro`: Site footer with translations

**Specialized Components**

- `ProjectCard.astro`: Portfolio project display
- `TechChip.astro`: Technology stack badges
- `LanguagePicker.astro`: Language switching dropdown

### Component Design Philosophy

Components in this project follow these principles:

1. **Single Responsibility**: Each component does one thing well
2. **Prop-based Configuration**: Behavior is controlled through props, not hard-coded
3. **Scoped Styles**: CSS is scoped to components to avoid conflicts
4. **Minimal JavaScript**: Only add client-side JS when necessary

Example: The `Button` component accepts a `type` prop to change appearance rather than having separate button components for each variant.

## TypeScript Configuration

The `tsconfig.json` uses path aliases to make imports cleaner and more maintainable:

```json
{
  "paths": {
    "@components/*": ["./src/components/*"],
    "@layouts/*": ["./src/layouts/*"],
    "@i18n/*": ["./src/i18n/*"],
    "@constants": ["./src/constants/index.ts"]
  }
}
```

**Why this matters**:

- Imports are easier to read: `@components/Button.astro` vs `../../../components/Button.astro`
- Refactoring is safer: Moving files doesn't break imports
- IDE autocomplete works better with absolute paths

The configuration also enables:

- `strictNullChecks`: Catches potential null/undefined errors
- `verbatimModuleSyntax`: Ensures imports are handled correctly
- Astro-specific TypeScript support via `@astrojs/ts-plugin`

## Conclusion

This architecture demonstrates how to build a content-focused site with Astro by:

- **Embracing static generation**: Pre-render everything for maximum performance
- **Using file-based routing**: Let the file system define your URLs
- **Leveraging Content Collections**: Get type safety for all content
- **Organizing by responsibility**: Keep related code together
- **Making i18n explicit**: Language is part of the URL structure

The key insight is that Astro works best when you treat your site as **content that needs to be displayed**, not as an application that happens to have content. This mindset shift leads to simpler, faster, and more maintainable sites.

### Further Reading

- [Astro Documentation](https://docs.astro.build/)
- [Content Collections Deep Dive](https://docs.astro.build/en/guides/content-collections/)
- [Routing in Astro](https://docs.astro.build/en/core-concepts/routing/)
- [Internationalization Guide](https://docs.astro.build/en/guides/internationalization/)
- [TypeScript in Astro](https://docs.astro.build/en/guides/typescript/)
