// vite.config.ts
import { defineConfig } from "vitest/config"

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "QueryParser",
      fileName: "query-parser",
    },
    rollupOptions: {
      external: [], // ex: ["zod"] dacă folosești
    },
  },

  test: {
    globals: true,
    environment: "node",
  },
})