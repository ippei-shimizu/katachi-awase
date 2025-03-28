import {
  AdminUserResponse,
  LoginRequest,
  LoginResponse,
} from "@katachi-awase/shared";
import { Env } from "../../db/client";
import { createAuthRepository } from "../repositories/auth";

const toAdminUserResponse = (dbUser: any): AdminUserResponse => ({
  id: dbUser.id,
  name: dbUser.name,
  email: dbUser.email,
  createdAt: dbUser.createdAt,
  updatedAt: dbUser.updatedAt,
});

export function createAuthService(env: Env) {
  const repository = createAuthRepository(env);

  return {
    async login(credentials: LoginRequest): Promise<LoginResponse | null> {
      try {
        const user = await repository.validateCredentials(
          credentials.email,
          credentials.password
        );

        if (!user) {
          return null;
        }

        const token = Buffer.from(
          JSON.stringify({
            userId: user.id,
            email: user.email,
            timestamp: new Date().getTime(),
          })
        ).toString("base64");

        return {
          user: toAdminUserResponse(user),
          token,
        };
      } catch (error) {
        throw new Error("Failed to login");
      }
    },

    async validateSession(token: string): Promise<AdminUserResponse | null> {
      try {
        const payload = JSON.parse(Buffer.from(token, "base64").toString());

        if (!payload.userId) {
          return null;
        }

        const user = await repository.findByEmail(payload.email);

        if (!user) {
          return null;
        }

        return toAdminUserResponse(user);
      } catch (error) {
        throw new Error("Failed to validate session");
      }
    },
  };
}
