import type { TechIcon } from "@/lib/types";

export function Trusted({ techIcons }: { techIcons: TechIcon[] }) {
  const doubled = [...techIcons, ...techIcons];
  return (
    <div className="border-y border-border py-14">
      <div className="mx-auto max-w-[1240px] px-6">
        <p className="mb-7 text-center text-[13px] uppercase tracking-[0.14em] text-ink-2">
          Trusted by teams building with
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-16">
            {doubled.map((t, i) => (
              <span
                key={`${t.name}-${i}`}
                className="inline-flex items-center gap-2.5 whitespace-nowrap font-display text-lg font-bold text-ink-2/70"
              >
                <i className={`${t.icon} text-2xl`} /> {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
