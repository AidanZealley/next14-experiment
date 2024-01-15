import { z } from "zod";

export const withIdSchema = z.object({ id: z.string().min(1) });

export const withGroupIdSchema = z.object({
  groupId: z.string().min(1).max(255),
});

export const withUserIdSchema = z.object({ userId: z.string().min(1) });
