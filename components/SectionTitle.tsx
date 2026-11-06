import { Flourish } from "./Florals";

export function SectionTitle({
  kicker,
  title,
  light = false,
}: {
  kicker?: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {kicker ? (
        <p className={`mb-3 text-xs tracking-[0.35em] uppercase ${light ? "text-white/80" : "text-sage"}`}>
          {kicker}
        </p>
      ) : null}
      <h2 className={`font-serif text-4xl md:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      <Flourish className={`mx-auto mt-4 h-8 w-44 ${light ? "opacity-80" : ""}`} />
    </div>
  );
}
