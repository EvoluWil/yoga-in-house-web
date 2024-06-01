import { authService } from '@/services/auth.service';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const result = await authService.signIn({
          email: credentials?.email as string,
          password: credentials?.password as string,
        });

        if (result) {
          return {
            ...result.instructor,
            token: result.token,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.token = user.token;
        token.email = user.email;
        token.picture = user.picture;
        token.phone = user.phone;
        token.cpf = user.cpf;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
