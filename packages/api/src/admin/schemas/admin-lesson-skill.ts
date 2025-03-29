import { z } from "zod";

export const adminLessonSkillSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  position: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createAdminLessonSkillSchema = z.object({
  name: z.string().min(1).max(255, "名前は255文字以内で入力してください"),
  slug: z.string().min(1).max(255, "スラッグは255文字以内で入力してください"),
  position: z.number(),
});

export const updateAdminLessonSkillSchema = z.object({
  name: z.string().min(1).max(255, "名前は255文字以内で入力してください"),
  slug: z.string().min(1).max(255, "スラッグは255文字以内で入力してください"),
  position: z.number(),
});
