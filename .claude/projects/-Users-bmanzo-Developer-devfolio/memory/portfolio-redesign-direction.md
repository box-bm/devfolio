---
name: portfolio-redesign-direction
description: Visual/architecture direction for the boxdev.me portfolio redesign
metadata:
  type: project
---

In 2026-06 the boxdev.me site was fully redesigned (from the old centered-column layout) into a **monochrome glass + single electric-blue accent** landing page with **maximal "all-in" motion** (fluent design, 3D). Brandon explicitly chose this direction and wants his **frontend + mobile** skills foregrounded, with backend, QA, automation, and especially **testing** (his favorite) also represented.

Key architecture added (keep this structure):
- Design tokens live in `src/styles/GlobalStyles.astro`: glass surfaces (`--glass-*`), single `--accent`, motion easings (`--ease-spring`), `[data-reveal]` scroll-reveal utilities. **Legacy var names (`--accent-primary`, `--neutral-*`, `--text-*`) are intentionally kept/aliased** so legal + markdown pages still work — don't remove them.
- `src/components/visuals/Motion.astro` is a single global motion engine (scroll reveal, 3D tilt `[data-tilt]`, magnetic `[data-magnetic]`, parallax, header `.scrolled`, active-nav). It re-inits on `astro:page-load` (View Transitions via `ClientRouter` in Base) and honors `prefers-reduced-motion`. Other component scripts (Header, ThemeToggle, Dropdown, ProjectCard) also bind on `astro:page-load`.
- Landing sections are in `src/components/sections/` (Hero, TechMarquee, About, Services, Skills, HowIWork, Projects, Contact); composed in `src/pages/[...lang]/index.astro`.
- Fonts: Space Grotesk (display) + Work Sans (body) + JetBrains Mono (eyebrows/labels).

i18n is still the flat `UiKey` enum + `en.ts`/`es.ts` dicts — every new string needs all three in sync (a test enforces parity).
