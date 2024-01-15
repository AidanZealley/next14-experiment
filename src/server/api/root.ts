import { createTRPCRouter } from "@/server/api/trpc";
import { groupRouter } from "@/server/api/routers/group";
import { memberRouter } from "./routers/member";
import { postRouter } from "@/server/api/routers/post";
import { userRouter } from "@/server/api/routers/user";
import { inviteRouter } from "./routers/invite";
import { userConfigRouter } from "./routers/user-config";

export const appRouter = createTRPCRouter({
  group: groupRouter,
  invite: inviteRouter,
  member: memberRouter,
  post: postRouter,
  user: userRouter,
  userConfig: userConfigRouter,
});

export type AppRouter = typeof appRouter;
