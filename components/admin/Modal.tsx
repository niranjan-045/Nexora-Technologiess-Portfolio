"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-full max-w-[620px] overflow-y-auto rounded-[22px] bg-white p-8 shadow-lift"
          >
            <h3 className="mb-5 text-[19px] font-bold">{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-semibold text-ink-2">{label}</label>
      {children}
    </div>
  );
}

export const inputCls =
  "rounded-xl border border-border px-3.5 py-3 text-[13.5px] font-sans transition focus:border-primary focus:outline-none";
