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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        //"iframe-sm": "375px", // Small mobile (iPhone 12, 13, etc.)
        //"iframe-md": "430px", // Larger mobiles (iPhone 14 Pro Max, etc.)
        // "iframe-lg": "768px", // Small desktop or tablet
        // "iframe-sm": { max: "430px" }, // Small mobile devices, up to 430px
        //"iframe-md": { max: "452px" }, // Anything smaller than the full iframe size
        //"iframe-lg": "453px", // Large screens from 453px upwards (desktop)
        "iframe-sm": { max: "452px" }, // Mobile devices below 453px
        "iframe-lg": "453px",
      },
    },
  },
  plugins: [],
};
export default config;
