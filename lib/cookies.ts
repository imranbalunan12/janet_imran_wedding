import { createHmac, timingSafeEqual } from "crypto";

export const INVITE_COOKIE = "ij_invite";
export const ADMIN_COOKIE = "ij_admin";

export type Role = "invite" | "admin";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 60;

export function getInviteCode() {
  return process.env.INVITE_CODE || "FOREVER2027";
}

export function getAdminCode() {
  return process.env.ADMIN_CODE || "IMRANJANET-ADMIN";
}

// Keyed on the codes themselves, so changing a code on Vercel signs everyone out.
function secret() {
  return process.env.SESSION_SECRET || `${getAdminCode()}::${getInviteCode()}`;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createToken(role: Role) {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = `${role}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined, role: Role) {
  if (!token) return false;
  const [tokenRole, expires, signature] = token.split(".");
  if (tokenRole !== role || !expires || !signature) return false;
  if (Number(expires) < Date.now() / 1000) return false;
  const expected = Buffer.from(sign(`${tokenRole}.${expires}`));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
