# Blog — design

Date: 2026-11-07 · Status: awaiting review

## Goal

Add a personal blog to boxdev.me for opinion essays. The first post is about
how people hand their judgment ("criterio propio") to AI, including for small,
obvious decisions and for code they cannot explain. A guide solves a problem;
a post makes an argument. The blog must not read as a renamed guides section.

## Decisions already made

- Separate `blog` collection with `/blog` routes. Guides and their URLs are
  untouched (they get search traffic).
- No home page section. The only entry point is one link in the footer's
  "Explore" list, next to Guides. Not in the header.
- Shared logic with guides is extracted into one helper; guides become a thin
  wrapper over it.
- Every post ships in EN and ES (project rule: parity always).
- The blog follows `DESIGN.md` (sketchbook: graphite, blue pencil, Schibsted
  Grotesk; Kalam only for pencil notes).

## Non-goals

Comments, likes, RSS, series, tag pages, search, filters, reading-progress
indicator. RSS is the first thing to add later if wanted.

## Content

New collection in `src/content.config.ts`, files at
`src/content/blog/[slug].[lang].md` (same suffix convention as guides).

| Field         | Type    | Notes                                           |
| ------------- | ------- | ----------------------------------------------- |
| `title`       | string  | required                                        |
| `description` | string  | optional; used for meta and the index list      |
| `topic`       | string  | optional single label, e.g. "AI"; no filtering  |
| `date`        | date    | required; the only date shown on the page       |
| `updatedDate` | date    | optional; only feeds `dateModified` in SEO JSON |
| `draft`       | boolean | default `false`; drafts are excluded by helper  |

Differences from guides: no `tags`, `updatedDate` optional.

## Shared logic

New `src/utils/posts.ts`, parameterized by collection name
(`"guides" | "blog"`): `getPosts`, `postSlug`, `postHref`, `postDateFormat`,
`readingMinutes`. Draft filtering and newest-first sorting behave exactly as
`getGuides` does today. `src/utils/guides.ts` keeps its current exports
(`getGuides`, `guideSlug`, `guideHref`, `guideDateFormat`, `readingMinutes`)
as wrappers, so no guide page changes its imports or output.

## Routes and layout

- `src/pages/[...lang]/blog/index.astro` → `/blog`, `/es/blog`. Title, subtitle,
  a ruled list (same `ruled` / `ruled-link` pattern as guides) with date,
  reading time, optional topic, title, description. Empty state when no posts.
  No contact section at the bottom (the personal tone is the point).
- `src/pages/[...lang]/blog/[slug].astro` → `/blog/[slug]`, `/es/blog/[slug]`.
- `src/layouts/Blog.astro` on top of `Document.astro` with breadcrumbs
  (Blog › post title).

### Post page (what is removed and added versus a guide)

Removed: table of contents, created/updated dates block, Buy Me a Coffee,
wrapping "next guide" loop, tags, the description as a visible lede.

Added:

- Byline row: `Brandon Manzo · <date> · N min read`, plus the topic label
  when present.
- Margin notes: markdown posts may use `<aside class="pencil-note">…</aside>`;
  styled once in `MarkdownStyles.astro` (Kalam, blue pencil, left rule). This
  is the single place handwriting appears in long text, and the comment at the
  top of that file is updated to say so.
- Newer / older navigation by date, no wrap-around; renders only when a
  neighbour exists.
- Reply ending: the taped portrait plus "Disagree? Tell me." with one
  `mailto:` button whose subject is `Re: <post title>`.

### New shared component

`src/components/docs/SignOff.astro`: the taped portrait and note block that
currently lives inline (and as CSS) in `guides/[slug].astro`. It takes `id`,
`title`, `description` and a default slot for the buttons. Guides use it with
the existing email + Buy Me a Coffee buttons; the blog uses it with the reply
button. Visual output of the guide page must not change.

## Entry point

One `<a class="nav-link">` in `Footer.astro`, after Guides, label from
`nav.blog`. Nothing in the header, mobile menu, or home page.

## i18n

New `UiKey` entries and strings (EN / ES). **Copy below needs approval.**

| Key                      | EN                                                                                 | ES                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `nav.blog`               | Blog                                                                               | Blog                                                                                     |
| `title.blog`             | Blog - BoxDev                                                                      | Blog - BoxDev                                                                            |
| `blog.title`             | Blog                                                                               | Blog                                                                                     |
| `blog.subtitle`          | Longer thoughts, opinions and things I'm still figuring out.                       | Pensamientos más largos, opiniones y cosas que todavía estoy entendiendo.                |
| `blog.empty`             | Nothing here yet. Check back soon.                                                 | Todavía no hay nada aquí. Vuelve pronto.                                                 |
| `blog.newer`             | Newer                                                                              | Más reciente                                                                             |
| `blog.older`             | Older                                                                              | Anterior                                                                                 |
| `blog.reply.title`       | Disagree? Tell me.                                                                 | ¿No estás de acuerdo? Dímelo.                                                            |
| `blog.reply.description` | I'd rather hear a good argument than a quiet nod. Reply by email and I'll read it. | Prefiero un buen argumento a un asentimiento silencioso. Responde por correo y lo leeré. |
| `blog.reply.cta`         | Reply by email                                                                     | Responder por correo                                                                     |

Existing keys reused: `guides.readingTime`. Strings go through `UiKey` only.

## Search and indexing

Default: posts are public, indexed, and in the sitemap (the `@astrojs/sitemap`
integration picks them up). Open question for the owner: add `noindex` and
exclude the blog from the sitemap so it stays "personal, not a public book"?
Default if unanswered: indexed.

## Tests

- `tests/content.test.ts`: blog frontmatter checks (title, date, draft;
  `updatedDate` optional) and a parity check that every `slug.en.md` has a
  `slug.es.md` and vice versa. No "at least one file" assertion for blog, so
  the empty state is valid.
- `tests/i18n.test.ts`: already enforces key parity; no change.
- `tests/build.test.ts`: `npm run build` must pass with the blog routes and
  the refactored guide page.
- Manual check with a throwaway fixture post: index, post page, newer/older,
  EN and ES, light and dark, mobile width; then delete the fixture. Compare the
  guide page before and after the `SignOff` extraction.

## First post (separate step, after the infrastructure PR)

`ai-and-thinking-for-yourself.{en,es}.md`, `draft: true`. Outline for approval
before any copy is written:

1. The pattern: small decisions handed to a chat ("learn data analysis or
   TypeScript?" when you already love data; "does she love me?"; "should I
   drink water?").
2. What it costs: creativity needs you to sit with a problem and form an opinion.
3. Code: prompt, paste, ship, and no answer to "how does it work?".
4. Not anti-AI: a tool you use versus a replacement for thinking.
5. A self-check for the reader: questions such as "Could I explain this
   without the chat open?" and "Did I have an opinion before I asked?"

English copy is approved first; Spanish is written after (the owner may prefer
to write it).

## Rollout

1. This spec reviewed and approved.
2. Implementation plan reviewed and approved (execution method chosen).
3. Infrastructure PR from `feat/blog`: collection, helper, routes, layout,
   `SignOff`, footer link, i18n, styles, tests. No post included, so the empty
   state ships.
4. First post as its own change once the outline and copy are approved.

## Risks

- Refactoring the guide page (`SignOff`, helper wrapper) could change its
  output; mitigated by the build test and a before/after comparison.
- The EN/ES copy above is new and unreviewed (see the sketchbook-redesign
  note: copy awaits the owner's approval).
