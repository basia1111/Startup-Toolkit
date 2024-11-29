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
        black: '#0A0E14',
        gray: '#171b21',
        mediumGray: '#939393',
        lightGray: '#eaeaea',
        orange: '#fc7a00',
        lightOrnage: '#ffe0c1',
        green: 'rgb(0 185 135)',
        lightGreen: 'rgb(207 255 236)',
        red: '#f74242',
        softWhite: '#f9f9f9',
      },
    },
  },
  plugins: [],
};

export default config;
