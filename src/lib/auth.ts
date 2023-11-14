import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/lib/db';

import GoogleProvider from 'next-auth/providers/google';
import { Role } from '@prisma/client';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    session: async ({ session }) => {
      const dbUser = await db.user.findUnique({
        where: {
          email: session?.user?.email as string
        }
      });

      if (session && session.user && dbUser) {
        session.user.username = dbUser?.username as string;
        session.user.role = dbUser.role as Role;
        session.user.id = dbUser.id as string;
      }

      return Promise.resolve(session);
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/auth/signIn',
    newUser: '/onboarding'
  }
};
