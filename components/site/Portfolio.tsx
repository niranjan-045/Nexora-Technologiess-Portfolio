"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, Github } from "lucide-react";
import { Reveal } from "./Reveal";
import type { Project } from "@/lib/types";

export function Portfolio({ portfolio }: { portfolio: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(portfolio.map((p) => p.category).filter(Boolean)))],
    [portfolio]
  );
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = active === "All" ? portfolio : portfolio.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-alt text-[13px] font-semibold uppercase tracking-[0.14em] text-primary before:h-2 before:w-2 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_rgba(255,107,0,0.15)]">
            Our Work
          </p>
          <h2 className="mb-4 font-display text-[clamp(32px,4vw,48px)] font-bold">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-[17px] leading-relaxed text-ink-2">
            A selection of products we&apos;ve designed, built and shipped for real clients.
          </p>
        </Reveal>

        <div className="mb-12 flex flex-wrap justify-center gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-5 py-2.5 text-[13.5px] font-semibold transition-all ${
                active === c
                  ? "border-transparent bg-gradient-to-br from-primary to-secondary text-white"
                  : "border-border bg-white text-ink-2 hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-ink-2">No projects in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.title + i} delay={i * 0.06}>
                <button
                  onClick={() => setSelected(p)}
                  className="glass group block w-full overflow-hidden rounded-3xl text-left shadow-soft transition-all duration-500 hover:-translate-y-2.5 hover:shadow-lift"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-surface-2">
                    <Image
                      src={p.image || "/assets/logo.png"}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      <span className="text-sm font-semibold text-white">View Case Study →</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {p.category}
                    </span>
                    <h3 className="my-1.5 font-display text-lg font-bold">{p.title}</h3>
                    <p className="text-[13.5px] text-ink-2">{(p.tech || []).join(" • ")}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-ink/55 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-[760px] overflow-y-auto rounded-[28px] bg-white shadow-lift"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-video overflow-hidden rounded-t-[28px] bg-surface-2">
                {selected.video ? (
                  <video src={selected.video} controls poster={selected.image} className="h-full w-full object-cover" />
                ) : (
                  <Image src={selected.image || "/assets/logo.png"} alt={selected.title} fill className="object-cover" />
                )}
              </div>
              <div className="p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{selected.category}</span>
                <h3 className="my-2.5 font-display text-2xl font-bold">{selected.title}</h3>
                <p className="mb-5 leading-relaxed text-ink-2">{selected.description}</p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {(selected.tech || []).map((t) => (
                    <span key={t} className="rounded-full bg-surface-2 px-3.5 py-1.5 text-xs font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3.5">
                  {selected.website && (
                    <a
                      href={selected.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft"
                    >
                      Live Website <ArrowUpRight size={15} />
                    </a>
                  )}
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-3 text-sm font-semibold"
                    >
                      GitHub <Github size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
