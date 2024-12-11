import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['"Inter"', 'sans-serif'],
      },
      colors: {
        green: 'rgb(0 185 135)',
        lightGreen: 'rgb(207 255 236)',
        softWhite: '#f9f9f9',
      },
    },
  },
  plugins: [],
};

export default config;
