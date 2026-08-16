"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "./Reveal";
import type { Skill } from "@/lib/types";

const R = 40;
const CIRC = 2 * Math.PI * R;

function SkillRing({ pct, name }: { pct: number; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="glass rounded-3xl p-6 text-center shadow-soft">
      <div className="relative mx-auto mb-4 h-[88px] w-[88px]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id={`skillGrad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(11,11,12,0.08)" strokeWidth={8} />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={`url(#skillGrad-${name})`}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: inView ? CIRC - (pct / 100) * CIRC : CIRC }}
            transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-[15px] font-bold">
          {pct}%
        </div>
      </div>
      <b className="font-alt text-sm">{name}</b>
    </div>
  );
}

export function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="bg-surface-2 py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto mb-16 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-alt text-[13px] font-semibold uppercase tracking-[0.14em] text-primary before:h-2 before:w-2 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_rgba(255,107,0,0.15)]">
            Our Stack
          </p>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-bold">
            Technologies we <span className="text-primary">work with</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-6">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <SkillRing pct={s.pct} name={s.name} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
