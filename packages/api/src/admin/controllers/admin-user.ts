import { Context } from "hono";
import { createAdminUserService } from "../services/admin-user";
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
    const service = createAdminUserService(c.env);
    const users = await service.getAll();

    if (!users) {
      return c.json({}, 200);
    }
    return c.json(users);
  },

  async getById(c: Context) {
    const service = createAdminUserService(c.env);
    const id = c.req.param("id");
    const user = await service.getById(Number(id));

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    return c.json(user);
  },

  async create(c: Context) {
    const service = createAdminUserService(c.env);
    const data = await c.req.json();

    try {
      const user = await service.create(data);
      return c.json(user, 201);
    } catch (error) {
      return c.json({ message: "Failed to create an admin user" }, 500);
    }
  },

  async update(c: Context) {
    const service = createAdminUserService(c.env);
    const id = c.req.param("id");
    const data = await c.req.json();

    try {
      const user = await service.update(Number(id), data);
      if (!user) {
        return c.json({ message: "User not found" }, 404);
      }
      return c.json(user);
    } catch (error) {
      return c.json({ message: "Failed to update an admin user" }, 500);
    }
  },

  async delete(c: Context) {
    const service = createAdminUserService(c.env);
    const id = c.req.param("id");

    try {
      const success = await service.delete(Number(id));
      if (!success) {
        return c.json({ message: "User not found or failed to delete" }, 404);
      }
      return c.json({ message: "User deleted" });
    } catch (error) {
      return c.json({ message: "Failed to delete an admin user" }, 500);
    }
  },
};
