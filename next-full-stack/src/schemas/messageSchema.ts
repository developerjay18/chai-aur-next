import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "Content must contains more than or equal to 10 characters",
    })
    .max(300, { message: "Content length limit is 300 characters" }),
});
