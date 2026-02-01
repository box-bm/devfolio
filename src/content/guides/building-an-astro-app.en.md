---
title: "How this guide is built with Astro"
description: "Technical guide documenting how this site is built using Astro, including routing, content collections, and internationalization."
tags: ["astro", "frontend", "architecture", "guides"]
date: 2026-02-01T00:00:00-6:00
updatedDate: 2026-02-01T00:00:00-6:00
draft: false
---

# Building a site with Astro

This guide explains **how to build a website with Astro** using a real, functional project as a reference.  
The focus is practical: structure, routing, content, internationalization, and static generation.

Base project repository:  
https://github.com/box-bm/devfolio

## Table of contents

- [Introduction](#introduction)
- [Why Astro?](#why-astro)
- [Project structure](#project-structure)
- [File-based routing](#file-based-routing)
- [Language-prefixed internationalization](#language-prefixed-internationalization)
- [Content management with Content Collections](#content-management-with-content-collections)
- [Guides: index and individual pages](#guides-index-and-individual-pages)
- [Static generation and getStaticPaths](#static-generation-and-getstaticpaths)
- [SEO and performance](#seo-and-performance)
- [Conclusion](#conclusion)
- [References](#references)

## Introduction

Astro is especially well suited for **content-oriented sites** such as portfolios, documentation, blogs, and technical guides.  
This project demonstrates how to use Astro beyond a simple static site, applying an architecture designed to scale.

This guide assumes basic knowledge of HTML, CSS, and JavaScript.

## Why Astro?

Astro was chosen for the following reasons:

- Static rendering by default
- Minimal JavaScript sent to the client
- File-based routing
- Native Markdown integration
- Typed Content Collections
- Excellent performance and SEO

Astro allows treating the site as **content-first**, not as a heavy application.

## Project structure

The structure clearly separates responsibilities:

```
src/
  pages/
  layouts/
  components/
  i18n/
content/
  guides/
  projects/
  legal/
```

Main responsibilities:

- `pages`: defines site routes
- `layouts`: shared structure (header, footer, SEO)
- `components`: reusable UI
- `i18n`: translatable text
- `content`: Markdown-based content

This separation allows changing UI or content without unnecessary coupling.

## File-based routing

Astro generates routes from files inside `src/pages`.

This project uses dynamic routes with a language prefix:

```
src/pages/[...lang]/
```

This allows generating URLs such as:

```
/en
/es
/es/guides
/es/guides/building-a-site-with-astro
```

The language is read directly from:

```
Astro.params.lang
```

No query parameters or duplicated language folders are used.

Related documentation:  
https://docs.astro.build/en/core-concepts/routing/

## Language-prefixed internationalization

Internationalization follows these principles:

- All languages use a prefix (`/en`, `/es`)
- The default language is also prefixed
- The root `/` redirects to the default language
- The language is determined from the URL

This approach keeps URLs consistent and simplifies SEO.

Official documentation:  
https://docs.astro.build/en/guides/internationalization/

## Content management with Content Collections

Astro Content Collections are used to manage structured content.

Content types:

- Guides
- Projects
- Legal

Example structure:

```
content/
  guides/
    building-a-site-with-astro.es.md
    building-a-site-with-astro.en.md
```

Naming convention:

```
slug.lang.md
```

The language is derived from the file `id`, not from the URL slug, avoiding fragile inferences.

Documentation:  
https://docs.astro.build/en/guides/content-collections/

## Guides: index and individual pages

Guides have two types of pages:

### Guides index

Route:

```
src/pages/[...lang]/guides/index.astro
```

Responsibilities:

- Load all guides
- Filter by language
- Exclude drafts
- Sort by date
- Expose metadata (title, description, tags)

### Individual guide

Route:

```
src/pages/[...lang]/guides/[slug].astro
```

Flow:

1. Read `lang` and `slug` from the URL
2. Resolve the correct file from the collection
3. Render the Markdown content

This allows prerendering all guides at build time.

## Static generation and getStaticPaths

The site uses **Static Site Generation (SSG)**.

Because routes are dynamic (`[...lang]`, `[slug]`), the following are explicitly defined:

- Supported languages
- Available slugs

This is done using `getStaticPaths`.

Benefits:

- Deterministic builds
- Better SEO
- Less runtime complexity

Documentation:  
https://docs.astro.build/en/reference/api-reference/#getstaticpaths

## SEO and performance

From the architecture level, the site prioritizes:

- Static HTML
- Indexable content (real text)
- Semantic URLs
- Minimal client-side JavaScript

Astro allows sending almost pure HTML to the browser, improving metrics like LCP and CLS without complex optimizations.

## Conclusion

This project shows how to use Astro as a **framework for building content-based sites**.

The combination of:

- Dynamic routing
- Content Collections
- Static generation
- Explicit internationalization

makes it possible to build a clear, fast, and maintainable site as content grows.

## References

- Project repository:  
  https://github.com/box-bm/devfolio

- Astro official documentation:  
  https://docs.astro.build/

- Routing in Astro:  
  https://docs.astro.build/en/core-concepts/routing/

- Content Collections:  
  https://docs.astro.build/en/guides/content-collections/

- Internationalization:  
  https://docs.astro.build/en/guides/internationalization/
