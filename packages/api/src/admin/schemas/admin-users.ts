import { z } from "zod";

export const adminUserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(255),
  email: z.string().email(),
  encryptedPassword: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createAdminUserSchema = z
  .object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"],
  });

export const updateAdminUserSchema = adminUserSchema.partial({
  id: true,
  name: true,
  email: true,
  encryptedPassword: true,
  createdAt: true,
  updatedAt: true,
});
