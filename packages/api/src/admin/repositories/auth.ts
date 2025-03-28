import { eq } from "drizzle-orm";
import { createClient, Env } from "../../db/client";
import { AdminUser, adminUsers } from "../../db/schema";
import { compare } from "bcryptjs";

export function createAuthRepository(env: Env) {
  const db = createClient(env);

  return {
    async findByEmail(email: string): Promise<AdminUser | null> {
      const results = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.email, email))
        .limit(1);

      return results[0] || null;
    },

    async validateCredentials(email: string, password: string) {
      const user = await this.findByEmail(email);

      if (!user) {
        return null;
      }

      const isPasswordValid = await compare(password, user.encryptedPassword);

      if (!isPasswordValid) {
        return null;
      }

      return user;
    },
  };
}
