import Image from "next/image";
import { Reveal } from "./Reveal";
import type { Settings } from "@/lib/types";

const POINTS = [
  "Full-stack Web & Mobile Development",
  "Firebase & Cloud Architecture",
  "UI/UX-focused Product Design",
  "AI-powered Applications",
];

export function About({ settings }: { settings: Settings }) {
  return (
    <section id="about" className="bg-surface-2 py-28">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
            <Image src={settings.aboutImage} alt={`About ${settings.companyName}`} fill className="object-cover" />
          </div>
          <div className="glass absolute bottom-5 left-5 rounded-2xl px-5 py-3.5 font-display shadow-soft">
            <b className="block text-2xl text-primary">1+</b>
            <span className="text-xs text-ink-2">Years Experience</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow mb-4 inline-flex items-center gap-2 font-alt text-[13px] font-semibold uppercase tracking-[0.14em] text-primary before:h-2 before:w-2 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_rgba(255,107,0,0.15)]">
            About Us
          </p>
          <h2 className="mb-4 font-display text-[clamp(32px,4vw,48px)] font-bold leading-tight">
            Building digital products that make an <span className="text-primary">impact</span>
          </h2>
          <p className="text-[15.5px] leading-loose text-ink-2">{settings.aboutBio}</p>

          <ul className="my-7 flex flex-col gap-3.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px] text-ink-2">
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["Location", settings.address],
              ["Availability", "Available 24/7"],
              ["Experience", "1+ Years, Software Dev"],
              ["Email", settings.email],
            ].map(([label, value]) => (
              <div key={label} className="glass rounded-2xl p-4">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-ink-2">{label}</span>
                <b className="font-alt text-[15px]">{value}</b>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-8 inline-flex rounded-full bg-gradient-to-br from-primary to-secondary px-8 py-3.5 text-[14.5px] font-semibold text-white shadow-soft transition-transform hover:-translate-y-1"
          >
            Let&apos;s Talk
          </a>
        </Reveal>
      </div>
    </section>
  );
}
