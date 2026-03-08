# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview  # Preview production build
npm run test     # Run tests with vitest
```

Format with Prettier (configured for Astro via `prettier-plugin-astro`):
```bash
npx prettier --write .
```

## Architecture

This is a personal portfolio and developer website built with **Astro 5**, deployed at `https://boxdev.me`.

### Routing & i18n

The site supports **English (default) and Spanish**. Routing uses Astro's built-in i18n with `prefixDefaultLocale: false`, meaning English is served at `/` and Spanish at `/es/`.

- `src/pages/[...lang]/` — localized pages (home, guides, legal listing)
- `src/pages/index.astro` — root redirect
- `src/i18n/` — translation system:
  - `ui.ts` — `UiKey` enum is the single source of truth for all translation keys
  - `en.ts` / `es.ts` — translation dictionaries implementing `UiDict`
  - `utils.ts` — `getLangFromUrl()` and `useTranslations()` helpers
  - All translated strings must use `UiKey` enum values, never raw strings

### Content Collections

Two Astro content collections defined in `src/content.config.ts`:

**`legal`** — Legal documents (privacy policy, terms of service) per app and language. Files live at `src/content/legal/[appName]/[type]/[lang].md`. Required frontmatter: `title`, `app`, `type` (enum), `lang` (enum), `version` (semver string).

**`guides`** — Technical blog posts/guides. Files at `src/content/guides/[slug].[lang].md`. Required frontmatter: `title`, `date`, `updatedDate`. The lang is derived from the filename suffix (e.g. `.en.md`, `.es.md`).

### Layouts

- `Base.astro` — Root HTML shell with fonts, theme script, and SEO slot
- `Website.astro` — Portfolio pages with header/footer
- `Guides.astro` — Guide article layout
- `Legal.astro` — Legal document layout

### Path Aliases

Configured in both `astro.config.mjs` (implicitly via tsconfig) and `vitest.config.ts`:

| Alias | Path |
|-------|------|
| `@components` | `src/components` |
| `@layouts` | `src/layouts` |
| `@styles` | `src/styles` |
| `@images` | `src/images` |
| `@i18n` | `src/i18n` |
| `@constants` | `src/constants` |
| `@utils` | `src/utils` |
| `@pages` | `src/pages` |

### Theme

Dark/light theme is toggled via `data-theme` on `<html>`. The initial value is set by an inline script in `Base.astro` using `localStorage` with a fallback to `prefers-color-scheme`. CSS custom properties drive theming in `GlobalStyles.astro`.

### Adding a New Legal Document

Create `src/content/legal/[appName]/[type]/[lang].md` with required frontmatter. The dynamic routes at `src/pages/[...lang]/legal/[...slug].astro` handle rendering automatically.

### Adding a New Guide

Create `src/content/guides/[slug].[lang].md` (e.g. `my-guide.en.md`) with required frontmatter. Set `draft: true` to exclude from production builds.
