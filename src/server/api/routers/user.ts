import {
  createTRPCRouter,
  protectedOwnerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { accounts, posts, sessions, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import {
  deleteUserSchema,
  updateUserSchema,
  userByIdSchema,
} from "@/lib/schemas/user";

export const userRouter = createTRPCRouter({
  byId: protectedProcedure.input(userByIdSchema).query(({ ctx, input }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, input.id),
    });
  }),

  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),

  signedInUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, ctx.session.user.id),
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
      // TODO - Error handling
      await ctx.db.delete(users).where(eq(users.id, input.id));
      await Promise.allSettled([
        ctx.db.delete(posts).where(eq(posts.userId, input.id)),
        ctx.db.delete(accounts).where(eq(accounts.userId, input.id)),
        ctx.db.delete(sessions).where(eq(sessions.userId, input.id)),
        ctx.db.delete(users).where(eq(users.id, input.id)),
      ]);
    }),
});
