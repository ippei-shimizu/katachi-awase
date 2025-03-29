import { apiClient } from "@/lib/client";
import { AdminUserCreate, AdminUserUpdate } from "@api/admin/types/admin-user";

export const getAdminUsers = async () => {
  const response = await apiClient.api.admin["admin-users"].$get({
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getAdminUser = async (id: number) => {
  const response = await apiClient.api.admin["admin-users"][":id"].$get({
    param: { id: String(id) },
  });
  return await response.json();
};

export const createAdminUser = async (data: AdminUserCreate) => {
  const response = await apiClient.api.admin["admin-users"].$post({
    json: data,
  });
  return await response.json();
};

export const updateAdminUser = async (id: number, data: AdminUserUpdate) => {
  const response = await apiClient.api.admin["admin-users"][":id"].$put({
    param: { id: String(id) },
    json: data,
  });
  return await response.json();
};

export const deleteAdminUser = async (id: number) => {
  const response = await apiClient.api.admin["admin-users"][":id"].$delete({
    param: { id: String(id) },
  });
  return await response.json();
};
