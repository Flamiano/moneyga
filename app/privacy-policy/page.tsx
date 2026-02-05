"use client";
import Navbar from "../comps/navbar/page";
import { ShieldCheck, EyeOff, Lock, Database, Info } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../comps/footer/page";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <EyeOff className="w-5 h-5 text-emerald-500" />,
      title: "Data Minimization",
      content:
        "We only collect what is strictly necessary. Your bank credentials are never stored on our servers; we use secure, read-only tokens to sync your transaction history.",
    },
    {
      icon: <Lock className="w-5 h-5 text-emerald-500" />,
      title: "End-to-End Encryption",
      content:
        "All data transmitted between the MoneyGa Web/Mobile apps and our Supabase backend is encrypted using industry-standard TLS 1.3 protocols.",
    },
    {
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      title: "Regional Storage",
      content:
        "In compliance with local standards, user profiles and financial metadata are stored within secure regional data centers to ensure low latency and data sovereignty.",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#060606] transition-colors duration-500 text-slate-900 dark:text-white pb-32">
      <Navbar />

      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-4">
              <ShieldCheck className="w-4 h-4" /> Security & Trust
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8">
              Privacy <span className="text-emerald-500 italic">Policy.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-12">
              Last updated: February 2026. This policy outlines how MoneyGa
              protects your identity and financial data across our Web and
              Mobile platforms.
            </p>
          </motion.div>

          <div className="space-y-12">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group border-l-2 border-slate-100 dark:border-white/10 pl-8 relative"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-[#060606] border-2 border-emerald-500" />
                <div className="flex items-center gap-3 mb-3">
                  {section.icon}
                  <h3 className="text-xl font-black tracking-tight">
                    {section.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10"
          >
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
              <p className="text-sm text-slate-500 italic">
                Note for Ma'am Jessa: This Privacy Policy is part of an academic
                submission. Data handling logic is simulated via Supabase RLS
                (Row Level Security).
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
