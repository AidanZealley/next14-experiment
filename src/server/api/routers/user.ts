import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  accounts,
  groups,
  posts,
  sessions,
  userConfigs,
  users,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import {
  deleteUserSchema,
  updateUserSchema,
  userByIdSchema,
} from "@/lib/schemas/user";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  byId: protectedProcedure.input(userByIdSchema).query(({ ctx, input }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, input.id),
    });
  }),

  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),

  signedInUser: publicProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }

    const userId = ctx.session.user.id;

    return ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
      with: {
        userConfig: true,
      },
    });
  }),

  update: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(users).set(input).where(eq(users.id, input.id));
    }),

  delete: protectedProcedure
    .input(deleteUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.transaction(async (tx) => {
          await tx.delete(users).where(eq(users.id, input.id));
          await tx.delete(posts).where(eq(posts.userId, input.id));
          await tx.delete(groups).where(eq(groups.userId, input.id));
          await tx.delete(accounts).where(eq(accounts.userId, input.id));
          await tx.delete(sessions).where(eq(sessions.userId, input.id));
          await tx.delete(userConfigs).where(eq(userConfigs.userId, input.id));
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
