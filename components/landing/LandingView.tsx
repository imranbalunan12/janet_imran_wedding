"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SoftPhoto } from "@/components/SoftPhoto";
import { landingPhotos } from "@/lib/photos";
import { wedding } from "@/lib/wedding";

export function LandingView() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % landingPhotos.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const response = await fetch("/api/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "That code doesn’t match.");
      setSaving(false);
      return;
    }
    router.push("/invitation");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ivory">
      {landingPhotos.map((photo, i) => (
        <div
          key={photo.src}
          className="absolute inset-0 transition-opacity duration-[1600ms]"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <SoftPhoto photo={photo} className="h-full w-full" imgClassName="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-[#fff8ea]/40 to-white/55" />
        </div>
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/80 bg-white/70 shadow-lg backdrop-blur-sm">
          <span className="font-serif text-3xl tracking-[0.2em] text-gold">{wedding.monogram}</span>
        </div>
        <p className="text-xs tracking-[0.5em] text-ink/70 uppercase">The wedding of</p>
        <h1 className="font-serif mt-4 text-5xl text-ink md:text-7xl">
          {wedding.groom.full}
        </h1>
        <p className="font-serif my-3 text-3xl text-gold">&</p>
        <h1 className="font-serif text-5xl text-ink md:text-7xl">{wedding.bride.full}</h1>
        <p className="mt-6 text-xs tracking-[0.35em] text-mute uppercase">{wedding.date.label}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-10 rounded-full border border-[#d9c48a] bg-white/80 px-10 py-3 text-xs tracking-[0.28em] uppercase shadow-sm hover:bg-white"
        >
          Open Invitation
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#3f3a33]/40 px-4">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl"
          >
            <p className="text-xs tracking-[0.3em] text-sage uppercase">Enter your invitation code</p>
            <h2 className="font-serif mt-3 text-3xl">Welcome, dear guest</h2>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
              className="mt-8 w-full border-0 border-b border-[#d9d0bf] bg-transparent py-3 text-center tracking-[0.2em] outline-none"
              placeholder="CODE"
            />
            {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
            <div className="mt-8 flex justify-center gap-3">
              <button type="button" onClick={() => setOpen(false)} className="px-5 py-2 text-sm text-mute">
                Close
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#b08978] px-8 py-2 text-sm tracking-[0.16em] text-white uppercase"
              >
                {saving ? "Opening…" : "Enter"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}
