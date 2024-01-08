import {
  createTRPCRouter,
  protectedGroupMemberProcedure,
  protectedInviteRecipientProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { groups, invites, memberships } from "@/server/db/schema";
import {
  acceptInviteSchema,
  createInviteSchema,
  deleteInviteSchema,
} from "@/lib/schemas/invite";
import { and, eq } from "drizzle-orm";
import { api } from "@/trpc/server";
import { TRPCError } from "@trpc/server";

export const inviteRouter = createTRPCRouter({
  allForSignedInUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.invites.findMany({
      with: {
        group: true,
        invitedBy: true,
      },
      where: eq(invites.userId, ctx.session.user.id),
      orderBy: (invites, { desc }) => [desc(invites.createdAt)],
    });
  }),

  create: protectedGroupMemberProcedure
    .input(createInviteSchema)
    .mutation(async ({ ctx, input }) => {
      const membership = await ctx.db.query.memberships.findFirst({
        where: and(
          eq(memberships.groupId, input.groupId),
          eq(memberships.userId, input.userId),
        ),
      });

      if (membership) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            "You can't invite yourself to a group you are already a member of.",
        });
      }

      await ctx.db.insert(invites).values({
        ...input,
        id: crypto.randomUUID(),
        invitedBy: ctx.session.user.id,
      });
    }),

  delete: protectedGroupMemberProcedure
    .input(deleteInviteSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(invites).where(eq(invites.id, input.id));
    }),

  accept: protectedInviteRecipientProcedure
    .input(acceptInviteSchema)
    .mutation(async ({ ctx, input }) => {
      const invite = await ctx.db.query.invites.findFirst({
        where: eq(invites.id, input.id),
      });

      if (!invite) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The invite doesn't exist.",
        });
      }

      const { groupId } = invite;

      try {
        await api.group.join.mutate({
          groupId,
        });
      } catch (error) {
        throw error;
      }

      try {
        await ctx.db.delete(invites).where(eq(invites.id, input.id));
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    }),

  reject: protectedInviteRecipientProcedure
    .input(deleteInviteSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(invites).where(eq(invites.id, input.id));
    }),
});
