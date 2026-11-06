import type { Lang } from "@i18n/langs";
import type { CollectionEntry } from "astro:content";

/** Legal ids look like `app/type/lang`; the route slug drops the lang segment. */
export const legalSlug = (doc: CollectionEntry<"legal">) =>
  doc.id.replace(/\/[^/]+$/, "");

/** Effective dates are calendar dates; format them without a time-zone shift. */
export const legalDateFormat = (lang: Lang) =>
  new Intl.DateTimeFormat(lang, { dateStyle: "long", timeZone: "UTC" });
