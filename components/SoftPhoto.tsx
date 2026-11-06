"use client";

import { useEffect, useState } from "react";
import type { PhotoSlot } from "@/lib/photos";

export function SoftPhoto({
  photo,
  className = "",
  imgClassName = "h-full w-full object-cover",
}: {
  photo: PhotoSlot;
  className?: string;
  imgClassName?: string;
}) {
  const [src, setSrc] = useState(photo.fallback);

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setSrc(photo.src);
    };
    probe.onerror = () => {
      if (!cancelled) setSrc(photo.fallback);
    };
    probe.src = photo.src;
    return () => {
      cancelled = true;
    };
  }, [photo.src, photo.fallback]);

  return (
    <div className={`overflow-hidden bg-petal ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={photo.alt} className={imgClassName} />
    </div>
  );
}
