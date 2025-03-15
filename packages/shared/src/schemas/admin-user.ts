import { z } from 'zod';

export const adminUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  encryptedPassword: z.string().min(6),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});
