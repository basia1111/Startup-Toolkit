import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Syne: ['"Syne"', "serif"],
        OpenSans: ['"Open Sans"', "sans-serif"],
      },
      colors: {
        black: "#16161e",
      }
    },
  },
  plugins: [],
};

export default config;
