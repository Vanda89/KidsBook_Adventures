import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/UI/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jua: ['--Jua', 'sans-serif'],
        nunito: ['--Nunito', 'sans-serif'],
      },

      height: {
        0.5: '0.125rem',
        0.6: '0.15rem',
        0.65: '0.175rem',
        0.75: '0.1875rem',
        13: '3.25rem',
      },
      fontSize: {
        xxs: '0.4rem',
      },
      borderWidth: {
        2.5: '2.5px',
      },
      screens: {
        xxs: '360px',
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [nextui()],
};
export default config;
