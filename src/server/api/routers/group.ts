import {
  createTRPCRouter,
  protectedGroupOwnerProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { groups, invites, memberships } from "@/server/db/schema";
import {
  createGroupSchema,
  deleteGroupInviteSchema,
  deleteGroupSchema,
  groupByIdSchema,
  leaveGroupSchema,
  updateGroupSchema,
} from "@/lib/schemas/group";
import { and, eq } from "drizzle-orm";
import { createMembershipSchema } from "@/lib/schemas/membership";
import { TRPCError } from "@trpc/server";

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
      where: eq(groups.isPersonal, false),
      orderBy: (groups, { desc }) => [desc(groups.updatedAt)],
    });
  }),

  personalGroup: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.groups.findFirst({
      where: and(
        eq(groups.userId, ctx.session.user.id),
        eq(groups.isPersonal, true),
      ),
    });
  }),

  create: protectedProcedure
    .input(createGroupSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const groupId = crypto.randomUUID();

        await tx.insert(groups).values({
          id: groupId,
          name: input.name,
          userId: ctx.session.user.id,
        });
        await tx.insert(memberships).values({
          userId: ctx.session.user.id,
          groupId: groupId,
        });
      });
    }),

  update: protectedGroupOwnerProcedure
    .input(updateGroupSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(groups).set(input).where(eq(groups.id, input.id));
    }),

  delete: protectedGroupOwnerProcedure
    .input(deleteGroupSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(groups).where(eq(groups.id, input.id));
    }),

  join: protectedProcedure
    .input(createMembershipSchema)
    .mutation(async ({ ctx, input }) => {
      const group = await ctx.db.query.groups.findFirst({
        where: eq(groups.id, input.groupId),
      });

      if (!group) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The group doesn't exist.",
        });
      }

      if (group.isPersonal) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You aren't permitted to join this group.",
        });
      }

      try {
        await ctx.db
          .insert(memberships)
          .values({ ...input, userId: ctx.session.user.id });
      } catch (error) {
        if (
          typeof error === "object" &&
          error &&
          "message" in error &&
          typeof error.message === "string"
        ) {
          if (error.message.includes("AlreadyExists")) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "You are already a member of this group.",
            });
          }
        }
      }
    }),

  leave: protectedProcedure
    .input(leaveGroupSchema)
    .mutation(async ({ ctx, input }) => {
      const membership = await ctx.db.query.memberships.findFirst({
        where: and(
          eq(memberships.userId, ctx.session.user.id),
          eq(memberships.groupId, input.groupId),
        ),
        with: {
          group: true,
        },
      });

      if (!membership) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "You aren't a member of this group.",
        });
      }

      if (membership.userId === membership.group.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The owner of a group can't leave.",
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

  deleteGroupInvite: protectedProcedure
    .input(deleteGroupInviteSchema)
    .mutation(async ({ ctx, input }) => {
      const invite = await ctx.db.query.invites.findFirst({
        where: and(
          eq(invites.groupId, input.groupId),
          eq(invites.userId, input.userId),
        ),
      });

      if (!invite) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invite not found.",
        });
      }

      const group = await ctx.db.query.groups.findFirst({
        where: eq(groups.id, input.groupId),
      });

      if (!group) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The group doesn't exist.",
        });
      }

      if (
        group.userId !== ctx.session.user.id ||
        invite.invitedBy !== ctx.session.user.id
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "Only group owners or the user who created the invite can remove an invite.",
        });
      }

      await ctx.db
        .delete(invites)
        .where(
          and(
            eq(invites.userId, input.userId),
            eq(invites.groupId, input.groupId),
          ),
        );
    }),
});
