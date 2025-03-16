import { Hono } from "hono";
import {
  adminUserController,
  validateCreateAdminUser,
  validateUpdateAdminUser,
} from "../controllers/admin-user";

export type AdminUserRoutes = typeof adminUserRoutes;

const adminUserRoutes = new Hono()

  .get("/admin-users", adminUserController.getAll)
  .get("/admin-users/:id", adminUserController.getById)
  .post("/admin-users", validateCreateAdminUser, adminUserController.create)
  .put("/admin-users/:id", validateUpdateAdminUser, adminUserController.update)
  .delete("/admin-users/:id", adminUserController.delete);

export default adminUserRoutes;
