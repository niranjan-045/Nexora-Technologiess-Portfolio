"use client";

import { motion } from "framer-motion";

export function WhatsappFloat({ whatsapp }: { whatsapp: string }) {
  return (
    <motion.a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noreferrer"
      animate={{ boxShadow: ["0 12px 30px rgba(37,211,102,0.4)", "0 12px 40px rgba(37,211,102,0.65)", "0 12px 30px rgba(37,211,102,0.4)"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-[900] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white"
    >
      <i className="bx bxl-whatsapp" />
    </motion.a>
  );
}
