import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { createRsvp, deleteRsvp, listRsvps, usingLocalStore } from "@/lib/db";
import { parseRsvp } from "@/lib/rsvpInput";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  const rsvps = await listRsvps();
  return NextResponse.json({ rsvps, local: usingLocalStore() });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized();
  const parsed = parseRsvp(await request.json().catch(() => null));
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const rsvp = await createRsvp(parsed);
  return NextResponse.json({ ok: true, rsvp });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return unauthorized();
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }
  await deleteRsvp(id);
  return NextResponse.json({ ok: true });
}
