import { Reveal } from "./Reveal";
import type { ProcessStep } from "@/lib/types";

export function Process({ process }: { process: ProcessStep[] }) {
  return (
    <section id="process" className="bg-surface-2 py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto mb-16 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-alt text-[13px] font-semibold uppercase tracking-[0.14em] text-primary before:h-2 before:w-2 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_rgba(255,107,0,0.15)]">
            How We Work
          </p>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-bold">
            Our <span className="text-primary">Process</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {process.map((p, i) => (
            <Reveal key={p.title + i} delay={i * 0.06}>
              <div className="glass h-full rounded-3xl p-7 text-center shadow-soft">
                <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent font-display text-[17px] font-bold text-white shadow-soft" style={{ width: 52, height: 52 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="mb-1.5 text-[15.5px] font-bold">{p.title}</h4>
                <p className="text-[12.5px] text-ink-2">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
