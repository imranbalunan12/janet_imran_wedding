import { NextResponse } from "next/server";
import { ADMIN_COOKIE, cookieOptions, createToken, verifyAdminCode } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { code?: string } | null;

  if (!verifyAdminCode(String(body?.code ?? ""))) {
    return NextResponse.json({ error: "Incorrect admin code." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createToken("admin"), cookieOptions);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
