export function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 280" className={className} fill="none" aria-hidden>
      <g stroke="#8fa07e" strokeWidth="1.4" fill="#dce6d2">
        <ellipse cx="210" cy="70" rx="22" ry="11" transform="rotate(-30 210 70)" opacity="0.85" />
        <ellipse cx="186" cy="96" rx="26" ry="12" transform="rotate(18 186 96)" opacity="0.8" />
        <ellipse cx="232" cy="108" rx="20" ry="10" transform="rotate(-50 232 108)" opacity="0.75" />
        <ellipse cx="160" cy="58" rx="18" ry="9" transform="rotate(40 160 58)" opacity="0.7" />
        <path d="M240 40 C210 90, 200 140, 168 190" stroke="#6f825e" fill="none" />
      </g>
      <g>
        <circle cx="198" cy="48" r="10" fill="#f7ecd0" stroke="#e4c76a" />
        <circle cx="198" cy="48" r="4" fill="#e8c96a" />
        <circle cx="150" cy="92" r="8" fill="#fff8ea" stroke="#e4c76a" />
        <circle cx="150" cy="92" r="3" fill="#e8c96a" />
        <circle cx="236" cy="142" r="9" fill="#f3e2a7" stroke="#d9c48a" />
      </g>
    </svg>
  );
}

export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 40" className={className} fill="none" aria-hidden>
      <path
        d="M10 20 C40 20, 50 8, 70 20 C90 32, 100 20, 110 20 C120 20, 130 32, 150 20 C170 8, 180 20, 210 20"
        stroke="#c4a35a"
        strokeWidth="1.2"
      />
      <circle cx="110" cy="20" r="3" fill="#e8c96a" />
    </svg>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#e4d4a4] bg-white/80 shadow-[0_8px_40px_rgba(196,163,90,0.12)]">
        <span className="font-serif text-3xl tracking-[0.18em] text-gold">I&J</span>
      </div>
    </div>
  );
}
