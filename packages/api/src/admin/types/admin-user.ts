export type AdminUser = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminUserCreate = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  encryptedPassword: string;
};

export type AdminUserUpdate = {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};
