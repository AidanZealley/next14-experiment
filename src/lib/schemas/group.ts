import { z } from "zod";
import { withIdSchema } from ".";

export const groupByIdSchema = z.object({
  id: z.string().min(1),
});
export type GroupByIdSchema = z.infer<typeof groupByIdSchema>;

export const createGroupSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Group text is required.",
    })
    .max(255),
});
export type CreateGroupSchema = z.infer<typeof createGroupSchema>;

export const updateGroupSchema = withIdSchema.extend({
  id: z.string().min(1).max(255),
  name: z.string().min(2).max(255),
});
export type UpdateGroupSchema = z.infer<typeof updateGroupSchema>;

export const deleteGroupSchema = withIdSchema.extend({
  id: z.string().min(1).max(255),
});
export type DeleteGroupSchema = z.infer<typeof deleteGroupSchema>;

export const leaveGroupSchema = z.object({
  groupId: z.string().min(1).max(255),
});
export type LeaveGroupSchema = z.infer<typeof leaveGroupSchema>;

export const deleteGroupInviteSchema = withIdSchema.extend({
  groupId: z.string().min(1).max(255),
  userId: z.string().min(1).max(255),
});
export type DeleteGroupInviteSchema = z.infer<typeof deleteGroupInviteSchema>;
