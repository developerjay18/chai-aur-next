import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Minimum 2 characters required")
  .max(20, "Maximum 20 characters allowed")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
});
