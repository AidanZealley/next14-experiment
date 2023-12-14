import { z } from "zod";

import {
  createTRPCRouter,
  protectedOwnerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { updateUserSchema } from "@/lib/schemas/user";

export const userRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),

  signedInUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, ctx.session.user.id),
    });
  }),

  update: protectedOwnerProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(users).set(input).where(eq(users.id, input.id));
    }),
});
