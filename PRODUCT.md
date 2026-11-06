# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People evaluating Brandon Manzo as a skilled software developer to hire or work with. They arrive wanting to know what he builds, how well he builds it, and how to reach him. The copy offers his work as services ("Let's build something great"), but the site is a portfolio, not an agency storefront. No split between employers and clients has been confirmed, so serve both without leaning to either.

Secondary audience: developers who find a guide (usually through search) because they need to solve a specific setup or tooling problem.

## Product Purpose

boxdev.me is Brandon's personal portfolio and developer site. It has three jobs:

1. **Portfolio:** present Brandon as a frontend and mobile engineer who also works across backend, QA, automation, and testing (his favorite craft).
2. **Guides:** publish technical walkthroughs that are useful by themselves and show how he thinks.
3. **Legal hosting:** serve the privacy policies (and future terms) for the apps he publishes.

A visit is a success when the visitor does any of these:
- opens his GitHub or shipped apps to look at the real work;
- contacts him by email or LinkedIn;
- reads a guide and uses it;
- supports him through Buy Me a Coffee after a guide helped.

## Positioning

A frontend- and mobile-first developer who treats testing as a craft, not an afterthought. The site has to show that combination of interface polish and engineering reliability in how it is built, not just say it.

## Operating Context

- Built with Astro 5 and deployed at `https://boxdev.me`. Content collections hold `guides` and `legal`.
- Bilingual: English at `/`, Spanish at `/es/`, with translation keys in the `UiKey` enum and a test that enforces parity between the two languages.
- Visitors come from his GitHub and LinkedIn profiles, from search results for guides, and from app store listings that link to the privacy policies.

## Capabilities and Constraints

- **Legal pages are required.** `src/content/legal/[app]/[type]/[lang].md` holds the documents for Minimal Tic Tac Toe and Box Wallet. App store listings depend on these pages, so their URLs and availability must survive any redesign.
- **EN + ES parity always.** Every new surface and string ships in both languages.
- Guides support `draft: true`, which keeps a guide out of production builds.
- Contact channels: email, GitHub, LinkedIn, and Buy Me a Coffee (constants in `src/constants/`).

## Brand Commitments

- The name **BoxDev** and the `Logo` component are a fixed identity.
- Voice in the current copy: first person, warm, confident, a little playful ("so future-me (and you) don't have to figure it out twice").

## Evidence on Hand

- Shipped work: **Minimal Tic Tac Toe** (Flutter, Google Play), **DPI Validator** and **NIT Validator** (Dart packages on pub.dev, fully tested), and source on GitHub.
- Guides: building an Astro app, GNS3 on Apple Silicon, and terminal environment setup, each in EN and ES with screenshots in `src/content/guides/images/`.
- Portrait: `src/images/me.jpeg`.
- **Placeholder stats, not evidence:** "7+ shipped projects", "20+ languages/frameworks/tools", and "100% commitment to testing" are not backed by anything. Future work must not reuse or amplify them as claims.
- No testimonials, client logos, case studies, or press exist. Do not fabricate them.

## Product Principles

1. **Show the work, don't describe it.** Real shipped apps, packages, and code outrank adjectives.
2. **Craft and reliability together.** Polish and tested correctness are the same pitch, so neither should crowd out the other.
3. **Guides earn trust by being useful first.** Reading comes before any self-promotion on a guide page.
4. **Every path ends somewhere real.** Each surface makes GitHub, contact, or support easy to reach without nagging.
5. **Bilingual by default.** Spanish is a first-class experience, not a translation afterthought.
