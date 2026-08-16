"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Boxes,
  Gem,
  CircleDot,
  ArrowRight,
  HelpCircle,
  Star,
  Settings,
  Link2,
  UserCircle,
  LogOut,
  X,
} from "lucide-react";

export const SECTIONS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "portfolio", label: "Portfolio", icon: Boxes },
  { id: "services", label: "Services", icon: Gem },
  { id: "skills", label: "Skills", icon: CircleDot },
  { id: "process", label: "Process", icon: ArrowRight },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "settings", label: "Website Settings", icon: Settings },
  { id: "social", label: "Social Links", icon: Link2 },
  { id: "profile", label: "Admin Profile", icon: UserCircle },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export function Sidebar({
  active,
  onSelect,
  open,
  onClose,
  onLogout,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1400] bg-ink/40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-[1500] flex w-[260px] flex-col border-r border-border bg-white p-5 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between gap-2.5 px-1.5 pb-2">
          <div className="flex items-center gap-2.5">
            <Image src="/assets/logo.png" alt="Nexora" width={34} height={34} className="rounded-lg" />
            <div>
              <b className="block font-display text-[15px]">Nexora</b>
              <span className="text-[10px] text-ink-2">Admin Panel</span>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 md:hidden">
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[13.5px] font-semibold transition-colors ${
                active === id
                  ? "bg-gradient-to-br from-primary to-secondary text-white"
                  : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-border pt-3.5">
          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
