"use client";

import { useState } from "react";
import { navItems } from "@/lib/wedding";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#efe6d0] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#home" className="font-serif text-2xl tracking-[0.18em] text-[#c4b08a]">
          I & J
        </a>
        <nav className="hidden items-center gap-6 text-[11px] tracking-[0.22em] text-ink uppercase md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-gold">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className="block h-px w-6 bg-ink" />
          <span className="mt-1.5 block h-px w-6 bg-ink" />
        </button>
      </div>
      {open ? (
        <div className="flex flex-col gap-3 px-5 pb-5 text-sm tracking-[0.18em] uppercase md:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
