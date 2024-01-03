// import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "@/server/db";
import { UserConfig } from "@/server/db/schema";
import { DrizzleAdapter } from "./db/adapter";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
      userConfig: UserConfig;
    } & DefaultSession["user"];
  }

  interface User {
    isAdmin: boolean;
    userConfig: UserConfig | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        isAdmin: user.isAdmin,
        userConfig: user.userConfig,
      },
    }),
  },
  // adapter: DrizzleAdapter(db, mysqlTable),
  adapter: DrizzleAdapter(),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { prompt: "login" },
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
