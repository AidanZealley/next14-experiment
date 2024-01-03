import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { groups, memberships, users } from "@/server/db/schema";
import {
  createGroupSchema,
  deleteGroupSchema,
  groupByIdSchema,
  updateGroupSchema,
} from "@/lib/schemas/group";
import { eq } from "drizzle-orm";

export const groupRouter = createTRPCRouter({
  byId: protectedProcedure.input(groupByIdSchema).query(({ ctx, input }) => {
    return ctx.db.query.groups.findFirst({
      where: eq(groups.id, input.id),
    });
  }),

  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.groups.findMany({
      with: {
        owner: true,
        memberships: true,
      },
      orderBy: (groups, { desc }) => [desc(groups.updatedAt)],
    });
  }),

  create: protectedProcedure
    .input(createGroupSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const groupId = crypto.randomUUID();
        const membershipId = crypto.randomUUID();

        await tx.insert(groups).values({
          id: groupId,
          name: input.name,
          userId: ctx.session.user.id,
        });
        await tx.insert(memberships).values({
          id: membershipId,
          userId: ctx.session.user.id,
          groupId: groupId,
        });
      });
    }),

  update: protectedProcedure
    .input(updateGroupSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(groups).set(input).where(eq(groups.id, input.id));
    }),

  delete: protectedProcedure
    .input(deleteGroupSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(groups).where(eq(groups.id, input.id));
    }),
});
