import { NextResponse } from "next/server";
import { cookieOptions, createToken, INVITE_COOKIE, verifyInviteCode } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { code?: string } | null;

  if (!verifyInviteCode(String(body?.code ?? ""))) {
    return NextResponse.json({ error: "That code doesn’t match our invitation." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(INVITE_COOKIE, createToken("invite"), cookieOptions);
  return response;
}
