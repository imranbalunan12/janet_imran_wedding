"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

function parts(ms: number) {
  const clamped = Math.max(0, ms);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    min: Math.floor((clamped / 60000) % 60),
    sec: Math.floor((clamped / 1000) % 60),
  };
}

export function Countdown() {
  const target = new Date(wedding.date.iso).getTime();
  const [now, setNow] = useState(target);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const t = parts(target - now);
  const cells = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Min", t.min],
    ["Sec", t.sec],
  ] as const;

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-8 md:justify-start">
      {cells.map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="font-serif text-4xl tracking-wide text-ink md:text-5xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs tracking-[0.2em] text-mute uppercase">{label}</div>
        </div>
      ))}
    </div>
  );
}
