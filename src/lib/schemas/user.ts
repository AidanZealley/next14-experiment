import { z } from "zod";

export const updateUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2).max(255),
  email: z.string().min(2).max(320),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
