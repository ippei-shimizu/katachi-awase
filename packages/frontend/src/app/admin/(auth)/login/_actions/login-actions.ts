"use server";

import { apiClient } from "@/lib/client";
import { AdminLoginRequest } from "@api/admin/types/admin-auth";
import { cookies } from "next/headers";

export async function loginAction(data: AdminLoginRequest) {
  const email = data.email;
  const password = data.password;
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Invalid form data");
  }

  const response = await apiClient.api.admin.auth.login.$post({
    json: {
      email: email,
      password: password,
    },
  });

  const responseCookies = response.headers.getSetCookie();
  if (responseCookies?.length) {
    const cookieStore = await cookies();

    for (const cookie of responseCookies) {
      const [name, ...rest] = cookie.split("=");
      const value = rest.join("=").split(";")[0];

      if (name === "admin_session") {
        cookieStore.set(name, value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    }
  }

  return response.json();
}

// import { API_BASE_URL } from "@/app/admin/services";
// import { cookies } from "next/headers";

// const authClient = createAuthClient(API_BASE_URL);

// type LoginResult = { success: true; user: MeResponse } | { success: false; message: string };

// export async function loginAction(credentials: LoginRequest): Promise<LoginResult> {
//   try {
//     const response = await authClient["admin/auth"]["login"].$post({ json: credentials });
//     const data = await response.json();

//     if (!response.ok) {
//       return {
//         success: false,
//         message: data.message,
//       };
//     }

//     const responseCookies = response.headers.getSetCookie();
//     if (responseCookies?.length) {
//       const cookieStore = await cookies();

//       for (const cookie of responseCookies) {
//         const [name, ...rest] = cookie.split("=");
//         const value = rest.join("=").split(";")[0];

//         if (name === "admin_session") {
//           cookieStore.set(name, value, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             path: "/",
//             maxAge: 60 * 60 * 24 * 7,
//           });
//         }
//       }
//     }

//     return {
//       success: true,
//       user: data,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       message: "Failed to login",
//     };
//   }
// }
