"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import type { Faq as FaqItem } from "@/lib/types";

export function Faq({ faq }: { faq: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-alt text-[13px] font-semibold uppercase tracking-[0.14em] text-primary before:h-2 before:w-2 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_rgba(255,107,0,0.15)]">
            FAQ
          </p>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-bold">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </Reveal>

        <div className="mx-auto flex max-w-[760px] flex-col gap-3.5">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="glass rounded-3xl px-6">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left text-[15.5px] font-semibold"
                  >
                    <span>{f.q}</span>
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-primary transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-primary text-white" : "bg-surface-2"
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-[14.5px] leading-relaxed text-ink-2">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
