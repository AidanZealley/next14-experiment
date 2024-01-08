import { z } from "zod";

export const createMembershipSchema = z.object({
  groupId: z.string().min(1).max(255),
});
export type CreateMembershipSchema = z.infer<typeof createMembershipSchema>;

export const deleteMembershipSchema = z.object({
  groupId: z.string().min(1).max(255),
  userId: z.string().min(1).max(255),
});
export type DeleteMembershipSchema = z.infer<typeof deleteMembershipSchema>;
