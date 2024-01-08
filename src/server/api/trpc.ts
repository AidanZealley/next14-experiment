import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z, ZodError } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { groups, invites, users } from "../db/schema";
import { eq } from "drizzle-orm";
import {
  withGroupIdSchema,
  withIdSchema,
  withUserIdSchema,
} from "@/lib/schemas";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerAuthSession();

  return {
    db,
    session,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsSignedIn = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const enforceUserIsGroupOwner = enforceUserIsSignedIn.unstable_pipe(
  async (opts) => {
    const { ctx, rawInput, next } = opts;
    const result = withIdSchema.parse(rawInput);
    const groupId = result.id;

    if (!groupId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "This request was not valid.",
      });
    }

    const group = await ctx.db.query.groups.findFirst({
      where: eq(groups.id, groupId),
    });

    if (!group) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "The group was not found.",
      });
    }

    if (ctx.session.user.id !== group.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "This action can only be performed by the group owner.",
      });
    }

    return next();
  },
);

const enforceUserIsGroupMember = enforceUserIsSignedIn.unstable_pipe(
  async (opts) => {
    const { ctx, rawInput, next } = opts;
    const result = withGroupIdSchema.parse(rawInput);
    const groupId = result.groupId;

    if (!groupId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "This request was not valid.",
      });
    }

    const group = await ctx.db.query.groups.findFirst({
      where: eq(groups.id, groupId),
      with: {
        memberships: true,
      },
    });

    if (!group) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "The group was not found.",
      });
    }

    const isMember = group.memberships.filter(
      (membership) => membership.userId === ctx.session.user.id,
    );

    if (!isMember) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "This action can only be performed by a group member.",
      });
    }

    return next();
  },
);

const enforceUserIsAdmin = enforceUserIsSignedIn.unstable_pipe(async (opts) => {
  const { ctx, next } = opts;
  const isAdmin = ctx.session.user.isAdmin;

  if (!isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next();
});

const enforceUserIsSelfOrAdmin = enforceUserIsSignedIn.unstable_pipe(
  async (opts) => {
    const { ctx, rawInput, next } = opts;

    if (ctx.session.user.isAdmin) {
      return next();
    }

    const result = withIdSchema.parse(rawInput);

    if (ctx.session.user.id !== result.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "This action can only be performed by that user or an admin.",
      });
    }

    return next();
  },
);

const enforceUserIsInviteRecipient = enforceUserIsSignedIn.unstable_pipe(
  async (opts) => {
    const { ctx, rawInput, next } = opts;
    const result = withIdSchema.parse(rawInput);
    const inviteId = result.id;

    if (!inviteId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "This request was not valid.",
      });
    }

    const invite = await ctx.db.query.invites.findFirst({
      where: eq(invites.id, inviteId),
    });

    if (!invite) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "The invite was not found.",
      });
    }

    if (ctx.session.user.id !== invite.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "This action can only be performed by the invite owner.",
      });
    }

    return next();
  },
);

export const protectedProcedure = t.procedure.use(enforceUserIsSignedIn);
export const protectedGroupOwnerProcedure = t.procedure.use(
  enforceUserIsGroupOwner,
);
export const protectedGroupMemberProcedure = t.procedure.use(
  enforceUserIsGroupMember,
);
export const protectedAdminProcedure = t.procedure.use(enforceUserIsAdmin);
export const protectedSelfOrAdminProcedure = t.procedure.use(
  enforceUserIsSelfOrAdmin,
);
export const protectedInviteRecipientProcedure = t.procedure.use(
  enforceUserIsInviteRecipient,
);
