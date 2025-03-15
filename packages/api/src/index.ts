import { Hono } from "hono";
import adminUserRoutes from "./routes/admin-user";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!!!!!");
});

app.route("/api", adminUserRoutes);

export default app;
