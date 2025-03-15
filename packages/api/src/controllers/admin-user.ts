import { Context } from "hono";
import { adminUserService } from "../services/admin-user";
import {
  createAdminUserSchema,
  updateAdminUserSchema,
} from "@katachi-awase/shared";
import { zValidator } from "@hono/zod-validator";

export const validateCreateAdminUser = zValidator(
  "json",
  createAdminUserSchema
);
export const validateUpdateAdminUser = zValidator(
  "json",
  updateAdminUserSchema
);

export const adminUserController = {
  async getAll(c: Context) {
    const users = await adminUserService.getAll();
    if (!users) {
      return c.json({ message: "Users not found" }, 404);
    }
    return c.json(users);
  },

  async getById(c: Context) {
    const id = c.req.param("id");
    const user = await adminUserService.getById(Number(id));

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    return c.json(user);
  },

  async create(c: Context) {
    const data = await c.req.json();

    try {
      const user = await adminUserService.create(data);
      return c.json(user, 201);
    } catch (error) {
      return c.json({ message: "Failed to create an admin user" }, 500);
    }
  },

  async update(c: Context) {
    const id = c.req.param("id");
    const data = await c.req.json();

    const user = await adminUserService.update(Number(id), data);

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    return c.json(user);
  },

  async delete(c: Context) {
    const id = c.req.param("id");
    const success = await adminUserService.delete(Number(id));

    if (!success) {
      return c.json({ message: "Failed to delete an admin user" }, 500);
    }

    return c.json({ message: "User deleted" });
  },
};
