"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { auth, onAuthStateChanged, signInWithEmailAndPassword } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/admin/dashboard");
    });
    return () => unsub();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/admin/dashboard");
    } catch {
      setError("Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6">
      <div className="pointer-events-none absolute -left-28 -top-36 h-[420px] w-[420px] animate-floaty rounded-full bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-primary/40 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-[340px] w-[340px] animate-floaty rounded-full bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-accent/40 to-transparent blur-3xl [animation-delay:2s]" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass relative z-[1] w-full max-w-[380px] rounded-[28px] p-11 text-center shadow-lift"
      >
        <Image src="/assets/logo.png" alt="Nexora" width={56} height={56} className="mx-auto mb-3.5 rounded-xl" />
        <h2 className="text-[22px] font-bold">Nexora Technologies</h2>
        <p className="mb-7 text-[13px] text-ink-2">Admin Panel</p>

        {error && <p className="mb-3.5 min-h-[16px] text-[12.5px] font-medium text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nexoratech.dev"
              className="w-full rounded-xl border border-border px-4 py-3.5 text-sm transition focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-border px-4 py-3.5 text-sm transition focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] focus:outline-none"
            />
          </div>
          <div className="mb-1.5 flex items-center justify-between text-[12.5px] text-ink-2">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" defaultChecked /> Remember Me
            </label>
            <span>Admin access only</span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full justify-center rounded-xl bg-gradient-to-br from-primary to-secondary py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Login to Dashboard"}
          </button>
        </form>
        <p className="mt-6 text-[11.5px] text-ink-2">
          © {new Date().getFullYear()} Nexora Technologies. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
