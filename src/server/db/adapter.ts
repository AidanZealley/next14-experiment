import { and, eq } from "drizzle-orm";
import { Adapter } from "next-auth/adapters";
import {
  accounts,
  groups,
  memberships,
  sessions,
  userConfigs,
  users,
  verificationTokens,
} from "@/server/db/schema";
import { db } from "@/server/db";

export function DrizzleAdapter(): Adapter {
  return {
    async createUser(data) {
      console.log("CREATE USER");

      const userId = crypto.randomUUID();
      const groupId = crypto.randomUUID();
      const userConfigId = crypto.randomUUID();

      await db.transaction(async (tx) => {
        await tx.insert(users).values({ ...data, id: userId, userConfigId });
        await tx
          .insert(groups)
          .values({ id: groupId, name: "Home", userId, isPersonal: true });
        await tx.insert(memberships).values({ userId, groupId });
        await tx
          .insert(userConfigs)
          .values({ id: userConfigId, userId, groupId });
      });

      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
          userConfig: true,
        },
      });

      if (!user) {
        throw "User not found.";
      }

      return user;
    },

    async getUser(data) {
      console.log("GET USER");

      const user =
        (await db.query.users.findFirst({
          where: eq(users.id, data),
          with: {
            userConfig: true,
          },
        })) ?? null;

      return user;
    },

    async getUserByEmail(data) {
      console.log("GET USER BY EMAIL");

      const user =
        (await db.query.users.findFirst({
          where: eq(users.id, data),
          with: {
            userConfig: true,
          },
        })) ?? null;

      return user;
    },

    async createSession(data) {
      console.log("CREATE SESSION");

      await db.insert(sessions).values(data);

      const session = await db.query.sessions.findFirst({
        where: eq(sessions.sessionToken, data.sessionToken),
      });

      if (!session) {
        throw "Session not found";
      }

      return session;
    },

    async getSessionAndUser(data) {
      console.log("GET SESSION AND USER");

      const sessionAndUser =
        (await db.query.sessions.findFirst({
          where: eq(sessions.sessionToken, data),
          with: {
            user: {
              with: {
                userConfig: true,
              },
            },
          },
        })) ?? null;

      if (!sessionAndUser) {
        return sessionAndUser;
      }

      return {
        session: {
          userId: sessionAndUser.userId,
          sessionToken: sessionAndUser.sessionToken,
          expires: sessionAndUser.expires,
        },
        user: sessionAndUser.user,
      };
    },

    async updateUser(data) {
      console.log("UPDATE USER");

      if (!data.id) {
        throw new Error("No user id.");
      }

      await db.update(users).set(data).where(eq(users.id, data.id));

      const user = await db.query.users.findFirst({
        where: eq(users.id, data.id),
        with: {
          userConfig: true,
        },
      });

      if (!user) {
        throw "User not found.";
      }

      return user;
    },

    async updateSession(data) {
      console.log("UPDATE SESSION");

      await db
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken));

      return await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .then((res) => res[0]);
    },

    async linkAccount(rawAccount) {
      console.log("LINK ACCOUNT");

      await db.insert(accounts).values(rawAccount);
    },

    async getUserByAccount(account) {
      console.log("GET USER BY ACCOUNT");

      const dbAccount =
        (await db.query.accounts.findFirst({
          where: and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider),
          ),
          with: {
            user: {
              with: { userConfig: true },
            },
          },
        })) ?? null;

      if (!dbAccount) {
        return null;
      }

      return dbAccount.user;
    },

    async deleteSession(sessionToken) {
      console.log("DELETE SESSION");

      const session =
        (await db
          .select()
          .from(sessions)
          .where(eq(sessions.sessionToken, sessionToken))
          .then((res) => res[0])) ?? null;

      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));

      return session;
    },

    async createVerificationToken(token) {
      console.log("CREATE TOKEN");

      await db.insert(verificationTokens).values(token);

      return await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.identifier, token.identifier))
        .then((res) => res[0]);
    },

    async useVerificationToken(token) {
      console.log("USE TOKEN");

      try {
        const deletedToken =
          (await db
            .select()
            .from(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, token.identifier),
                eq(verificationTokens.token, token.token),
              ),
            )
            .then((res) => res[0])) ?? null;

        await db
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token),
            ),
          );

        return deletedToken;
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },

    async deleteUser(id) {
      console.log("DELETE USER");

      const user =
        (await db.query.users.findFirst({
          where: eq(users.id, id),
          with: {
            userConfig: true,
          },
        })) ?? null;

      await db.delete(users).where(eq(users.id, id));

      return user;
    },

    async unlinkAccount(account) {
      console.log("UNLINK ACCOUNT");

      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider),
          ),
        );

      return undefined;
    },
  };
}
