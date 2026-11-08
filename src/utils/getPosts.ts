import type { Lang } from "@i18n/langs";
import { getCollection } from "astro:content";
import { forLang, type PostCollection } from "./posts";

/** Published (non-draft) entries of a post collection for one language, newest first. */
export const getPosts = async <C extends PostCollection>(
  collection: C,
  lang: Lang,
) => forLang(await getCollection(collection, (p) => !p.data.draft), lang);
