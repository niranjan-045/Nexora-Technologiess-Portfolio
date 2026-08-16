"use client";

import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 32,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.6, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
