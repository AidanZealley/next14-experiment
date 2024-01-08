import {
  createTRPCRouter,
  protectedGroupOwnerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { groups, memberships } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { deleteMembershipSchema } from "@/lib/schemas/membership";
import { TRPCError } from "@trpc/server";

export const memberRouter = createTRPCRouter({
  deleteMembership: protectedProcedure
    .input(deleteMembershipSchema)
    .mutation(async ({ ctx, input }) => {
      const membership = await ctx.db.query.memberships.findFirst({
        where: and(
          eq(memberships.userId, input.userId),
          eq(memberships.groupId, input.groupId),
        ),
        with: {
          group: true,
        },
      });

      if (!membership) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested membership not found.",
        });
      }

      if (membership.userId === membership.group.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot remove the owner of a group.",
        });
      }

      await ctx.db
        .delete(memberships)
        .where(
          and(
            eq(memberships.userId, ctx.session.user.id),
            eq(memberships.groupId, input.groupId),
          ),
        );
    }),
});
