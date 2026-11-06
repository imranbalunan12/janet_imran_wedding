import { NextResponse } from "next/server";
import { isInvited } from "@/lib/auth";
import { createRsvp } from "@/lib/db";
import { parseRsvp } from "@/lib/rsvpInput";

export async function POST(request: Request) {
  if (!(await isInvited())) {
    return NextResponse.json({ error: "Please open the invitation first." }, { status: 401 });
  }

  const parsed = parseRsvp(await request.json().catch(() => null));
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const rsvp = await createRsvp(parsed);
  return NextResponse.json({ ok: true, rsvp });
}
