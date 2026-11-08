import type { Lang } from "@i18n/langs";

export type PostCollection = "guides" | "blog";
export type PostLike = { id: string; data: { date: Date } };

/** Post ids look like `my-post.en.md`; the slug is the part before the lang suffix. */
export const postSlug = (post: { id: string }) => post.id.split(".")[0];

export const postHref = (
  collection: PostCollection,
  post: { id: string },
  lang: Lang,
) => `/${lang}/${collection}/${postSlug(post)}`;

export const postDateFormat = (lang: Lang) =>
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

/** Posts for one language, newest first. */
export const forLang = <T extends PostLike>(posts: T[], lang: Lang): T[] =>
  posts
    .filter((post) => post.id.endsWith(`.${lang}.md`))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
