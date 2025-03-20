import { zValidator } from "@hono/zod-validator";
import { loginRequestSchema } from "@katachi-awase/shared";
import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { createAuthService } from "../services/auth";

export const validateLogin = zValidator("json", loginRequestSchema);

export const authController = {
  async login(c: Context) {
    const service = createAuthService(c.env);
    const { email, password } = await c.req.json();

    const result = await service.login({ email, password });

    if (!result) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    setCookie(c, "admin_session", result.token, {
      httpOnly: true,
      secure: c.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return c.json(result.user);
  },

  async logout(c: Context) {
    setCookie(c, "admin_session", "", {
      httpOnly: true,
      secure: c.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return c.json({ message: "Logged out" });
  },

  async me(c: Context) {
    const sessionToken = getCookie(c, "admin_session");

    if (!sessionToken) {
      return c.json({ message: "Not logged in" }, 401);
    }

    const service = createAuthService(c.env);
    const user = await service.validateSession(sessionToken);

    if (!user) {
      setCookie(c, "admin_session", "", {
        httpOnly: true,
        secure: c.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });
      return c.json({ message: "Invalid session" }, 401);
    }

    return c.json(user);
  },
};
