import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z, ZodError } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

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

export const enforceUserIsOwnerSchema = z
  .object({ userId: z.string().min(1) })
  .partial();

const enforceUserIsOwner = enforceUserIsSignedIn.unstable_pipe((opts) => {
  const { ctx, rawInput, next } = opts;
  const result = enforceUserIsOwnerSchema.parse(rawInput);

  if (ctx.session.user.id !== result.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next();
});

const enforceUserIsAdmin = enforceUserIsSignedIn.unstable_pipe(async (opts) => {
  const { ctx, next } = opts;
  const isAdmin = ctx.session.user.isAdmin;

  if (!isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next();
});

export const protectedProcedure = t.procedure.use(enforceUserIsSignedIn);
export const protectedOwnerProcedure = t.procedure.use(enforceUserIsOwner);
export const protectedAuthorisedProcedure = t.procedure.use(enforceUserIsAdmin);
