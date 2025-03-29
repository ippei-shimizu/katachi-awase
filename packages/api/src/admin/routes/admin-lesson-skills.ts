import { Hono } from "hono";
import { Env } from "../../db/client";
import { getDbClient } from "../../helpers/dbClient";
import { lessonSkills } from "../../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createAdminLessonSkillSchema, updateAdminLessonSkillSchema } from "../schemas/admin-lesson-skill";

export const adminLessonSkills = new Hono<{ Bindings: Env }>()
  // NOTE: GET /admin-lesson-skills
  .get("/admin-lesson-skills", async (c) => {
    const db = getDbClient(c);
    const allLessonSkills = (await db.select().from(lessonSkills)).sort((a, b) => a.position - b.position);

    return c.json({
      success: true,
      data: allLessonSkills,
    });
  })
  // NOTE: GET /admin-lesson-skills/:id
  .get("/admin-lesson-skills/:id", async (c) => {
    const db = getDbClient(c);
    const lessonSkill = await db
      .select()
      .from(lessonSkills)
      .where(eq(lessonSkills.id, Number(c.req.param("id"))));
    if (lessonSkill === undefined) {
      return c.json(
        {
          error: "not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: lessonSkill,
    });
  })
  // NOTE: POST /admin-lesson-skills
  .post("/admin-lesson-skills", zValidator("json", createAdminLessonSkillSchema), async (c) => {
    const lessonSkillData = c.req.valid("json");
    const db = getDbClient(c);

    const newLessonSkill = await db.insert(lessonSkills).values({
      name: lessonSkillData.name,
      slug: lessonSkillData.slug,
      position: lessonSkillData.position,
    });

    return c.json({
      success: true,
      data: newLessonSkill,
    });
  })
  // NOTE: PUT /admin-lesson-skills/:id
  .put("/admin-lesson-skills/:id", zValidator("json", updateAdminLessonSkillSchema), async (c) => {
    const lessonSkillData = c.req.valid("json");
    const db = getDbClient(c);

    const updatedLessonSkill = await db
      .update(lessonSkills)
      .set(lessonSkillData)
      .where(eq(lessonSkills.id, Number(c.req.param("id"))))
      .returning();

    if (updatedLessonSkill === undefined) {
      return c.json(
        {
          error: "not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: updatedLessonSkill,
    });
  })
  // NOTE: DELETE /admin-lesson-skills/:id
  .delete("/admin-lesson-skills/:id", async (c) => {
    const db = getDbClient(c);
    const deletedLessonSkill = await db
      .delete(lessonSkills)
      .where(eq(lessonSkills.id, Number(c.req.param("id"))))
      .returning();

    if (deletedLessonSkill === undefined) {
      return c.json(
        {
          error: "not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: deletedLessonSkill,
    });
  });
