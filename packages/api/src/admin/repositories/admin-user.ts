import { eq } from "drizzle-orm";
import { adminUsers, AdminUser } from "../../db/schema";
import {
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from "@katachi-awase/shared";
import { hash } from "bcryptjs";
import { createClient, Env } from "../../db/client";

export function createAdminUserRepository(env: Env) {
  const db = createClient(env);

  return {
    async findAll(): Promise<AdminUser[]> {
      return db.select().from(adminUsers).orderBy(adminUsers.id);
    },

    async findById(id: number): Promise<AdminUser | null> {
      const results = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.id, id))
        .limit(1);

      return results[0] || null;
    },

    async create(data: CreateAdminUserRequest): Promise<AdminUser> {
      const temporaryPassword = data.password;
      const encryptedPassword = await hash(temporaryPassword, 10);

      const [newUser] = await db
        .insert(adminUsers)
        .values({
          name: data.name,
          email: data.email,
          encryptedPassword: encryptedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return newUser;
    },

    async update(
      id: number,
      data: UpdateAdminUserRequest
    ): Promise<AdminUser | null> {
      try {
        const [updatedUser] = await db
          .update(adminUsers)
          .set({
            name: data.name,
            email: data.email,
            updatedAt: new Date(),
          })
          .where(eq(adminUsers.id, id))
          .returning();

        return updatedUser || null;
      } catch (error) {
        console.error("Error updating user:", error);
        return null;
      }
    },

    async delete(id: number): Promise<boolean> {
      try {
        const result = await db
          .delete(adminUsers)
          .where(eq(adminUsers.id, id))
          .returning({ id: adminUsers.id });

        return result.length > 0;
      } catch (error) {
        console.error("Error deleting user:", error);
        return false;
      }
    },
  };
}
