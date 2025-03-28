import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    encryptedPassword: z.string().min(6),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
  token: z.string(),
});

export const logoutResponseSchema = z.object({
  message: z.string(),
});

export const meResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    encryptedPassword: z.string().min(6),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
});

export const authErrorResposneSchema = z.object({
  message: z.string(),
});
