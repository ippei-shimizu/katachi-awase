import { AdminUserRoutes } from "../routes/admin-user";
import { hc } from "hono/client";

const client = hc<AdminUserRoutes>("/api");
export type AdminUserClient = typeof client;

export const createAdminUserClient = (
  baseUrl: string = ""
): AdminUserClient => {
  return hc<AdminUserRoutes>(baseUrl);
};

export type { AdminUserRoutes };
