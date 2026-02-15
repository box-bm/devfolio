import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "node",
    testTimeout: 15000,
  },
  resolve: {
    alias: {
      "@pages": resolve(__dirname, "./src/pages"),
      "@components": resolve(__dirname, "./src/components"),
      "@layouts": resolve(__dirname, "./src/layouts"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@images": resolve(__dirname, "./src/images"),
      "@i18n": resolve(__dirname, "./src/i18n"),
      "@constants": resolve(__dirname, "./src/constants"),
      "@utils": resolve(__dirname, "./src/utils"),
    },
  },
});
