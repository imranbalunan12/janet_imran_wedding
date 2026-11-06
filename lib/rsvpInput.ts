import type { RsvpInput } from "@/lib/db";

function text(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export function parseRsvp(body: Record<string, unknown> | null): RsvpInput | { error: string } {
  const name = text(body?.name, 120);
  if (!name) return { error: "Please tell us your name." };
  const guests = Math.min(10, Math.max(1, Math.floor(Number(body?.guests) || 1)));
  return {
    name,
    email: text(body?.email, 160),
    address: text(body?.address, 240),
    attending: body?.attending === "no" ? "no" : "yes",
    guests,
    meal: text(body?.meal, 60),
    message: text(body?.message, 1000),
  };
}
