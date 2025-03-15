import { NextRequest, NextResponse } from "next/server";

function authenticate(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const encodedCredentials = authHeader.split(" ")[1];
    const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("utf-8");
    const [username, password] = decodedCredentials.split(":");

    const validUsername = process.env.NEXT_BASIC_AUTH_ADMIN_USER;
    const validPassword = process.env.NEXT_BASIC_AUTH_ADMIN_PASSWORD;

    return username === validUsername && password === validPassword;
  }

  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (authenticate(req)) {
      return NextResponse.next();
    }

    const response = new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Access to admin area"',
      },
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
