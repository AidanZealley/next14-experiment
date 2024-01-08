import {
  createTRPCRouter,
  protectedGroupMemberProcedure,
} from "@/server/api/trpc";
import { invites } from "@/server/db/schema";
import { createInviteSchema, deleteInviteSchema } from "@/lib/schemas/invite";
import { eq } from "drizzle-orm";

export const inviteRouter = createTRPCRouter({
  create: protectedGroupMemberProcedure
    .input(createInviteSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      await ctx.db.insert(invites).values({
        ...input,
        id: crypto.randomUUID(),
        invitedBy: ctx.session.user.id,
      });
    }),

  delete: protectedGroupMemberProcedure
    .input(deleteInviteSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(invites).where(eq(invites.id, input.id));
    }),
});
