import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import verifyUser from '@lib/verifyUser';
import { findUser } from '@lib/findUser';
import { registerGoogle } from '@lib/registerGoogle';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = (credentials?.email ?? '') as string;
        const password = (credentials?.password ?? '') as string;

        try {
          const user = await verifyUser(email, password);
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return `${baseUrl}/profile/me`;
    },
    async jwt({ token, account, profile, trigger, session }) {
      if (account?.provider === 'google') {
        const { email, name, picture } = profile as any;

        let user = await findUser(email);
        if (!user) {
          user = await registerGoogle({ name, email, image: picture });
        }
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      if (trigger === 'update') {
        token.image = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name,
          image: token.image as string | null,
          emailVerified: null,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
