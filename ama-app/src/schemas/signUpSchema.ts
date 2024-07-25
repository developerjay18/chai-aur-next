import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(3, 'Username must contains at least 3 characters')
  .max(20, 'Username contains max 20 characters only')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain any special characters');

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
