import { createTRPCRouter } from "@/server/api/trpc";
import { groupRouter } from "@/server/api/routers/group";
import { memberRouter } from "./routers/member";
import { postRouter } from "@/server/api/routers/post";
import { userRouter } from "@/server/api/routers/user";
import { inviteRouter } from "./routers/invite";

export const appRouter = createTRPCRouter({
  group: groupRouter,
  invite: inviteRouter,
  member: memberRouter,
  post: postRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
