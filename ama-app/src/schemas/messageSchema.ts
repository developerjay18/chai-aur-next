import { z } from 'zod';

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: 'content contains atleast 10 characters' })
    .max(200, { message: 'content can contains maximum 300 characters' }),
});
