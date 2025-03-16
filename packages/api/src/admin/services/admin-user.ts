import {
  AdminUserResponse,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from "@katachi-awase/shared";
import { createAdminUserRepository } from "../repositories/admin-user";
import { Env } from "../..";


const toAdminUserResponse = (dbUser: any): AdminUserResponse => ({
  id: dbUser.id,
  name: dbUser.name,
  email: dbUser.email,
  createdAt: dbUser.created_at,
  updatedAt: dbUser.updated_at,
});

export function createAdminUserService(env: Env) {
  const repository = createAdminUserRepository(env);

  return {
    async getAll(): Promise<AdminUserResponse[]> {
      const users = await repository.findAll();
      return users.map(toAdminUserResponse);
    },

    async getById(id: number): Promise<AdminUserResponse | null> {
      const user = await repository.findById(id);
      return user ? toAdminUserResponse(user) : null;
    },

    async create(data: CreateAdminUserRequest): Promise<AdminUserResponse> {
      try {
        const user = await repository.create(data);
        return toAdminUserResponse(user);
      } catch (error) {
        throw new Error("Failed to create an admin user");
      }
    },

    async update(
      id: number,
      data: UpdateAdminUserRequest
    ): Promise<AdminUserResponse> {
      try {
        const user = await repository.update(id, data);
        if (!user) {
          throw new Error("User not found");
        }
        return toAdminUserResponse(user);
      } catch (error) {
        throw new Error("Failed to update an admin user");
      }
    },

    async delete(id: number): Promise<boolean> {
      try {
        return await repository.delete(id);
      } catch (error) {
        throw new Error("Failed to delete an admin user");
      }
    },
  };
}
