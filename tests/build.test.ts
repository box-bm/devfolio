import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import { resolve } from "path";

describe("build", () => {
  // A full `astro build` runs image optimization over every asset, which takes
  // well past the 15s global testTimeout on a cold cache.
  it("npm run build completes without errors", () => {
    const result = execSync("npm run build", {
      cwd: resolve(__dirname, ".."),
      encoding: "utf-8",
      stdio: "pipe",
    });
    expect(result).toBeDefined();
  }, 180000);
});
