import { Jua, Nunito } from 'next/font/google';

export const jua = Jua({
  subsets: ['latin'],
  weight: '400',
  variable: '--Jua',
});

export const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--Nunito',
});
