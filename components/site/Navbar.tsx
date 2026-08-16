"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ companyName, logoUrl }: { companyName: string; logoUrl: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHideNav(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      animate={{ y: hideNav ? "-110%" : 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-[1000] transition-[padding] duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-[1240px] px-6 transition-all duration-300 ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2 transition-all duration-300 ${
            scrolled ? "glass shadow-[0_8px_30px_rgba(0,0,0,0.04)]" : ""
          }`}
        >
          <a href="#hero" className="flex items-center gap-2.5 font-display text-xl font-bold">
            <Image src={logoUrl} alt={`${companyName} logo`} width={38} height={38} className="h-9 w-9 rounded-lg object-cover" />
            <span>{companyName.split(" ")[0]}</span>
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative py-1 text-[14.5px] font-semibold text-ink"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-br from-primary to-secondary px-7 py-3 text-[14.5px] font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Hire Me
          </a>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden md:hidden"
      >
        <div className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-surface-2"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-full bg-gradient-to-br from-primary to-secondary px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Hire Me
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
