import { describe, it, expect } from "vitest";
import matter from "gray-matter";
import { globSync } from "glob";
import { readFileSync } from "fs";
import { basename, resolve } from "path";

const root = resolve(__dirname, "..");

function readFrontmatter(filePath: string) {
  const content = readFileSync(filePath, "utf-8");
  return matter(content).data;
}

describe("guide content frontmatter", () => {
  const guideFiles = globSync("src/content/guides/**/*.md", { cwd: root });

  it("should find guide files", () => {
    expect(guideFiles.length).toBeGreaterThan(0);
  });

  guideFiles.forEach((file) => {
    describe(file, () => {
      const data = readFrontmatter(resolve(root, file));

      it("has required title field", () => {
        expect(data.title).toBeDefined();
        expect(typeof data.title).toBe("string");
      });

      it("has required date field", () => {
        expect(data.date).toBeDefined();
      });

      it("has required updatedDate field", () => {
        expect(data.updatedDate).toBeDefined();
      });

      it("has required draft field", () => {
        expect(data.draft).toBeDefined();
        expect(typeof data.draft).toBe("boolean");
      });
    });
  });
});

describe("legal content frontmatter", () => {
  const legalFiles = globSync("src/content/legal/**/*.md", { cwd: root });

  it("should find legal files", () => {
    expect(legalFiles.length).toBeGreaterThan(0);
  });

  legalFiles.forEach((file) => {
    describe(file, () => {
      const data = readFrontmatter(resolve(root, file));

      it("has required title field", () => {
        expect(data.title).toBeDefined();
        expect(typeof data.title).toBe("string");
      });

      it("has required app field", () => {
        expect(data.app).toBeDefined();
        expect(typeof data.app).toBe("string");
      });

      it("has required type field with valid value", () => {
        expect(data.type).toBeDefined();
        expect(["privacy-policy", "terms-of-service"]).toContain(data.type);
      });

      it("has required lang field with valid value", () => {
        expect(data.lang).toBeDefined();
        expect(["en", "es"]).toContain(data.lang);
      });

      it("has required version field in semver format", () => {
        expect(data.version).toBeDefined();
        expect(data.version).toMatch(/^\d+\.\d+\.\d+$/);
      });
    });
  });
});

describe("blog content", () => {
  const blogFiles = globSync("src/content/blog/**/*.md", { cwd: root });
  const names = blogFiles.map((file) => basename(file));

  it("uses slug.lang.md file names without dots in the slug", () => {
    const invalid = names.filter((n) => !/^[a-z0-9-]+\.(en|es)\.md$/.test(n));
    expect(invalid, `invalid file names: ${invalid.join(", ")}`).toEqual([]);
  });

  it("has an en/es counterpart for every post", () => {
    const missing = names
      .map((n) =>
        n.endsWith(".en.md")
          ? n.replace(/\.en\.md$/, ".es.md")
          : n.replace(/\.es\.md$/, ".en.md"),
      )
      .filter((other) => !names.includes(other));
    expect(missing, `missing files: ${missing.join(", ")}`).toEqual([]);
  });

  blogFiles.forEach((file) => {
    describe(file, () => {
      const data = readFrontmatter(resolve(root, file));

      it("has required title field", () => {
        expect(typeof data.title).toBe("string");
      });

      it("has required date field", () => {
        expect(data.date).toBeDefined();
      });

      it("has required draft field", () => {
        expect(typeof data.draft).toBe("boolean");
      });

      it("has no tags field", () => {
        expect(data).not.toHaveProperty("tags");
      });

      it("has correctly typed optional fields", () => {
        if ("topic" in data) expect(typeof data.topic).toBe("string");
        if ("description" in data)
          expect(typeof data.description).toBe("string");
        if ("updatedDate" in data)
          expect(data.updatedDate).toBeInstanceOf(Date);
      });
    });
  });
});
