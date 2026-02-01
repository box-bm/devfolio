import type { Lang } from "@i18n/ui";
import { getCollection } from "astro:content";

export const getGuides = async (lang: Lang) => {
  return await getCollection("guides", ({ data: { language } }) => language === lang);
};