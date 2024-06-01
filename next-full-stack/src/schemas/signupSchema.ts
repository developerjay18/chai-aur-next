import { z } from "zod";

const userNameValidation = z
  .string()
  .min(3, "Username must contains at least 3 characters")
  .max(20, "Username contains less than or equal to 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username should not contain any special characters"
  );

export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must contains atleast 6 characters" }),
});
