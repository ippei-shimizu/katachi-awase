import {
  AdminUserResponse,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from "@katachi-awase/shared";
import { adminUserRepository } from "../repositories/admin-user";

const toAdminUserResponse = (dbUser: any): AdminUserResponse => ({
  id: dbUser.id,
  name: dbUser.name,
  email: dbUser.email,
  createdAt: dbUser.created_at,
  updatedAt: dbUser.updated_at,
});

export const adminUserService = {
  async getAll(): Promise<AdminUserResponse[]> {
    const users = await adminUserRepository.findAll();
    return users.map(toAdminUserResponse);
  },

  async getById(id: number): Promise<AdminUserResponse | null> {
    const user = await adminUserRepository.findById(id);
    return user ? toAdminUserResponse(user) : null;
  },

  async create(data: CreateAdminUserRequest): Promise<AdminUserResponse> {
    try {
      const user = await adminUserRepository.create(data);
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
      const user = await adminUserRepository.update(id, data);
      return toAdminUserResponse(user);
    } catch (error) {
      throw new Error("Failed to update an admin user");
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      return await adminUserRepository.delete(id);
    } catch (error) {
      throw new Error("Failed to delete an admin user");
    }
  },
};
