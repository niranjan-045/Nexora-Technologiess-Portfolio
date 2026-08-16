"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import type { Settings, TechIcon } from "@/lib/types";

function TypingRole({ roles }: { roles: string[] }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let ri = 0;
    let ci = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = roles[ri] || "";
      setText(deleting ? word.slice(0, ci--) : word.slice(0, ci++));
      let delay = deleting ? 35 : 55;
      if (!deleting && ci === word.length + 1) {
        delay = 1400;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        delay = 400;
      }
      t = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(t);
  }, [roles]);
  return (
    <span>
      {text}
      <span className="ml-0.5 inline-block w-0.5 animate-blink bg-primary align-middle">&nbsp;</span>
    </span>
  );
}

function Counter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1200 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);

  useEffect(() => spring.on("change", (v) => setVal(Math.floor(v))), [spring]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const STATS = [
  { label: "Projects Completed", value: 5 },
  { label: "Technologies", value: 10 },
  { label: "Years Experience", value: 1 },
  { label: "Hrs Support/Day", value: 24 },
];

export function Hero({ settings, techIcons }: { settings: Settings; techIcons: TechIcon[] }) {
  const nameParts = settings.companyName.split(" ");
  const first = nameParts.slice(0, -1).join(" ") || nameParts[0];
  const last = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  return (
    <section id="hero" className="relative overflow-hidden pb-24 pt-44 md:pt-52">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] animate-floaty rounded-full bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-primary/40 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-24 h-[360px] w-[360px] animate-floaty rounded-full bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-accent/40 to-transparent blur-3xl [animation-delay:2s]" />

      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left"
        >
          <p className="mb-2 font-alt text-lg text-ink-2">Hi, we are</p>
          <h1 className="mb-4 font-display text-[clamp(40px,5.6vw,68px)] font-bold leading-[1.05]">
            {first ? `${first} ` : ""}
            <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              {last || settings.companyName}
            </span>
          </h1>
          <p className="mb-5 min-h-[34px] font-alt text-[clamp(20px,2.4vw,26px)] font-semibold text-ink-2">
            <TypingRole roles={settings.heroRoles} />
          </p>
          <p className="mx-auto mb-8 max-w-[520px] text-[16.5px] leading-relaxed text-ink-2 md:mx-0">
            {settings.heroDesc}
          </p>
          <div className="mb-12 flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#portfolio"
              className="rounded-full bg-gradient-to-br from-primary to-secondary px-8 py-3.5 text-[14.5px] font-semibold text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              Explore Our Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border bg-white/60 px-8 py-3.5 text-[14.5px] font-semibold text-ink transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
            >
              Contact Us
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-9 md:justify-start">
            {STATS.map((s) => (
              <div key={s.label}>
                <b className="block font-display text-3xl">
                  <Counter target={s.value} />
                </b>
                <span className="text-[13px] text-ink-2">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative aspect-square w-[min(420px,90%)] animate-floaty rounded-full border border-border bg-gradient-to-br from-white to-surface-2 shadow-soft [animation-duration:6s]">
            <div className="spin-ring absolute -inset-[3px] rounded-full opacity-60 [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))] [background:conic-gradient(from_0deg,#FF6B00,#F59E0B,transparent,#FF6B00)]" />
            <div className="absolute inset-[9%] overflow-hidden rounded-full bg-surface-2">
              <Image src={settings.heroImage} alt={settings.companyName} fill className="object-cover" priority />
            </div>
            {techIcons.map((t, i) => {
              const angle = (i / techIcons.length) * 2 * Math.PI;
              const r = 47;
              const x = 50 + r * Math.cos(angle);
              const y = 50 + r * Math.sin(angle);
              return (
                <motion.div
                  key={t.name}
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  title={t.name}
                  className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-border bg-white/85 text-2xl shadow-soft backdrop-blur"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <i className={t.icon} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-ink-2">
        <span>Scroll Down</span>
        <div className="relative h-10 w-6 rounded-full border-2 border-border">
          <motion.span
            animate={{ top: ["8px", "22px"], opacity: [1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 h-2 w-1 -translate-x-1/2 rounded bg-primary"
          />
        </div>
      </div>
    </section>
  );
}
