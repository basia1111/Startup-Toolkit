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
        black: '#131010',
        gray: '#2f2f34',
        orange: '#ff8607',
        red: '#f74242',
      },
    },
  },
  plugins: [],
};

export default config;
