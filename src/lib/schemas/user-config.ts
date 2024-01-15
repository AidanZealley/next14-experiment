import { z } from "zod";
import { withGroupIdSchema } from ".";

export const switchGroupSchema = withGroupIdSchema;
export type SwitchGroupSchema = z.infer<typeof switchGroupSchema>;
