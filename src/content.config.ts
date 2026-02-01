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
    date: z.date(),
    updatedDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  legal,
  guides,
};
