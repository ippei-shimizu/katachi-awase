import { Hono } from "hono";
import {
  AuthErrorResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  MeResponse,
} from "../types/admin/auth";
import { hc } from "hono/client";

export type AuthRoutes = Hono & {
  "admin/auth": {
    login: {
      $post: {
        json: {
          json: LoginRequest;
          response: LoginResponse;
        };
      };
      logout: {
        $post: {
          response: LogoutResponse;
        };
      };
      me: {
        $get: {
          response: MeResponse | AuthErrorResponse;
        };
      };
    };
  };
};

export interface AuthClient {
  ["admin/auth"]: {
    login: {
      $post: (args: { json: LoginRequest }) => Promise<Response>;
    };
    logout: {
      $post: () => Promise<Response>;
    };
    me: {
      $get: () => Promise<Response>;
    };
  };
}

export const createAuthClient = (baseUrl: string = ""): AuthClient => {
  return hc<AuthRoutes>(baseUrl) as AuthClient;
};
