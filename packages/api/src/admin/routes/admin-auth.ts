import { Hono } from "hono";
import { Env } from "../../db/client";
import { zValidator } from "@hono/zod-validator";
import { adminLoginSchema, adminMeSchema } from "../schemas/admin-auth";
import { getDbClient } from "../../helpers/dbClient";
import { adminUsers } from "../../db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

export const authRoutes = new Hono<{ Bindings: Env }>()
  // NOTE: /auth/login
  .post("/auth/login", zValidator("json", adminLoginSchema), async (c) => {
    const db = getDbClient(c);
    const { email, password } = c.req.valid("json");
    const adminUser = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);

    if (adminUser === undefined || adminUser.length === 0) {
      return c.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        401
      );
    }

    const isPasswordValid = await compare(password, adminUser[0].encryptedPassword);
    if (!isPasswordValid) {
      return c.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        401
      );
    }

    const token = Buffer.from(
      JSON.stringify({
        userId: adminUser[0].id,
        email: adminUser[0].email,
        name: adminUser[0].name,
        timestamp: new Date().getTime(),
      })
    ).toString("base64");

    setCookie(c, "admin_session", token, {
      httpOnly: true,
      secure: c.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return c.json({
      success: true,
      message: "Login successful",
      data: {
        email: adminUser[0].email,
        name: adminUser[0].name,
      },
    });
  })
  // NOTE: /auth/logout
  .post("/auth/logout", async (c) => {
    deleteCookie(c, "admin_session");
    return c.json({
      success: true,
      message: "Logout successful",
    });
  })
  // NOTE: /auth/me
  .get("/auth/me", zValidator("json", adminMeSchema), async (c) => {
    const sessionToken = getCookie(c, "admin_session");
    if (!sessionToken) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    const decodedToken = Buffer.from(sessionToken, "base64").toString("utf-8");
    const { userId } = JSON.parse(decodedToken);
    const db = getDbClient(c);
    const adminUser = await db
      .select({
        id: adminUsers.id,
        name: adminUsers.name,
        email: adminUsers.email,
        createdAt: adminUsers.createdAt,
        updatedAt: adminUsers.updatedAt,
      })
      .from(adminUsers)
      .where(eq(adminUsers.id, userId))
      .limit(1);
    if (adminUser === undefined || adminUser.length === 0) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    return c.json({
      success: true,
      data: adminUser[0],
    });
  });
