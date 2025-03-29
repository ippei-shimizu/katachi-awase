import { z } from "zod";

export const adminLessonCategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  position: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
