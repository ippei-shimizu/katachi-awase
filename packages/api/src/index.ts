import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env } from "./db/client";
import { adminUserRoutes } from "./admin/routes/admin-user";
import { authRoutes } from "./admin/routes/admin-auth";
import { adminLessonCategory } from "./admin/routes/admin-lesson-category";
import { adminLessonSkills } from "./admin/routes/admin-lesson-skills";

const app = new Hono<{ Bindings: Env }>()
  .use(
    "/*",
    cors({
      origin: (origin, c) => {
        return c.env.APP_FRONTEND_URL || "http://localhost:3000";
      },
      allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
      maxAge: 864_000,
      credentials: true,
    })
  )
  // NOTE: admin routes
  .route("/api/admin/", adminUserRoutes)
  .route("/api/admin/", authRoutes)
  .route("/api/admin/", adminLessonCategory)
  .route("/api/admin/", adminLessonSkills);

export default app;
export type AppType = typeof app;
