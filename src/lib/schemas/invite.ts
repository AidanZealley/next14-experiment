import { z } from "zod";
import { withIdSchema } from ".";

export const createInviteSchema = z.object({
  userId: z.string().min(1).max(255),
  groupId: z.string().min(1).max(255),
});
export type CreateInviteSchema = z.infer<typeof createInviteSchema>;

export const acceptInviteSchema = withIdSchema.extend({
  id: z.string().min(1).max(255),
});
export type AcceptInviteSchema = z.infer<typeof acceptInviteSchema>;

export const deleteInviteSchema = withIdSchema.extend({
  id: z.string().min(1).max(255),
});
export type DeleteInviteSchema = z.infer<typeof deleteInviteSchema>;
