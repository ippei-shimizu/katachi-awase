import {
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from "@katachi-awase/shared";
import { prisma } from "../utils/prisma-client";
import { hash } from "bcryptjs";

export const adminUserRepository = {
  async findAll() {
    return prisma.adminUser.findMany({
      orderBy: {
        id: "asc",
      },
    });
  },

  async findById(id: number) {
    return prisma.adminUser.findUnique({
      where: {
        id,
      },
    });
  },

  async create(data: CreateAdminUserRequest) {
    const temporaryPassword = Math.random().toString(36).slice(-8);
    const encryptedPassword = await hash(temporaryPassword, 10);

    return prisma.adminUser.create({
      data: {
        name: data.name,
        email: data.email,
        encrypted_password: encryptedPassword,
      },
    });
  },

  async update(id: number, data: UpdateAdminUserRequest) {
    await prisma.adminUser.update({
      where: {
        id,
      },
    });
  },

  async delete(id: number) {
    await prisma.adminUser.delete({
      where: {
        id,
      },
    });
    return true;
  },
};
