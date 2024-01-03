import { createTRPCRouter } from "@/server/api/trpc";
import { postRouter } from "@/server/api/routers/post";
import { userRouter } from "@/server/api/routers/user";
import { groupRouter } from "@/server/api/routers/group";

export const appRouter = createTRPCRouter({
  group: groupRouter,
  post: postRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
