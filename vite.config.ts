import type { UserConfig } from "vite";

export default {
  root: "src",
  publicDir: "../static",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
} satisfies UserConfig;
