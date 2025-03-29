import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env } from "./db/client";
import { adminUserRoutes } from "./admin/routes/admin-user";
import { authRoutes } from "./admin/routes/admin-auth";

const app = new Hono<{ Bindings: Env }>()
  .use(
    "/*",
    cors({
      origin: process.env.APP_FRONTEND_URL || "http://localhost:3000",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      exposeHeaders: ["Content-Type"],
      maxAge: 864_000,
      credentials: true,
    })
  )
  .route("/api/admin/", adminUserRoutes)
  .route("/api/admin/", authRoutes);

export default app;
export type AppType = typeof app;
