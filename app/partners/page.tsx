"use client";
import React from "react";
import Navbar from "../comps/navbar/page";
import {
  Handshake,
  Building2,
  ShieldCheck,
  HeartHandshake,
  Globe2,
  ArrowUpRight,
  CheckCircle2,
  Briefcase,
  Users2,
  GraduationCap,
  Layout,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../comps/footer/page";

export default function PartnersPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#060606] transition-colors duration-500 text-slate-900 dark:text-white pb-32">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-4">
              <GraduationCap className="w-4 h-4" /> Academic Project • Ma'am
              Jessa Brogada
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight mb-6">
              Stronger{" "}
              <span className="text-emerald-500 italic text-serif">
                Together.
              </span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              MoneyGa bridges the gap between complex finance and everyday users
              through strategic partnerships across the Philippines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Multi-Device Display - New Section for School Project */}
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex items-center gap-6 overflow-hidden relative group">
            <Layout className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Layout className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Web Application</h4>
              <p className="text-sm text-slate-400">
                Desktop-optimized dashboard for deep financial analysis.
              </p>
            </div>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-emerald-600 text-white flex items-center gap-6 overflow-hidden relative group">
            <Smartphone className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Mobile App</h4>
              <p className="text-sm text-emerald-100">
                On-the-go tracking for GCash and Maya transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <PartnerSectorCard
              icon={<Building2 className="w-8 h-8" />}
              title="Banking Partners"
              description="Direct API integrations with PH commercial banks for seamless data synchronization."
              color="text-blue-500"
            />
            <PartnerSectorCard
              icon={<HeartHandshake className="w-8 h-8" />}
              title="NGOs & Education"
              description="Supporting grassroots financial literacy campaigns across the archipelago."
              color="text-emerald-500"
            />
            <PartnerSectorCard
              icon={<Briefcase className="w-8 h-8" />}
              title="Strategic Tech"
              description="Collaborating with Supabase and open-source contributors for robust architecture."
              color="text-indigo-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="px-6 lg:px-12 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-7xl mx-auto p-12 lg:p-20 rounded-[3.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 relative overflow-hidden text-center"
        >
          <Globe2 className="absolute -top-12 -left-12 w-64 h-64 text-emerald-500 opacity-5" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
              Integrity in Every Sync.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10">
              Our partners undergo a rigorous security audit to ensure that your
              financial data remains hardware-isolated and compliant with BSP
              standards.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                "End-to-End Encryption",
                "ISO 27001 Ready",
                "BSP Compliant Context",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-500"
                >
                  <CheckCircle2 className="w-4 h-4" /> {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

function PartnerSectorCard({ icon, title, description, color }: any) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
      className="p-10 rounded-[3rem] bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-500 group"
    >
      <div
        className={`w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${color} mb-8 group-hover:scale-110 transition-transform duration-500`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
