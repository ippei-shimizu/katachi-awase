import { Hono } from "hono";
import { Env } from "../../db/client";
import { getDbClient } from "../../helpers/dbClient";
import { lessonCategories } from "../../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createAdminLessonCategorySchema, updateAdminLessonCategorySchema } from "../schemas/admin-lesson-category";

export const adminLessonCategory = new Hono<{ Bindings: Env }>()
  // NOTE: GET /admin-lesson-categories
  .get("/admin-lesson-categories", async (c) => {
    const db = getDbClient(c);
    const allLessonCategories = await db.select().from(lessonCategories);

    return c.json({
      success: true,
      data: allLessonCategories,
    });
  })
  // NOTE: GET /admin-lesson-categories/:id
  .get("/admin-lesson-categories/:id", async (c) => {
    const db = getDbClient(c);
    const lessonCategory = await db
      .select()
      .from(lessonCategories)
      .where(eq(lessonCategories.id, Number(c.req.param("id"))));
    if (lessonCategory === undefined) {
      return c.json(
        {
          error: "not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: lessonCategory,
    });
  })
  // NOTE: POST /admin-lesson-categories
  .post("/admin-lesson-categories", zValidator("json", createAdminLessonCategorySchema), async (c) => {
    const lessonCategoryData = c.req.valid("json");
    const db = getDbClient(c);

    const newLessonCategory = await db.insert(lessonCategories).values({
      name: lessonCategoryData.name,
      slug: lessonCategoryData.slug,
      position: lessonCategoryData.position,
    });

    return c.json({
      success: true,
      data: newLessonCategory,
    });
  })
  // NOTE: PUT /admin-lesson-categories/:id
  .put("/admin-lesson-categories/:id", zValidator("json", updateAdminLessonCategorySchema), async (c) => {
    const lessonCategoryData = c.req.valid("json");
    const db = getDbClient(c);
    const updatedLessonCategory = await db
      .update(lessonCategories)
      .set(lessonCategoryData)
      .where(eq(lessonCategories.id, Number(c.req.param("id"))))
      .returning();
    if (updatedLessonCategory === undefined) {
      return c.json(
        {
          error: "not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: updatedLessonCategory,
    });
  })
  // NOTE: DELETE /admin-lesson-categories/:id
  .delete("/admin-lesson-categories/:id", async (c) => {
    const db = getDbClient(c);
    const deletedLessonCategory = await db
      .delete(lessonCategories)
      .where(eq(lessonCategories.id, Number(c.req.param("id"))))
      .returning();
    if (deletedLessonCategory === undefined) {
      return c.json(
        {
          error: "not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: deletedLessonCategory,
    });
  });
