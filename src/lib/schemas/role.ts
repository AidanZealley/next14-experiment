import { z } from "zod";

export const roleByIdSchema = z.object({
  id: z.number().min(1),
});
export type RoleByIdSchema = z.infer<typeof roleByIdSchema>;

export const createRoleSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Role name is required.",
    })
    .max(255),
});
export type CreateRoleSchema = z.infer<typeof createRoleSchema>;

export const updateRoleSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(2).max(255),
});
export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>;

export const deleteRoleSchema = z.object({
  id: z.number().min(1),
});
export type DeleteRoleSchema = z.infer<typeof deleteRoleSchema>;
