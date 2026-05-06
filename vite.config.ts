import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.cjs",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://learnsync-r4b1.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
