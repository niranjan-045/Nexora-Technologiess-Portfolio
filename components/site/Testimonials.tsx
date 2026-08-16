"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { useToast } from "@/lib/ToastProvider";
import { db, collection, addDoc, serverTimestamp } from "@/lib/firebase";
import type { Review } from "@/lib/types";

export function Testimonials({ testimonials }: { testimonials: Review[] }) {
  const { showToast } = useToast();
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const doubled = [...testimonials, ...testimonials];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), {
        name: name.trim(),
        role: role.trim(),
        message: message.trim(),
        rating,
        approved: false,
        createdAt: serverTimestamp(),
      });
      showToast("Thanks! Your review will appear after approval. 🙌");
      setName("");
      setRole("");
      setMessage("");
      setRating(5);
    } catch (err) {
      console.error(err);
      showToast("Could not submit right now — please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="testimonials" className="py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-alt text-[13px] font-semibold uppercase tracking-[0.14em] text-primary before:h-2 before:w-2 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_rgba(255,107,0,0.15)]">
            Testimonials
          </p>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-bold">
            What our <span className="text-primary">clients say</span>
          </h2>
        </Reveal>
      </div>

      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="animate-marquee-slow flex w-max gap-6">
          {doubled.map((t, i) => (
            <div key={i} className="glass w-[340px] flex-shrink-0 rounded-3xl p-7 shadow-soft">
              <div className="mb-3.5 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} fill={s < (t.rating || 5) ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="mb-5 min-h-[100px] text-[14.5px] leading-relaxed text-ink-2">
                &quot;{t.message}&quot;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.photo || "/assets/logo.png"}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full bg-surface-2 object-cover"
                />
                <div>
                  <b className="block text-sm">{t.name}</b>
                  <span className="text-xs text-ink-2">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[560px] px-6">
        <Reveal className="glass rounded-3xl p-9 shadow-soft">
          <h3 className="mb-1.5 text-xl font-bold">Share your experience</h3>
          <p className="mb-5 text-sm text-ink-2">
            Worked with us? Leave a review — it goes live after a quick approval.
          </p>

          <div className="mb-5 flex gap-2 text-2xl">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setRating(v)}
                className={v <= rating ? "text-primary" : "text-border"}
              >
                ★
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="field relative">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                  required
                  className="rounded-2xl border border-border bg-white px-4 py-4 text-[14.5px] transition focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] focus:outline-none"
                />
                <label className="pointer-events-none absolute left-4 top-4 bg-white px-1.5 text-[14.5px] text-ink-2 transition-all">
                  Your Name
                </label>
              </div>
              <div className="field relative">
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder=" "
                  className="rounded-2xl border border-border bg-white px-4 py-4 text-[14.5px] transition focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] focus:outline-none"
                />
                <label className="pointer-events-none absolute left-4 top-4 bg-white px-1.5 text-[14.5px] text-ink-2 transition-all">
                  Company / Role
                </label>
              </div>
            </div>
            <div className="field relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=" "
                required
                rows={4}
                className="rounded-2xl border border-border bg-white px-4 py-4 text-[14.5px] transition focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] focus:outline-none"
              />
              <label className="pointer-events-none absolute left-4 top-4 bg-white px-1.5 text-[14.5px] text-ink-2 transition-all">
                Your Review
              </label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-gradient-to-br from-primary to-secondary px-8 py-3.5 text-[14.5px] font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Review"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
