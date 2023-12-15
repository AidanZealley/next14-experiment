import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createRoleSchema,
  deleteRoleSchema,
  roleByIdSchema,
  updateRoleSchema,
} from "@/lib/schemas/role";
import { roles } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const roleRouter = createTRPCRouter({
  byId: protectedProcedure.input(roleByIdSchema).query(({ ctx, input }) => {
    return ctx.db.query.roles.findFirst({
      where: eq(roles.id, input.id),
    });
  }),

  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.roles.findMany();
  }),

  create: protectedProcedure
    .input(createRoleSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(roles).values({
        name: input.name,
      });
    }),

  update: protectedProcedure
    .input(updateRoleSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(roles).set(input).where(eq(roles.id, input.id));
    }),

  delete: protectedProcedure
    .input(deleteRoleSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(roles).where(eq(roles.id, input.id));
    }),
});
