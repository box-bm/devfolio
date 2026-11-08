import { describe, expect, it } from "vitest";
import {
  forLang,
  postDateFormat,
  postHref,
  postSlug,
  readingMinutes,
} from "@utils/posts";

const post = (id: string, date: string) => ({
  id,
  data: { date: new Date(date) },
});

describe("posts helpers", () => {
  it("derives the slug from the id", () => {
    expect(postSlug({ id: "my-post.en.md" })).toBe("my-post");
  });

  it("builds hrefs per collection and language", () => {
    expect(postHref("blog", { id: "my-post.es.md" }, "es")).toBe(
      "/es/blog/my-post",
    );
    expect(postHref("guides", { id: "my-post.en.md" }, "en")).toBe(
      "/en/guides/my-post",
    );
  });

  it("computes reading minutes", () => {
    expect(readingMinutes("")).toBe(1);
    expect(readingMinutes(Array(221).fill("word").join(" "))).toBe(2);
  });

  it("filters by language and sorts newest first", () => {
    const a = post("a.en.md", "2026-01-01");
    const b = post("b.en.md", "2026-03-01");
    const c = post("c.es.md", "2026-02-01");
    expect(forLang([a, b, c], "en")).toEqual([b, a]);
    expect(forLang([a, b, c], "es")).toEqual([c]);
  });

  it("formats dates in America/Guatemala", () => {
    expect(postDateFormat("en").format(new Date("2026-02-01T12:00:00Z"))).toBe(
      "February 1, 2026",
    );
  });
});
