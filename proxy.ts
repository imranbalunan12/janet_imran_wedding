import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, INVITE_COOKIE, verifyToken } from "@/lib/cookies";

// Optimistic gate only; every API route re-checks its own cookie.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/invitation")) {
    if (!verifyToken(request.cookies.get(INVITE_COOKIE)?.value, "invite")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login")) {
    if (!verifyToken(request.cookies.get(ADMIN_COOKIE)?.value, "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/invitation/:path*", "/api/admin/:path*"],
};
