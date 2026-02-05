"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/app/util/supabase";
import { Poppins } from "next/font/google";
import { ShieldCheck, ArrowRight, Activity } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert("Login successful!");
    setLoading(false);
  };

  return (
    <div
      className={`flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 ${poppins.className}`}
    >
      {/* GREEN VISUAL SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full h-[30%] md:h-full md:w-1/2 flex flex-col items-center justify-center bg-emerald-500 dark:bg-emerald-600 overflow-hidden md:order-2"
      >
        {/* Background Glows */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-700 opacity-90" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col items-center w-full h-full justify-center p-4">
          {/* Logo Circle - Always Circle */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mb-4 md:mb-10 p-3 md:p-5 rounded-full bg-white shadow-2xl shrink-0"
          >
            <div className="relative w-12 h-12 md:w-20 md:h-20">
              <Image
                src="/img/logo.png"
                alt="Logo"
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>
          </motion.div>

          {/* App Previews - HIDDEN on Mobile (hidden), VISIBLE on Tablet/Desktop (md:flex) */}
          <div className="hidden md:flex relative w-full justify-center items-center h-[50vh] gap-0">
            {/* Income Image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[9/18.5] h-full rounded-[3rem] border-[8px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden z-20 translate-x-6"
            >
              <Image
                src="/img/income.png"
                alt="Income UI"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Home Image */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="relative aspect-[9/18.5] h-full rounded-[3rem] border-[8px] border-slate-800 bg-slate-900 shadow-2xl overflow-hidden z-10 -translate-x-6 scale-90 opacity-100"
            >
              <Image
                src="/img/home.png"
                alt="Home UI"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Badge - Only on Desktop */}
          <div className="mt-10 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
            <Activity className="w-3 h-3 animate-pulse" /> Encrypted Command
            Center
          </div>
        </div>
      </motion.div>

      {/* FORM SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full h-[70%] md:h-full md:w-1/2 flex-col justify-center px-8 lg:px-24 z-30 bg-white dark:bg-[#0a0a0a] rounded-t-[2.5rem] md:rounded-none -mt-10 md:mt-0 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] md:shadow-none"
      >
        <div className="mx-auto w-full max-w-sm">
          <div className="flex items-center gap-2 mb-3 text-emerald-600 font-bold tracking-widest uppercase text-[10px]">
            <ShieldCheck className="w-4 h-4" /> System Identity
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
            Admin <span className="text-emerald-600 italic">Portal</span>
          </h1>
          <p className="text-xs md:text-sm font-bold text-slate-500 italic mb-8">
            Please authenticate to access the community dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div className="space-y-1.5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Registry Email
              </p>
              <input
                type="email"
                required
                className="w-full rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.03] px-5 py-3.5 md:py-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
                placeholder="admin@system.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Passkey
              </p>
              <input
                type="password"
                required
                className="w-full rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.03] px-5 py-3.5 md:py-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full rounded-2xl bg-slate-900 dark:bg-emerald-600 py-4 font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-emerald-500/10 active:scale-95 disabled:opacity-50 text-xs"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? "Verifying..." : "Initialize Session"}
                {!loading && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-slate-400 font-medium">
            &copy; 2026 WEB MGMT SYSTEM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
