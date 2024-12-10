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
        black: '#13131f',
        gray: '#171b21',
        mediumGray: '#939393',
        lightGray: '#eaeaea',
        orange: '#fc7a00',
        lightOrnage: '#ffe0c1',
        green: 'rgb(0 185 135)',
        lightGreen: 'rgb(207 255 236)',
        softWhite: '#f9f9f9',
        accent: '#4b61ed',
        accentDisabled: '#909ef9',
        accentHover: '#2435a5',
      },
    },
  },
  plugins: [],
};

export default config;
