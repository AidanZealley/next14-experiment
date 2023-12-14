import { z } from "zod";

export const createPostSchema = z.object({
  text: z
    .string()
    .min(1, {
      message: "Post text is required.",
    })
    .max(255),
});
export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const deletePostSchema = z.object({
  id: z.number().min(1),
});
export type DeletePostSchema = z.infer<typeof deletePostSchema>;

export const infinitePostsSchema = z.object({
  limit: z.number().min(1).max(100),
  cursor: z.number().nullish(),
});
export type InfinitePostSchema = z.infer<typeof infinitePostsSchema>;
