import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { posts, users } from "@/server/db/schema";
import {
  createPostSchema,
  deletePostSchema,
  infinitePostsSchema,
} from "@/lib/schemas/post";
import { desc, eq, gt } from "drizzle-orm";

export const postRouter = createTRPCRouter({
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
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const pagePosts = await ctx.db
        .select()
        .from(posts)
        .innerJoin(users, eq(posts.authorId, users.id))
        .orderBy(desc(posts.createdAt))
        .limit(3)
        .where(gt(posts.id, cursor ?? 0));
      let nextCursor: typeof cursor | undefined = undefined;
      if (pagePosts.length > limit) {
        const nextItem = pagePosts.pop();
        nextCursor = nextItem!.post.id;
      }
      return {
        pagePosts,
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
