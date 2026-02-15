import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import { resolve } from "path";

describe("build", () => {
  it("npm run build completes without errors", () => {
    const result = execSync("npm run build", {
      cwd: resolve(__dirname, ".."),
      encoding: "utf-8",
      stdio: "pipe",
    });
    expect(result).toBeDefined();
  });
});
