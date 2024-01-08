import { z } from "zod";
import { withIdSchema } from ".";

export const userByIdSchema = z.object({
  id: z.string().min(1),
});
export type UserByIdSchema = z.infer<typeof userByIdSchema>;

export const updateUserSchema = withIdSchema.extend({
  id: z.string().min(1),
  name: z.string().min(2).max(255),
  email: z.string().min(2).max(255),
  isAdmin: z.boolean(),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const deleteUserSchema = withIdSchema.extend({
  id: z.string().min(1),
});
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
