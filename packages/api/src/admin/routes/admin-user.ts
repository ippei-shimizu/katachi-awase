import { Hono } from "hono";
import { Env } from "../../db/client";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { adminUsers } from "../../db/schema";
import { adminUserSchema, createAdminUserSchema, updateAdminUserSchema } from "../schemas/admin-users";
import { getDbClient } from "../../helpers/dbClient";
import bcrypt from "bcryptjs";

export const adminUserRoutes = new Hono<{ Bindings: Env }>()
  // NOTE: GET /admin-users
  .get("/admin-users", async (c) => {
    const db = getDbClient(c);
    const allAdminUsers = await db.select().from(adminUsers);

    return c.json({
      success: true,
      data: allAdminUsers,
    });
  })
  // NOTE: GET /admin-users/:id
  .get("/admin-users/:id", async (c) => {
    const db = getDbClient(c);
    // prettier-ignore
    const adminUser = await db.select().from(adminUsers).where(eq(adminUsers.id, Number(c.req.param("id"))));
    if (adminUser === undefined) {
      return c.json(
        {
          error: "not found",
        },
        404
      );
    }
    return c.json({
      success: true,
      data: adminUser,
    });
  })
  // NOTE: POST /admin-users
  .post("/admin-users", zValidator("json", createAdminUserSchema), async (c) => {
    const adminUserData = c.req.valid("json");
    const db = getDbClient(c);

    const encryptedPassword = await bcrypt.hash(adminUserData.password, 10);
    const newAdminUser = await db.insert(adminUsers).values({
      name: adminUserData.name,
      email: adminUserData.email,
      encryptedPassword,
    });

    return c.json({
      success: true,
      data: newAdminUser,
    });
  })
  // NOTE: PUT /admin-users/:id
  .put("/admin-users/:id", zValidator("json", updateAdminUserSchema), async (c) => {
    const adminUserData = c.req.valid("json");
    const db = getDbClient(c);
    // prettier-ignore
    const updatedAdminUser = await db.update(adminUsers).set(adminUserData).where(eq(adminUsers.id, Number(c.req.param("id")))).returning();

    if (updatedAdminUser === undefined) {
      return c.json(
        {
          error: "not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: updatedAdminUser,
    });
  })
  // NOTE: DELETE /admin-users/:id
  .delete("/admin-users/:id", async (c) => {
    const db = getDbClient(c);
    const deletedAdminUser = await db
      .delete(adminUsers)
      .where(eq(adminUsers.id, Number(c.req.param("id"))))
      .returning();
    if (deletedAdminUser === undefined) {
      return c.json(
        {
          error: "not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: deletedAdminUser,
    });
  });
