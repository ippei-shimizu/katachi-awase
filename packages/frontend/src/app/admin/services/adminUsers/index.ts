import { API_BASE_URL } from "@/app/admin/services";
import { createAdminUserClient } from "@katachi-awase/api/admin/client/admin-user";
import { AdminUserResponse } from "@katachi-awase/shared";

export const adminUserClient = createAdminUserClient(API_BASE_URL);

export async function getAdminUsers(): Promise<AdminUserResponse[]> {
  try {
    const response = await adminUserClient["admin-users"].$get();
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get admin users");
  }

}
