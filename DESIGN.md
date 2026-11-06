---
name: BoxDev
description: Brandon Manzo's sketchbook. Toned grey paper, graphite type, one animator's blue pencil.
colors:
  blue-pencil: "#1a44a0"
  graphite: "#222326"
  graphite-soft: "#46474c"
  graphite-hover: "#36373b"
  toned-paper: "#d6d4ce"
  paper-shade: "#cbc9c2"
  paper-panel: "#dfddd7"
  taped-sheet: "#e4e2dc"
  rule-line: "#a9a7a0"
  rule-line-strong: "#7d7b75"
  night-paper: "#1b1b1d"
  night-panel: "#242427"
  night-rule: "#4a4a4f"
  chalk: "#e8e6e1"
  chalk-soft: "#b3b1ab"
  night-pencil: "#92b1ff"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 9.4vw, 8.25rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 3.4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title-sm:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 1.7vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  hand:
    fontFamily: "Kalam, Comic Neue, cursive"
    fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.1
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.9rem"
    fontWeight: 400
rounded:
  sm: "2px"
  md: "3px"
  lg: "4px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  gutter: "clamp(20px, 5vw, 40px)"
  section: "clamp(72px, 11vw, 136px)"
components:
  button-primary:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.taped-sheet}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.graphite-hover}"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
    height: "44px"
  button-outlined-hover:
    textColor: "{colors.blue-pencil}"
  switch:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-soft}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
    height: "44px"
  pencil-link:
    textColor: "{colors.blue-pencil}"
    typography: "{typography.label}"
  taped-sheet:
    backgroundColor: "{colors.taped-sheet}"
    padding: "clamp(20px, 3vw, 36px)"
  paper-panel:
    backgroundColor: "{colors.paper-panel}"
    padding: "clamp(24px, 3vw, 36px)"
  pencil-note:
    textColor: "{colors.blue-pencil}"
    typography: "{typography.hand}"
---

# Design System: BoxDev

## Overview

**Creative North Star: "The Sketchbook"**

Brandon draws when he isn't coding, so the site is his sketchbook. The page is toned grey sketch paper with a fine grain, a spiral binding runs down the left edge, and everything set in type is graphite. Work arrives as taped-in sheets carrying line drawings, and an animator's blue pencil annotates them: short handwritten notes with arrows that draw themselves as each spread comes into view. A person first, the work annotated in pencil.

The world is quiet and tactile rather than technical. Density is generous: big graphite headlines, long measures of plain prose, wide gutters, and sections separated by a perforated tear line instead of boxes. Colour is almost absent; the single blue pencil does every job colour has to do (notes, links, focus, hover), and its scarcity is what makes it read as a hand on the page.

Confirmed rejection: the dark-glass developer portfolio, with its icon-card services grid, stat bars, logo marquee, and kicker labels over headings.

**Key Characteristics:**
- Toned grey paper ground with fixed SVG grain; dark theme is black sketchbook paper with white and light-blue pencil.
- Spiral binding along the left edge on every viewport (slimmer below 1180px).
- Taped-in sheets: lighter paper, slight rotation, two strips of translucent tape, a paper-lift shadow.
- One grotesk (Schibsted Grotesk) for everything set; Kalam only for blue-pencil notes.
- Blue pencil is the only colour.
- Perforated page breaks between sections; ruled lines for lists.
- Motion is pencil strokes drawing in and content settling once; nothing loops.

## Colors

Graphite on grey paper, with one blue pencil.

### Primary
- **Animator's Blue Pencil** (blue-pencil): the only chromatic colour. Handwritten notes and their arrows, the bracket drawn beside a key sentence, every text link (underlined, 1.5px, thickening to 3px on hover), the large contact email, hover state for outlined controls, the focus ring, and the last stroke of each line drawing. A 14% tint (`rgba(26, 68, 160, 0.14)`) is used for text selection and text-button hover only. Dark theme swaps to **Night Pencil** (night-pencil).

### Neutral
- **Graphite** (graphite): headings, primary text, and the solid fill of primary buttons. Also the stroke colour of drawings on taped sheets.
- **Soft Graphite** (graphite-soft): secondary prose, captions, dates, inactive nav links and switches.
- **Graphite Hover** (graphite-hover): primary button hover fill.
- **Toned Paper** (toned-paper): the page ground and the scrolled header background.
- **Paper Shade** (paper-shade): the punched holes of the spiral binding.
- **Paper Panel** (paper-panel): flat in-page panels such as the toolbox.
- **Taped Sheet** (taped-sheet): lighter sheets taped onto the page (portrait study, project drawings); also the text colour on graphite buttons.
- **Rule Line** (rule-line): hairline borders on panels, header bottom edge when scrolled, fact dividers.
- **Strong Rule** (rule-line-strong): ruled notebook lines in lists, switch borders, perforation dots, binding wire.
- **Night Paper / Night Panel / Night Rule / Chalk / Soft Chalk** (night-paper, night-panel, night-rule, chalk, chalk-soft): the dark-theme counterparts of paper, panel, rule, graphite and soft graphite.

Legacy aliases (`--glass-*`, `--accent-primary`, `--accent-dark`, `--accent-darkest`, `--neutral-*`, `--olive-ink`, `--corinto-ink`, `--dot`, `--glow-2`) remain in GlobalStyles only so guides, legal and markdown pages keep rendering. They map onto the tokens above and are not part of the system; new work never references them.

### Named Rules
**The One Pencil Rule.** Blue pencil is the only colour on the page. It marks, annotates, links and focuses; it never fills a surface larger than a selection highlight. If a second hue seems necessary, use weight or graphite tone instead.

**The Daylight Sheet Rule.** Taped-in sheets stay toned grey in the dark theme (the sheet token resolves to toned paper), so drawings and notes on a sheet keep daylight ink: graphite strokes and the light-theme blue pencil, set as literal values, not theme variables.

## Typography

**Display Font:** Schibsted Grotesk (with Helvetica Neue, Arial)
**Body Font:** Schibsted Grotesk (with Helvetica Neue, Arial)
**Hand Font:** Kalam (with Comic Neue, cursive)
**Mono Font:** JetBrains Mono, code blocks in guides only

**Character:** One sturdy grotesk sets everything, carrying hierarchy through weight (800 for display, 700 for headings, 600 for links and labels) and tight negative tracking at large sizes. Kalam is the hand that writes on the page, never the voice that sets it.

### Hierarchy
- **Display** (800, clamp 3.5–8.25rem, 0.88, -0.045em): the name in the hero; the contact headline uses the same voice at clamp 3–6rem, 0.92.
- **Headline** (700, clamp 1.875–2.75rem, 1.04, -0.025em): section headings.
- **Title** (800, clamp 1.75–2.5rem, -0.03em): project entry names.
- **Title Small** (700, clamp 1.35–1.75rem, 1.2, -0.02em): guide titles in ruled lists.
- **Lede** (400, clamp 1.15–1.4rem, 1.5): hero and section introductions, in full graphite, max 34–48ch.
- **Body** (400, 1.125rem, 1.65): prose, max 52–60ch, `text-wrap: pretty`. Base document size is 16px at 1.6.
- **Label** (400–600, 0.875rem): fact terms, dates, footer meta. Sentence case, no tracking, no uppercase.
- **Hand** (400, clamp 1.15–1.4rem, 1.1): blue-pencil notes only, rotated -3deg.

### Named Rules
**The Hand Is for Notes Rule.** Kalam appears only in short blue-pencil notes of a few words, always in pencil colour, always slightly rotated, usually with a drawn arrow. Never in headings, buttons, navigation or body copy.

**The No Mono Costume Rule.** Monospace is for code. Labels, dates, nav and metadata are set in the grotesk. The Logo wordmark (mono letters with bracket marks) is a fixed brand commitment and the sole exception.

## Layout

A centred container of 1180px max with gutters of clamp(20px, 5vw, 40px). Sections carry generous vertical padding (clamp(72px, 11vw, 136px)) and sit on two-column asymmetric grids: the hero splits 0.84fr portrait / 1fr words, project entries 0.8fr sketch / 1fr text and alternate sides, the guides section pairs a sticky 0.7fr heading column with a 1.3fr ruled list, and About splits evenly. Column gaps scale with clamp (roughly 32–112px).

Between sections, a perforated tear line (dots 1.6px every 12px in strong rule) runs across the page, inset from the edges. The spiral binding is always present at the left edge: 34px wide with 26px pitch at 1180px and up, 16px with 18px pitch below, and content near the left margin moves inward to clear it.

Responsive: grids collapse to one column at 860px (760px for project entries); the nav links fold into a menu button at 720px; the theme switch drops its visible label at 520px; tool rows stack at 480px. Interactive targets hold 44px minimum height; inline links hold 32px.

### Named Rules
**The Page Break Rule.** Sections are separated by perforation, never by cards, background bands or full-width borders.

## Elevation & Depth

Depth is paper on paper. The ground is flat; a few sheets lift off it with soft, graphite-tinted shadows that read as a sheet resting on a page, and nothing glows. Translucent tape strips carry a 1px contact shadow. Grain overlays the whole page at 0.35 opacity (multiply) in light, 0.18 (screen) in dark.

### Shadow Vocabulary
- **Rest** (`0 1px 1px rgba(34, 35, 38, 0.08)`): flat panels sitting on the paper (toolbox).
- **Lift** (`0 2px 3px rgba(34, 35, 38, 0.1), 0 10px 22px -12px rgba(34, 35, 38, 0.3)`): taped project sheets, primary button hover, mobile menu.
- **Raised** (`0 3px 4px rgba(34, 35, 38, 0.1), 0 22px 40px -18px rgba(34, 35, 38, 0.38)`): the hero portrait study.

Dark theme deepens the same three to black at higher alpha.

### Named Rules
**The Paper Lifts Rule.** Shadows describe paper resting on paper: short contact shadow plus a soft negative-spread fall. No coloured shadows, no glow, no blur panels, no hard offset blocks.

## Shapes

Paper has square corners. Radii are 2–4px (switches and footer box 2px, buttons 3px), and the large sheets have no rounding at all. Instead of curves, the world uses rotation: sheets tilt between 1.2 and 1.6 degrees (alternating direction), notes tilt -3 degrees, tape strips sit at odd angles. Hand-drawn SVG strokes (round caps and joins, 2.2–3px) supply the organic line. Hatched graphite fills (45-degree lines, 1px every 6px, masked heavier toward the edges) shade the portrait study.

### Named Rules
**The Square Paper Rule.** Nothing is pill-shaped or softly rounded; anything over 4px radius is foreign to the world. Tilt a sheet before you round it.

## Components

### Buttons
Solid graphite or a drawn pencil outline; confident, plain, square.
- **Shape:** gently squared corners (3px), 44px minimum height, 12px 22px padding, 600 weight at 1rem.
- **Primary:** graphite fill, taped-sheet text, 2px graphite border. Hover lightens to graphite hover and adds the Lift shadow.
- **Outlined:** transparent with a 2px graphite border; hover turns border and text blue pencil.
- **Active:** presses down 1px.
- **Focus:** global 2px blue-pencil outline, 3px offset.

### Switches (language, theme)
- **Style:** labelled controls, 1px strong-rule border, 2px corners, 44px tall, 14px 600 soft-graphite text with a small line icon. Hover darkens text to graphite and turns the border blue pencil. The label stays visible except on the narrowest screens.

### Links
- **In-content:** blue pencil, 600 weight, underlined 1.5px at 4px offset, thickening to 3px on hover; external links carry a small up-right arrow icon.
- **Contact email:** display-scale link (clamp 1.5–3.25rem, 700), 3px underline at 8px offset, 5px on hover.

### Taped Sheets
- **Corner Style:** square.
- **Background:** taped sheet, with daylight-ink drawings.
- **Shadow Strategy:** Lift for project sheets, Raised for the portrait.
- **Border:** none; two strips of translucent tape (about 104–116 by 28–30px, dashed tape-edge ends) hold it on.
- **Internal Padding:** clamp(20px, 3vw, 36px); portrait clamp(14px, 2vw, 22px).

### Panels
- **Style:** paper panel background, 1px rule-line border, Rest shadow, square corners, clamp(24px, 3vw, 36px) padding. Inner rows divided by rule-line hairlines.

### Ruled Lists
- Notebook lines in strong rule above and below each row; rows carry a date (label), a Title Small heading and a soft-graphite description. Hover indents the row 12px and turns the title blue pencil.

### Navigation
- Fixed header, transparent on the paper at the top; once scrolled it takes the toned-paper ground and a rule-line bottom edge. Links are 15px 600 soft graphite; hover and active turn graphite with a 2px blue-pencil underline at 6px offset. Below 720px the links move into a dropdown on paper with the Lift shadow, opened by a 44px outlined menu button.

### Pencil Note (signature)
A few words in Kalam, blue pencil, rotated -3deg, with a hand-drawn arrow (a loose curve plus a two-stroke head, 2.4px round strokes, 72px wide) pointing at what it annotates. Arrows and line drawings draw themselves on first view: each path's dash offset runs to zero over 900ms on the standard ease-out, staggered 220ms per stroke after a 250ms delay. Under reduced motion they are simply present.

### Reveal
Content blocks settle once: from 14px below and transparent, over 700ms ease-out, when 12% visible. Content is visible without JavaScript and under reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep blue pencil as the only colour, used for notes, links, hover and focus.
- **Do** put work on taped-in sheets (lighter paper, 1.2–1.6deg tilt, tape strips, Lift shadow) with line drawings in graphite and one blue-pencil stroke.
- **Do** annotate with short Kalam notes and drawn arrows that draw themselves in once.
- **Do** separate sections with the perforated page break and list items with ruled lines.
- **Do** carry hierarchy with grotesk weight (800 / 700 / 600) and tight negative tracking at large sizes.
- **Do** keep daylight ink (graphite, light-theme blue pencil) on sheets in the dark theme.
- **Do** hold interactive targets at 44px and keep switches labelled.

### Don't:
- **Don't** build the dark-glass developer portfolio: no glass or blur panels, no glow.
- **Don't** use icon-card service grids, stat bars, logo marquees, or kicker labels above headings.
- **Don't** set Kalam anywhere but short pencil notes.
- **Don't** use monospace for labels, dates or navigation; mono is for code and the Logo only.
- **Don't** round anything past 4px or make pills.
- **Don't** introduce a second accent hue or coloured shadows.
- **Don't** reference legacy aliases (`--glass-*`, `--accent-primary`, `--neutral-*`, `--olive-ink`, `--corinto-ink`) in new work.
