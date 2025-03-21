import { API_BASE_URL } from "@/app/admin/services";
import {
  AdminUserClient,
  AdminUserResponse,
  AdminUserResult,
  createAdminUserClient,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from "@katachi-awase/shared";

export const adminUserClient: AdminUserClient = createAdminUserClient(API_BASE_URL);

export async function getAdminUsers(): Promise<AdminUserResponse[]> {
  try {
    const response = await adminUserClient["admin-users"].$get();
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get admin users");
  }
}

export async function getAdminUser(id: string): Promise<AdminUserResponse> {
  const response = await adminUserClient["admin-users"][":id"].$get({ param: { id } });
  const data = await response.json();
  if ("message" in data) {
    throw new Error(data.message);
  }
  return data;
}

export async function createAdminUser(data: CreateAdminUserRequest): Promise<AdminUserResult> {
  try {
    const response = await adminUserClient["admin-users"].$post({ json: data });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create an admin user");
  }
}

export async function updateAdminUser(id: number, data: UpdateAdminUserRequest): Promise<AdminUserResult> {
  try {
    const response = await adminUserClient["admin-users"][":id"].$put({
      param: { id: id.toString() },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      json: data,
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update an admin user");
  }
}

export async function deleteAdminUser(id: number): Promise<boolean> {
  try {
    const response = await adminUserClient["admin-users"][":id"].$delete({ param: { id: id.toString() } });
    return response.status === 200;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete an admin user");
  }
}
