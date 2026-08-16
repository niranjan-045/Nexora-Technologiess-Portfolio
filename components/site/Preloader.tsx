"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export function Preloader({ hide }: { hide: boolean }) {
  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-white"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/assets/logo.png" alt="Nexora" width={64} height={64} priority />
          </motion.div>
          <div className="h-[3px] w-44 overflow-hidden rounded-full bg-surface-2">
            <motion.span
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="block h-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
