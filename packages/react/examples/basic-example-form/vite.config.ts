import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ["@babel/preset-typescript"],
        plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
      },
    }),
  ],
  optimizeDeps: {
    include: ["@tsvdec/core", "@tsvdec/react"],
  },
  resolve: {
    alias: {
      "@tsvdec/core/validators": path.resolve(__dirname, "libs/@tsvdec/core/dist/validators"),
    },
  },
});
