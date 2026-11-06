import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import {
  ADMIN_COOKIE,
  INVITE_COOKIE,
  cookieOptions,
  createToken,
  getAdminCode,
  getInviteCode,
  verifyToken,
} from "@/lib/cookies";

export { ADMIN_COOKIE, INVITE_COOKIE, cookieOptions, createToken };

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyInviteCode(code: string) {
  return safeEqual(code.trim().toUpperCase(), getInviteCode().trim().toUpperCase());
}

export function verifyAdminCode(code: string) {
  return safeEqual(code.trim(), getAdminCode());
}

export async function isInvited() {
  const jar = await cookies();
  return verifyToken(jar.get(INVITE_COOKIE)?.value, "invite");
}

export async function isAdmin() {
  const jar = await cookies();
  return verifyToken(jar.get(ADMIN_COOKIE)?.value, "admin");
}
