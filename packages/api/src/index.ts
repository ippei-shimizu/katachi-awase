import { Hono } from "hono";
import { cors } from "hono/cors";
import adminUserRoutes from "./admin/routes/admin-user";
import authRoutes from "./admin/routes/auth";

export interface Env {
  DATABASE_URL: string;
  APP_FRONTEND_URL: string;
}

const app = new Hono<{ Bindings: Env }>();

app.use("/*", async (c, next) => {
  const origin = c.env.APP_FRONTEND_URL;

  const corsMiddleware = cors({
    origin: origin,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  });

  return corsMiddleware(c, next);
});

app.get("/", (c) => {
  return c.text("Hello Hono!!!!!");
});

app.route("/", adminUserRoutes);
app.route("/", authRoutes);

export default app;
