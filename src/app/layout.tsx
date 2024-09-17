import './globals.css';
import type { Metadata } from 'next';
import { jua, nunito } from '../../public/assets/fonts/fonts';
import { Header } from '@/UI/components/layout/Header';
import AuthProvider from '@/UI/components/auth-provider/AuthProvider';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'KidsBook Adventures',
  description: 'Devient le héros de tes aventures !',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const themes = [
    'neutralTheme',
    'violetTheme',
    'pinkTheme',
    'blueTheme',
    'greenTheme',
    'yellowTheme',
    'orangeTheme',
    'redTheme',
    'brownTheme',
    'grayTheme',
  ];

  return (
    <html lang="fr" className=" bg-no-repeat bg-cover ">
      <body className={`${jua.variable} ${nunito.variable}  text-content1`}>
        <NextUIProvider>
          <ThemeProvider attribute="class" enableSystem={false} defaultTheme="neutralTheme" themes={themes}>
            <AuthProvider>
              <Header />
              <main className="min-h-screen py-16 md:py-24 md:px-12  relative ">{children}</main>
            </AuthProvider>
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
