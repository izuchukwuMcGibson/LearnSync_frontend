import { defineConfig, loadEnv } from "vite";
declare const process: any;
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const judge0ProxyHeaders = env.RAPID_API_KEY
    ? {
        "X-RapidAPI-Key": env.RAPID_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      }
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
        "/judge0-api": {
          target: "https://judge0-ce.p.rapidapi.com",
          changeOrigin: true,
          headers: judge0ProxyHeaders,
          rewrite: (path) => path.replace(/^\/judge0-api/, ""),
        },
      },
    },
  };
});
