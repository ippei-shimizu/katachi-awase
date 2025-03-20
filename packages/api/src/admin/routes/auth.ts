import { Hono } from "hono";
import { authController } from "../controllers/auth";

export type AuthRoutes = typeof authRoutes;

const authRoutes = new Hono()

  .post("/admin/auth/login", authController.login)
  .post("/admin/auth/logout", authController.logout)
  .get("/admin/auth/me", authController.me);

export default authRoutes;
