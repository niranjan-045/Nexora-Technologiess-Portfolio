"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Youtube } from "lucide-react";
import { Reveal } from "./Reveal";
import { useToast } from "@/lib/ToastProvider";
import type { Settings } from "@/lib/types";

const SOCIAL_ICONS = { linkedin: Linkedin, github: Github, instagram: Instagram, youtube: Youtube };

const PROJECT_TYPES = ["Website Development", "Flutter App Development", "Firebase Integration", "Admin Dashboard", "UI/UX Design", "Other"];
const BUDGETS = ["Under ₹25,000", "₹25,000 – ₹75,000", "₹75,000 – ₹2,00,000", "₹2,00,000+"];

export function Contact({ settings }: { settings: Settings }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", type: "", budget: "", msg: "" });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) return;

    const text = `Hello ${settings.companyName} Team,

My Name: ${form.name}
Company: ${form.company || "-"}
Email: ${form.email}
Phone: ${form.phone || "-"}
Project Type: ${form.type || "-"}
Budget: ${form.budget || "-"}
Project Details: ${form.msg}

I would like to discuss my project.

Regards,
${form.name}`;

    const url = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    showToast("Opening WhatsApp with your project details…");
    setForm({ name: "", email: "", phone: "", company: "", type: "", budget: "", msg: "" });
  }

  const inputClass =
    "rounded-2xl border border-border bg-white px-4 py-4 text-[14.5px] transition focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] focus:outline-none";

  return (
    <section id="contact" className="bg-surface-2 py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 font-alt text-[13px] font-semibold uppercase tracking-[0.14em] text-primary before:h-2 before:w-2 before:rounded-full before:bg-primary before:shadow-[0_0_0_4px_rgba(255,107,0,0.15)]">
            Get In Touch
          </p>
          <h2 className="mb-4 font-display text-[clamp(32px,4vw,48px)] font-bold">
            Let&apos;s build something <span className="text-primary">together</span>
          </h2>
          <p className="text-[17px] leading-relaxed text-ink-2">
            Fill the form below — it opens WhatsApp with your project details, ready to send.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal className="glass rounded-3xl p-9 shadow-soft">
            <div className="flex items-center gap-2.5 rounded-2xl bg-green-500/10 px-4.5 py-3.5 text-[13px] font-semibold text-green-700">
              ✅ Sent directly via WhatsApp — nothing is stored on our servers.
            </div>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="field relative">
                  <input required placeholder=" " value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
                  <label className="pointer-events-none absolute left-4 top-4 bg-white px-1.5 text-[14.5px] text-ink-2">Your Name</label>
                </div>
                <div className="field relative">
                  <input required type="email" placeholder=" " value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
                  <label className="pointer-events-none absolute left-4 top-4 bg-white px-1.5 text-[14.5px] text-ink-2">Your Email</label>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="field relative">
                  <input type="tel" placeholder=" " value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
                  <label className="pointer-events-none absolute left-4 top-4 bg-white px-1.5 text-[14.5px] text-ink-2">Your Phone</label>
                </div>
                <div className="field relative">
                  <input placeholder=" " value={form.company} onChange={(e) => update("company", e.target.value)} className={inputClass} />
                  <label className="pointer-events-none absolute left-4 top-4 bg-white px-1.5 text-[14.5px] text-ink-2">Company</label>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <select value={form.type} onChange={(e) => update("type", e.target.value)} className={inputClass}>
                  <option value="" disabled hidden>Project Type</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <select value={form.budget} onChange={(e) => update("budget", e.target.value)} className={inputClass}>
                  <option value="" disabled hidden>Budget</option>
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="field relative">
                <textarea required rows={4} placeholder=" " value={form.msg} onChange={(e) => update("msg", e.target.value)} className={inputClass} />
                <label className="pointer-events-none absolute left-4 top-4 bg-white px-1.5 text-[14.5px] text-ink-2">Project Details</label>
              </div>
              <button type="submit" className="w-full rounded-full bg-gradient-to-br from-primary to-secondary px-8 py-3.5 text-[14.5px] font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5">
                Send Message on WhatsApp
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="glass flex flex-col gap-6 rounded-3xl p-9 shadow-soft">
            <InfoRow icon={<Mail size={18} />} label="Email" value={settings.email} />
            <InfoRow icon={<Phone size={18} />} label="Phone / WhatsApp" value={settings.phone} />
            <InfoRow icon={<MapPin size={18} />} label="Location" value={settings.address} />
            <div className="h-[180px] overflow-hidden rounded-[18px] border border-border">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`}
                loading="lazy"
                className="h-full w-full border-0"
              />
            </div>
            <div className="flex gap-3">
              {Object.entries(settings.socials || {}).map(([key, url]) => {
                if (!url) return null;
                const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    title={key}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 transition-all hover:-translate-y-1 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
        {icon}
      </div>
      <div>
        <b className="mb-0.5 block text-[14.5px]">{label}</b>
        <span className="text-[13.5px] text-ink-2">{value}</span>
      </div>
    </div>
  );
}
