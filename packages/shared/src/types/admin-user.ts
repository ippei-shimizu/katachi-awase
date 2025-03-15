export interface AdminUser {
  id: number;
  name: string;
  email: string;
  encryptedPassword: string;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}
