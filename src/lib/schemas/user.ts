import { z } from "zod";

export const userByIdSchema = z.object({
  id: z.string().min(1),
});
export type UserByIdSchema = z.infer<typeof userByIdSchema>;

export const updateUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(255).toUpperCase(),
  email: z.string().min(2).max(255),
  isAdmin: z.boolean(),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const deleteUserSchema = z.object({
  id: z.string().min(1),
});
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
