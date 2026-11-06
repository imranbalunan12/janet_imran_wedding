"use client";

import { FormEvent, useState } from "react";
import type { Rsvp } from "@/lib/db";
import { wedding } from "@/lib/wedding";

// Guests reply from the Philippines, so show their local time on any device.
function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function AdminView({
  unlocked,
  initialRsvps,
  local,
}: {
  unlocked: boolean;
  initialRsvps: Rsvp[];
  local: boolean;
}) {
  const [authed, setAuthed] = useState(unlocked);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [rsvps, setRsvps] = useState<Rsvp[]>(initialRsvps);
  const [query, setQuery] = useState("");

  async function load() {
    const response = await fetch("/api/admin/rsvps");
    if (response.status === 401) {
      setAuthed(false);
      return;
    }
    if (!response.ok) {
      setError("Could not load RSVPs. Please refresh.");
      return;
    }
    const data = await response.json();
    setRsvps(data.rsvps ?? []);
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Incorrect code.");
      return;
    }
    setCode("");
    setAuthed(true);
    load();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setRsvps([]);
    setAuthed(false);
  }

  async function remove(rsvp: Rsvp) {
    if (!confirm(`Remove ${rsvp.name} from the guest list?`)) return;
    const response = await fetch(`/api/admin/rsvps?id=${encodeURIComponent(rsvp.id)}`, { method: "DELETE" });
    if (!response.ok) setError("Could not delete that guest.");
    load();
  }

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formElement = event.currentTarget;
    const response = await fetch("/api/admin/rsvps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(formElement))),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Could not add that guest.");
      return;
    }
    formElement.reset();
    load();
  }

  function exportCsv() {
    const header = ["Name", "Email", "Address", "Attending", "Guests", "Meal", "Note", "Submitted"];
    const lines = rsvps.map((r) =>
      [r.name, r.email, r.address, r.attending, r.guests, r.meal, r.message, formatDate(r.createdAt)]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "rsvps.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  if (!authed) {
    return (
      <main className="paper flex min-h-screen items-center justify-center px-4">
        <form onSubmit={login} className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-lg">
          <p className="text-xs tracking-[0.3em] text-sage uppercase">Private</p>
          <h1 className="font-serif mt-2 text-4xl">Admin</h1>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="password"
            autoComplete="current-password"
            className="mt-8 w-full border-0 border-b border-[#d9d0bf] py-3 text-center tracking-[0.18em] outline-none"
            placeholder="ADMIN CODE"
          />
          {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
          <button className="mt-8 rounded-full bg-[#b08978] px-8 py-2 text-sm tracking-[0.16em] text-white uppercase">
            Enter
          </button>
        </form>
      </main>
    );
  }

  const attending = rsvps.filter((r) => r.attending === "yes");
  const needle = query.trim().toLowerCase();
  const shown = needle
    ? rsvps.filter((r) =>
        [r.name, r.email, r.address, r.meal, r.message].some((v) => v.toLowerCase().includes(needle)),
      )
    : rsvps;
  const heads = attending.reduce((sum, r) => sum + r.guests, 0);

  return (
    <main className="paper min-h-screen px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-sage uppercase">RSVP desk</p>
            <h1 className="font-serif text-4xl">Guest list</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-mute">
              {attending.length} accepting · {heads} seats · {rsvps.length - attending.length} declining ·{" "}
              {rsvps.length} total
            </span>
            <button onClick={exportCsv} className="rounded-full border border-[#d9c48a] px-4 py-1.5">
              Export CSV
            </button>
            <button onClick={logout} className="rounded-full px-4 py-1.5 text-mute hover:text-ink">
              Sign out
            </button>
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        {local ? (
          <p className="mt-4 rounded-xl bg-petal px-4 py-3 text-sm text-ink">
            Using a local file store. Add a Neon <code>DATABASE_URL</code> on Vercel so RSVPs persist in production.
          </p>
        ) : null}

        <form onSubmit={add} className="mt-8 grid gap-3 rounded-[1.5rem] bg-white p-6 md:grid-cols-4">
          <input name="name" required placeholder="Name" className="border-b border-[#ece4d3] py-2 outline-none" />
          <input name="email" placeholder="Email" className="border-b border-[#ece4d3] py-2 outline-none" />
          <input name="address" placeholder="Address" className="border-b border-[#ece4d3] py-2 outline-none" />
          <select name="attending" className="border-b border-[#ece4d3] py-2 outline-none">
            <option value="yes">Attending</option>
            <option value="no">Not attending</option>
          </select>
          <input name="guests" type="number" min={1} max={10} defaultValue={1} aria-label="Guests" className="border-b border-[#ece4d3] py-2 outline-none" />
          <select name="meal" className="border-b border-[#ece4d3] py-2 outline-none">
            {wedding.mealOptions.map((meal) => (
              <option key={meal}>{meal}</option>
            ))}
          </select>
          <input name="message" placeholder="Note" className="border-b border-[#ece4d3] py-2 outline-none md:col-span-2" />
          <button className="rounded-full bg-[#b08978] px-5 py-2 text-sm text-white md:col-span-4">Add guest</button>
        </form>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guests…"
          className="mt-8 w-full rounded-full border border-[#ece4d3] bg-white px-5 py-2.5 text-sm outline-none md:w-80"
        />

        <div className="mt-4 overflow-x-auto rounded-[1.5rem] bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs tracking-[0.16em] text-mute uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Attending</th>
                <th className="px-4 py-3">Guests</th>
                <th className="px-4 py-3">Meal</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {shown.map((rsvp) => (
                <tr key={rsvp.id} className="border-t border-[#f3eee3]">
                  <td className="px-4 py-3">{rsvp.name}</td>
                  <td className="px-4 py-3">{rsvp.email}</td>
                  <td className="px-4 py-3">{rsvp.address}</td>
                  <td className="px-4 py-3">{rsvp.attending === "yes" ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{rsvp.guests}</td>
                  <td className="px-4 py-3">{rsvp.meal}</td>
                  <td className="max-w-xs px-4 py-3">{rsvp.message}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(rsvp.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => remove(rsvp)} className="text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {shown.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-mute">
                    {rsvps.length === 0 ? "No RSVPs yet." : "No guests match your search."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
