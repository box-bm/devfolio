import type { Lang } from "@i18n/langs";
import type { CollectionEntry } from "astro:content";
import { getPosts } from "./getPosts";
import { postDateFormat, postHref, postSlug, readingMinutes } from "./posts";

type Guide = CollectionEntry<"guides">;

/** Published guides for one language, newest first. */
export const getGuides = (lang: Lang): Promise<Guide[]> =>
  getPosts("guides", lang);

export const guideSlug = (guide: Guide) => postSlug(guide);

export const guideHref = (guide: Guide, lang: Lang) =>
  postHref("guides", guide, lang);

export const guideDateFormat = postDateFormat;

export { readingMinutes };
