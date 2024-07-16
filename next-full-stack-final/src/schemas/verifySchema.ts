import { z } from "zod";

export const verifySchema = z.object({
  code: z
    .string()
    .length(6, { message: "Vertification code is of 6 digits only" }),
});
