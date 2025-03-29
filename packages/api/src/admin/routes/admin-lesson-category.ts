import { Hono } from "hono";
import { Env } from "../../db/client";
import { getDbClient } from "../../helpers/dbClient";
import { lessonCategories } from "../../db/schema";

export const adminLessonCategory = new Hono<{ Bindings: Env }>()
  // NOTE: GET /admin-lesson-categories
  .get("/admin-lesson-categories", async (c) => {
    const db = getDbClient(c);
    const allLessonCategories = await db.select().from(lessonCategories);
    return c.json({
      success: true,
      data: allLessonCategories,
    });
  });
