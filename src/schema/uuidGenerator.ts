import { z } from "zod";

export const uuidGeneratorSchema = z.object({
  version: z.enum(["v1", "v4", "v6", "v7"]),
});
