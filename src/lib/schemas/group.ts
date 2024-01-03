import { z } from "zod";

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

export const updateGroupSchema = z.object({
  id: z.string().min(1).max(255),
  name: z.string().min(2).max(255),
});
export type UpdateGroupSchema = z.infer<typeof updateGroupSchema>;

export const deleteGroupSchema = z.object({
  id: z.string().min(1).max(255),
});
export type DeleteGroupSchema = z.infer<typeof deleteGroupSchema>;
