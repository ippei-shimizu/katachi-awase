import { Hono } from "hono";
import adminUserRoutes from "./routes/admin-user";

export interface Env {
  DATABASE_URL: string;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  return c.text("Hello Hono!!!!!");
});

app.route("/api", adminUserRoutes);

export default app;
