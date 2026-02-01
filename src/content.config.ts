import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    app: z.string(),
    type: z.enum(["privacy-policy", "terms-of-service"]),
    lang: z.enum(["en", "es"]),
    version: z.string().regex(/^\d+\.\d+\.\d+$/, "Use semver, e.g. 1.0.0"),
    effectiveDate: z.date().optional(),
  }),
});

const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    slug: z.string().optional(),
    topic: z.string().optional(),
    guide: z.string().optional(),
    language: z.enum(["en", "es"]).default("en"),
    draft: z.boolean().default(false),
    date: z.date(),
  }),
});

export const collections = {
  legal,
  guides,
};
