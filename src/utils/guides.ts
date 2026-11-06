import type { Lang } from "@i18n/langs";
import { getCollection, type CollectionEntry } from "astro:content";

type Guide = CollectionEntry<"guides">;

/** Published guides for one language, newest first. */
export const getGuides = async (lang: Lang) =>
  (
    await getCollection(
      "guides",
      (guide) => !guide.data.draft && guide.id.endsWith(`.${lang}.md`),
    )
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

/** Guide ids look like `my-guide.en.md`; the slug is the part before the lang suffix. */
export const guideSlug = (guide: Guide) => guide.id.split(".")[0];

export const guideHref = (guide: Guide, lang: Lang) =>
  `/${lang}/guides/${guideSlug(guide)}`;

export const guideDateFormat = (lang: Lang) =>
  new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Guatemala",
  });

const WORDS_PER_MINUTE = 220;

export const readingMinutes = (body = "") =>
  Math.max(
    1,
    Math.ceil(body.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE),
  );
