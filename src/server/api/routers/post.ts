import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { posts, users } from "@/server/db/schema";
import {
  createPostSchema,
  deletePostSchema,
  infinitePostsSchema,
} from "@/lib/schemas/post";
import { and, asc, desc, eq, gt, lte } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({
      with: {
        author: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      where: eq(posts.groupId, ctx.session.user.userConfig.groupId),
    });
  }),

  infinite: protectedProcedure
    .input(infinitePostsSchema)
    .query(async ({ ctx, input }) => {
      try {
        const { cursor, limit } = input;
        let lastPost = undefined;
        if (!cursor) {
          lastPost = await ctx.db.query.posts.findFirst({
            orderBy: (posts, { desc }) => [desc(posts.id)],
            where: eq(posts.groupId, ctx.session.user.userConfig.groupId),
          });
        }
        const postsPage = await ctx.db
          .select()
          .from(posts)
          .leftJoin(users, eq(posts.userId, users.id))
          .orderBy(desc(posts.id))
          .limit(limit + 1)
          .where(
            and(
              lte(posts.id, cursor ?? lastPost?.id ?? 0),
              eq(posts.groupId, ctx.session.user.userConfig.groupId),
            ),
          );
        if (!postsPage.length) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }
        let nextCursor: typeof cursor | undefined = undefined;
        if (postsPage.length > limit) {
          const nextPage = postsPage[postsPage.length - 1];
          nextCursor = nextPage!.post.id;
        }
        return {
          postsPage: postsPage.slice(0, limit),
          nextCursor,
        };
      } catch (error) {
        if (
          typeof error === "object" &&
          error &&
          "code" in error &&
          typeof error.code === "string"
        ) {
          if (error.code === "NOT_FOUND") {
            throw new TRPCError({ code: "NOT_FOUND" });
          }
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  infiniteAsc: protectedProcedure
    .input(infinitePostsSchema)
    .query(async ({ ctx, input }) => {
      try {
        const { cursor, limit } = input;
        const postsPage = await ctx.db
          .select()
          .from(posts)
          .leftJoin(users, eq(posts.userId, users.id))
          .orderBy(asc(posts.id))
          .limit(limit + 1)
          .where(
            and(
              gt(posts.id, cursor ?? 0),
              eq(posts.groupId, ctx.session.user.userConfig.groupId),
            ),
          );
        if (!postsPage.length) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }
        let nextCursor: typeof cursor | undefined = undefined;
        if (postsPage.length > limit) {
          const nextPage = postsPage[limit - 1];
          nextCursor = nextPage!.post.id;
        }
        return {
          postsPage: postsPage.slice(0, limit),
          nextCursor,
        };
      } catch (error) {
        if (
          typeof error === "object" &&
          error &&
          "code" in error &&
          typeof error.code === "string"
        ) {
          if (error.code === "NOT_FOUND") {
            throw new TRPCError({ code: "NOT_FOUND" });
          }
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  latest: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.posts.findFirst({
      with: {
        author: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      where: eq(posts.groupId, ctx.session.user.userConfig.groupId),
    });

    if (typeof data === "undefined") {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    return data;
  }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.userConfig.groupId) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      await ctx.db.insert(posts).values({
        text: input.text,
        userId: ctx.session.user.id,
        groupId: ctx.session.user.userConfig.groupId,
      });
    }),

  delete: protectedProcedure
    .input(deletePostSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
    }),
});
