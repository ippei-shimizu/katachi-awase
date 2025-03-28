import { AdminUserResponse } from "./admin-user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AdminUserResponse;
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface MeResponse {
  user: AdminUserResponse;
}

export interface AuthErrorResponse {
  message: string;
}

export interface SessionInfo {
  userId: number;
  timestamp: number;
}

export type AuthResult =
  | LoginResponse
  | LogoutResponse
  | MeResponse
  | AuthErrorResponse;
