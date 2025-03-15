export interface AdminUser {
  id: string;
  name: string;
  email: string;
  encryptedPassword: string;
  createdAt: Date;
  updatedAt: Date;
}
