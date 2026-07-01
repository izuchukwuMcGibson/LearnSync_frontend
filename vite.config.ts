import { defineConfig, loadEnv } from "vite";
declare const process: any;
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const glotProxyHeaders = env.VITE_GLOT_TOKEN
    ? { Authorization: `Token ${env.VITE_GLOT_TOKEN}` }
    : undefined;

  return {
    plugins: [react()],
    css: {
      postcss: "./postcss.config.cjs",
    },
    server: {
      proxy: {
        "/api": {
          target: "https://learnsync.pxxl.run",
          changeOrigin: true,
        },
        "/glot-api": {
          target: "https://glot.io/api",
          changeOrigin: true,
          headers: glotProxyHeaders,
          rewrite: (path) => path.replace(/^\/glot-api/, ""),
        },
      },
    },
  };
});
