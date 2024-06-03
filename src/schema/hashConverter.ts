import { z } from "zod";

export const hashConverterSchema = z.object({
  value: z.string().min(1),
});
