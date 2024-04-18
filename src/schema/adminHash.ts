import { z } from "zod";

export const adminHashSchema = z.object({
  value: z.string().min(1),
});
