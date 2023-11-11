import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    session: async ({ session }) => {
      const dbUser = await db.user.findUnique({
        where: {
          email: session?.user?.email!,
        },
      });

      if (session && session.user && dbUser) {
        session.user.username = dbUser?.username!;
        session.user.role = dbUser.role!;
      }

      return Promise.resolve(session);
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
    newUser: "/onboarding",
  },
};
