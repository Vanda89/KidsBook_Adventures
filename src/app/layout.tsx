import './globals.css';
import type { Metadata } from 'next';
import { jua, nunito } from '../../public/assets/fonts/fonts';
import { Header } from '@/UI/components/layout/Header';
import AuthProvider from '@/UI/components/auth-provider/AuthProvider';
import type { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { auth } from '@/app/api/auth/auth';

export const metadata: Metadata = {
  title: 'KidsBook Adventures',
  description: 'Devient le héros de tes aventures !',
};

const fetchUser = async (userId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}/api/user/${userId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return data;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    return <div>Veuillez vous connecter</div>;
  }
  if (session) {
    const userId = session?.user?.id || 'Default Id';
    console.log(userId);
  }
  const user = await fetchUser(session?.user?.id || 'Default Id');
  if (!user) {
    return <div>Failed to fetch user</div>;
  }

  return (
    <html lang="fr">
      <body className={`${jua.variable} ${nunito.variable}`}>
        <NextUIProvider>
          <AuthProvider>
            <Header userId={user?.id} />
            <main className="min-h-screen m-24">{children}</main>
          </AuthProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
