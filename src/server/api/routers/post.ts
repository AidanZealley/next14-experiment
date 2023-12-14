import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { posts, users } from "@/server/db/schema";
import {
  createPostSchema,
  deletePostSchema,
  infinitePostsSchema,
} from "@/lib/schemas/post";
import { asc, desc, eq, gt, lt, lte } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z
        .object({
          error: z.boolean(),
        })
        .nullish(),
    )
    .query(({ input }) => {
      if (input?.error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `UNAUTHORIZED`,
        });
      }

      return "Hello.";
    }),

  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({
      with: {
        author: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),

  infinite: protectedProcedure
    .input(infinitePostsSchema)
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      let lastPost = undefined;
      if (!cursor) {
        lastPost = await ctx.db.query.posts.findFirst({
          orderBy: (posts, { desc }) => [desc(posts.id)],
        });
      }
      const postsPage = await ctx.db
        .select()
        .from(posts)
        .innerJoin(users, eq(posts.authorId, users.id))
        .orderBy(desc(posts.id))
        .limit(limit + 1)
        .where(lte(posts.id, cursor ?? lastPost?.id ?? 0));
      console.log(postsPage);
      let nextCursor: typeof cursor | undefined = undefined;
      if (postsPage.length > limit) {
        const nextPage = postsPage[postsPage.length - 1];
        nextCursor = nextPage!.post.id;
      }
      return {
        postsPage: postsPage.slice(0, limit),
        nextCursor,
      };
    }),

  infiniteAsc: protectedProcedure
    .input(infinitePostsSchema)
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const postsPage = await ctx.db
        .select()
        .from(posts)
        .innerJoin(users, eq(posts.authorId, users.id))
        .orderBy(asc(posts.id))
        .limit(limit + 1)
        .where(gt(posts.id, cursor ?? 0));
      let nextCursor: typeof cursor | undefined = undefined;
      if (postsPage.length > limit) {
        const nextPage = postsPage[limit - 1];
        nextCursor = nextPage!.post.id;
      }
      return {
        postsPage: postsPage.slice(0, limit),
        nextCursor,
      };
    }),

  latest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({
      with: {
        author: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        text: input.text,
        authorId: ctx.session.user.id,
      });
    }),

  delete: protectedProcedure
    .input(deletePostSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
    }),
});
