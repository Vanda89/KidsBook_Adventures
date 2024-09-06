import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'KidsBook Adventures',
      credentials: {
        email: { label: 'E-mail', type: 'text', placeholder: 'Votre e-mail' },
        password: {
          label: 'Mot de passe',
          type: 'password',
          placeholder: 'Votre mot de passe',
        },
      },

      async authorize(credentials) {
        try {
          const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          console.log('nextauth', response);

          if (!response.ok) throw new Error('Échec de la connexion');
          const user = await response.json();

          if (user && user.id) {
            console.log('user', user);

            return user;
          } else {
            throw new Error('Identifiants invalides');
          }
        } catch (error) {
          console.error('Erreur lors de la connexion :', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/',
  },
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.name = user.name as string;
        console.log('token', token);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      return session;
    },
  },
});
