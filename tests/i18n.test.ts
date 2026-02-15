import { describe, it, expect } from "vitest";
import { UiKey } from "@i18n/ui";
import { en } from "@i18n/en";
import { es } from "@i18n/es";

const allKeys = Object.values(UiKey);

describe("i18n translations", () => {
  it("en.ts contains all UiKey values", () => {
    const missing = allKeys.filter((key) => !(key in en));
    expect(missing, `Missing keys in en.ts: ${missing.join(", ")}`).toEqual([]);
  });

  it("es.ts contains all UiKey values", () => {
    const missing = allKeys.filter((key) => !(key in es));
    expect(missing, `Missing keys in es.ts: ${missing.join(", ")}`).toEqual([]);
  });

  it("en.ts has no extra keys beyond UiKey", () => {
    const extra = Object.keys(en).filter(
      (key) => !allKeys.includes(key as UiKey),
    );
    expect(extra, `Extra keys in en.ts: ${extra.join(", ")}`).toEqual([]);
  });

  it("es.ts has no extra keys beyond UiKey", () => {
    const extra = Object.keys(es).filter(
      (key) => !allKeys.includes(key as UiKey),
    );
    expect(extra, `Extra keys in es.ts: ${extra.join(", ")}`).toEqual([]);
  });

  it("en.ts has no empty translation values", () => {
    const empty = allKeys.filter((key) => en[key]?.trim() === "");
    expect(empty, `Empty values in en.ts: ${empty.join(", ")}`).toEqual([]);
  });

  it("es.ts has no empty translation values", () => {
    const empty = allKeys.filter((key) => es[key]?.trim() === "");
    expect(empty, `Empty values in es.ts: ${empty.join(", ")}`).toEqual([]);
  });
});
