
import { hc } from "hono/client";
import {
  AdminUserResponse,
  AdminUserResult,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from "../types/admin/admin-user";
import { Hono } from "hono";

export type AdminUserRoutes = Hono & {
  "admin-users": {
    $get: {
      query?: Record<string, string>;
      response: AdminUserResponse[];
    };
    $post: {
      json: CreateAdminUserRequest;
      response: AdminUserResult;
    };
    ":id": {
      $get: {
        param: { id: string };
        response: AdminUserResponse;
      };
      $put: {
        param: { id: string };
        json: UpdateAdminUserRequest;
        response: AdminUserResult;
      };
      $delete: {
        param: { id: string };
        response: void;
      };
    };
  };
};

export interface AdminUserClient {
  ["admin-users"]: {
    $get: () => Promise<Response>;
    $post: (args: { json: CreateAdminUserRequest }) => Promise<Response>;
    [":id"]: {
      $get: (args: { param: { id: string } }) => Promise<Response>;
      $put: (args: { param: { id: string }; json: UpdateAdminUserRequest }) => Promise<Response>;
      $delete: (args: { param: { id: string } }) => Promise<Response>;
    };
  };
}


const client = hc<AdminUserRoutes>("/api");

export const createAdminUserClient = (
  baseUrl: string = ""
): AdminUserClient => {
  return hc<AdminUserRoutes>(baseUrl) as AdminUserClient;
};
