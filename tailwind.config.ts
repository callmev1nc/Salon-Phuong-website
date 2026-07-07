import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          50: "#F9F9F9",
          100: "#F0F0F0",
          200: "#E0E0E0",
          300: "#B0B0B0",
          400: "#888888",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#222222",
          900: "#111111",
        },
      },
      // Fonts now come from next/font/google (layout.tsx) and expose CSS vars.
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest2: "0.22em", // micro-label tracking
      },
      // Single source of truth for stacking — never invent z-index inline.
      zIndex: {
        cursor: "300",
        lightbox: "200",
        intro: "150",
        menu: "120",
        header: "100",
        sticky: "90",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
