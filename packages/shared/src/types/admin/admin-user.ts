export interface AdminUser {
  id: number;
  name: string;
  email: string;
  encryptedPassword: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminUserRequest {
  name: string;
  email: string;
}

export interface UpdateAdminUserRequest {
  name: string;
  email: string;
}

export interface AdminUserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

