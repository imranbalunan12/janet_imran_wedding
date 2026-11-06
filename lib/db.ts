import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type Rsvp = {
  id: string;
  name: string;
  email: string;
  address: string;
  attending: "yes" | "no";
  guests: number;
  meal: string;
  message: string;
  createdAt: string;
};

export type RsvpInput = Omit<Rsvp, "id" | "createdAt"> & { createdAt?: string };

const localFile = path.join(process.cwd(), "data", "rsvps.json");

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function sqlClient() {
  return neon(process.env.DATABASE_URL as string);
}

let tableReady: Promise<unknown> | null = null;

function ensureTable() {
  tableReady ??= sqlClient()`
    CREATE TABLE IF NOT EXISTS rsvps (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      address TEXT,
      attending TEXT NOT NULL,
      guests INTEGER NOT NULL DEFAULT 1,
      meal TEXT,
      message TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `.catch((error) => {
    tableReady = null;
    throw error;
  });
  return tableReady;
}

async function readLocal(): Promise<Rsvp[]> {
  try {
    const raw = await fs.readFile(localFile, "utf8");
    return JSON.parse(raw) as Rsvp[];
  } catch {
    return [];
  }
}

async function writeLocal(rows: Rsvp[]) {
  await fs.mkdir(path.dirname(localFile), { recursive: true });
  await fs.writeFile(localFile, JSON.stringify(rows, null, 2));
}

function mapRow(row: Record<string, unknown>): Rsvp {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    address: String(row.address ?? ""),
    attending: row.attending === "no" ? "no" : "yes",
    guests: Number(row.guests ?? 1),
    meal: String(row.meal ?? ""),
    message: String(row.message ?? ""),
    createdAt: new Date(String(row.created_at ?? row.createdAt)).toISOString(),
  };
}

export async function listRsvps(): Promise<Rsvp[]> {
  if (!hasDatabase()) {
    const rows = await readLocal();
    return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  await ensureTable();
  const sql = sqlClient();
  const rows = await sql`SELECT * FROM rsvps ORDER BY created_at DESC`;
  return (rows as Record<string, unknown>[]).map(mapRow);
}

export async function createRsvp(input: RsvpInput): Promise<Rsvp> {
  const rsvp: Rsvp = {
    id: randomUUID(),
    name: input.name.trim(),
    email: input.email.trim(),
    address: input.address.trim(),
    attending: input.attending,
    guests: Math.max(1, Number(input.guests) || 1),
    meal: input.meal.trim(),
    message: input.message.trim(),
    createdAt: input.createdAt ?? new Date().toISOString(),
  };

  if (!hasDatabase()) {
    const rows = await readLocal();
    rows.push(rsvp);
    await writeLocal(rows);
    return rsvp;
  }

  await ensureTable();
  const sql = sqlClient();
  await sql`
    INSERT INTO rsvps (id, name, email, address, attending, guests, meal, message, created_at)
    VALUES (
      ${rsvp.id},
      ${rsvp.name},
      ${rsvp.email},
      ${rsvp.address},
      ${rsvp.attending},
      ${rsvp.guests},
      ${rsvp.meal},
      ${rsvp.message},
      ${rsvp.createdAt}
    )
  `;
  return rsvp;
}

export async function deleteRsvp(id: string) {
  if (!hasDatabase()) {
    const rows = await readLocal();
    await writeLocal(rows.filter((row) => row.id !== id));
    return;
  }
  await ensureTable();
  const sql = sqlClient();
  await sql`DELETE FROM rsvps WHERE id = ${id}`;
}

export function usingLocalStore() {
  return !hasDatabase();
}
