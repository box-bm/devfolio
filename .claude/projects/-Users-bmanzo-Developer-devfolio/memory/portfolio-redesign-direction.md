---
name: portfolio-redesign-direction
description: Visual/architecture direction for the boxdev.me portfolio redesign
metadata:
  type: project
---

In 2026-06 the boxdev.me site was fully redesigned (from the old centered-column layout) into a glass landing page with **maximal "all-in" motion** (fluent design, 3D). Brandon explicitly chose this direction and wants his **frontend + mobile** skills foregrounded, with backend, QA, automation, and especially **testing** (his favorite) also represented.

The visual language has since moved on (2026-09, PRs #9-#11) from the original monochrome/electric-blue take to **blueprint hairlines + acrylic (glass) panels + a sand/olive accent** (`--olive`/`--olive-ink` is now `--accent`, with a corinto/red secondary), plus restrained corner-mark (viewfinder bracket) accents on cards and panels — `.corner-marks` global helper in `GlobalStyles.astro`, or a local `.corner-mark`/`.corner-mark--tl|tr|bl|br` set (see `ContactSection.astro`) when a component needs its own glow layer alongside the brackets. A 2026-09-12 pass (#11) briefly stripped the fixed dot-grid field, portrait frame borders, container hairlines, and section NN/total counters for a cleaner look — the dot-grid field was restored the next day per Brandon's request (`--dot` token + `.dot-field` in `MeshBackground.astro`), so don't remove it again without checking with him first.

Key architecture (keep this structure):

- Design tokens live in `src/styles/GlobalStyles.astro`: glass surfaces (`--glass-*`), single `--accent` (sand/olive), ambient `--dot` dot-grid token, motion easings (`--ease-spring`), `[data-reveal]` scroll-reveal utilities. **Legacy var names (`--accent-primary`, `--neutral-*`, `--text-*`) are intentionally kept/aliased** so legal + markdown pages still work — don't remove them.
- `src/components/visuals/MeshBackground.astro` is the single fixed backdrop (mounted once in `Base.astro`): warm radial glows + the `.dot-field` dot-grid, masked to fade out toward the edges.
- `src/components/visuals/Motion.astro` is a single global motion engine (scroll reveal, 3D tilt `[data-tilt]`, magnetic `[data-magnetic]`, parallax, header `.scrolled`, active-nav). It re-inits on `astro:page-load` (View Transitions via `ClientRouter` in Base) and honors `prefers-reduced-motion`. Other component scripts (Header, ThemeToggle, Dropdown, ProjectCard) also bind on `astro:page-load`.
- Landing sections are in `src/components/sections/` (Hero, TechMarquee, About, Services, Skills, HowIWork, Projects, Contact); composed in `src/pages/[...lang]/index.astro`.
- `src/components/Button.astro` (`Default`/`Outlined`/`Text`/`Icon` variants) and `src/components/ContactLinks.astro` (icon-button row: GitHub/LinkedIn/mail) are the shared building blocks reused across Hero, Contact, Footer, and the guide-page "get in touch" block — reach for these instead of ad hoc markup when adding another contact/CTA surface.
- Fonts: Geist (display/body) + JetBrains Mono (eyebrows/labels/mono chips) — not Space Grotesk/Work Sans as in the original June direction.

i18n is still the flat `UiKey` enum + `en.ts`/`es.ts` dicts — every new string needs all three in sync (a test enforces parity).

Buy Me a Coffee link lives at the `buyMeACoffee` constant in `src/constants/buymeacoffee.ts` (exported via `src/constants/index.ts`); it's surfaced as a styled pill in `Footer.astro` and as an `Outlined` `Button` in the guides `[slug].astro` "get in touch" panel — both were redesigned 2026-09-13 because the floating BuyMeACoffee.astro widget script (used on guide/legal pages) alone wasn't discoverable enough.
