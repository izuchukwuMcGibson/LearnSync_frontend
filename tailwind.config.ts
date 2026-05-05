import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Inter", "ui-sans-serif", "system-ui"],
        inter: ["Inter", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(6px, -10px)" },
        },
      },
      animation: {
        "float-in": "floatIn 1s ease forwards",
        "drift-slow": "drift 6s ease-in-out infinite",
        "drift-slower": "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
