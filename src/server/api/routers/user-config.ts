import { switchGroupSchema } from "@/lib/schemas/user-config";
import {
  createTRPCRouter,
  protectedGroupMemberProcedure,
} from "@/server/api/trpc";
import { userConfigs } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userConfigRouter = createTRPCRouter({
  switchGroup: protectedGroupMemberProcedure
    .input(switchGroupSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(userConfigs)
        .set(input)
        .where(eq(userConfigs.userId, ctx.session.user.id));
    }),
});
