import { Reveal } from "./Reveal";
import type { Service } from "@/lib/types";

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto mb-16 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-alt text-[13px] font-semibold uppercase tracking-[0.14em] text-primary before:h-2 before:w-2 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_rgba(255,107,0,0.15)]">
            What We Do
          </p>
          <h2 className="mb-4 font-display text-[clamp(32px,4vw,48px)] font-bold">
            Services built for <span className="text-primary">your growth</span>
          </h2>
          <p className="text-[17px] leading-relaxed text-ink-2">
            Every project starts with a real business problem — here&apos;s how we solve it, end to end.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title + i} delay={i * 0.06}>
              <div className="group glass h-full rounded-3xl p-9 shadow-soft transition-all duration-500 hover:-translate-y-2.5 hover:shadow-lift">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  {s.icon || "✦"}
                </div>
                <h3 className="mb-2.5 font-display text-lg font-bold">{s.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-ink-2">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
