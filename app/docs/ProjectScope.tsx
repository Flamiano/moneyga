"use client";
import { motion, Variants } from "framer-motion";
import {
  Target,
  Layers,
  CheckCircle2,
  PieChart,
  BellRing,
  Smartphone,
  Database,
  AlertTriangle,
  Code2,
  Terminal,
  Box,
  Zap,
} from "lucide-react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProjectScope() {
  return (
    <motion.div initial="hidden" animate="visible" className="space-y-16 pb-20">
      {/* Header Section */}
      <motion.header
        variants={itemVariants}
        className="space-y-4 scroll-mt-24"
        id="goals"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wider uppercase border border-emerald-500/20">
          <Target className="w-3 h-3" /> Project Mission
        </div>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-950 dark:text-white leading-[1.1]">
          Scope & <span className="text-emerald-500 italic">Objectives</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed font-medium">
          MoneyGa is engineered to bridge the gap between daily Filipino
          spending habits and long-term financial stability through manual
          consciousness and high-fidelity tracking.
        </p>
      </motion.header>

      <hr className="border-slate-100 dark:border-white/5" />

      {/* Strategic Goals Grid */}
      <motion.section
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="p-8 bg-slate-50 dark:bg-white/[0.02] rounded-[2rem] border border-slate-200 dark:border-white/5">
          <PieChart className="w-10 h-10 text-emerald-500 mb-6" />
          <h3 className="text-xl font-bold dark:text-white mb-3">
            Financial Awareness
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Generate visual reports and summaries that help users understand
            spending patterns at a glance through intuitive UI/UX.
          </p>
        </div>
        <div className="p-8 bg-slate-50 dark:bg-white/[0.02] rounded-[2rem] border border-slate-200 dark:border-white/5">
          <BellRing className="w-10 h-10 text-emerald-500 mb-6" />
          <h3 className="text-xl font-bold dark:text-white mb-3">
            Budget Discipline
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Streamline budget setting with proactive notifications and
            category-based monitoring to prevent lifestyle inflation.
          </p>
        </div>
        <div className="p-8 bg-slate-50 dark:bg-white/[0.02] rounded-[2rem] border border-slate-200 dark:border-white/5">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-6" />
          <h3 className="text-xl font-bold dark:text-white mb-3">
            Manual Control
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Encouraging intentional spending by removing "invisible" automatic
            transactions, putting every Peso under user scrutiny.
          </p>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        variants={itemVariants}
        className="space-y-8 scroll-mt-24"
        id="tech-stack"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-emerald-500 rounded-full" />
          <h2 className="text-3xl font-black tracking-tight dark:text-white uppercase">
            Technical Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tech List & Libraries */}
          <div className="space-y-4">
            {/* Core Stack Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-emerald-500">
                  <Smartphone size={18} />
                  <span className="font-bold text-xs uppercase">Frontend</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  React Native, NextJS, TailwindCSS, Framer Motion
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-emerald-500">
                  <Database size={18} />
                  <span className="font-bold text-xs uppercase">Backend</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Supabase, NodeJS, PostgreSQL, Gmail Service
                </p>
              </div>
            </div>

            {/* AI & Integration Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-emerald-500">
                  <Zap size={18} />
                  <span className="font-bold text-xs uppercase">AI Tools</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  ClaudeAI, GeminiAI, Google AI Models
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-emerald-500">
                  <Box size={18} />
                  <span className="font-bold text-xs uppercase">
                    Dev Workflow
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  VSCode, Android Studio, Git, Github, Vercel, Mockups
                </p>
              </div>
            </div>

            <div className="group p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-start gap-4 transition-all hover:border-emerald-500/50">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                <Layers size={24} />
              </div>
              <div>
                <h4 className="font-bold dark:text-white text-lg">
                  Key Libraries
                </h4>
                <p className="text-sm text-slate-500">
                  Victory Native, Lucide React, Reanimated, Expo Router, Chart
                  Kit.
                </p>
              </div>
            </div>
          </div>

          {/* Terminal View / Package.json */}
          <div className="bg-[#0f1117] rounded-[2rem] border border-white/10 p-6 shadow-2xl font-mono text-[10px] overflow-hidden relative h-[380px] overflow-y-auto custom-scrollbar">
            <div className="flex gap-2 mb-6 sticky top-0 bg-[#0f1117] pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-slate-500">
                package.json — android-config
              </span>
            </div>
            <div className="space-y-1 text-slate-300">
              <p className="text-emerald-500 italic">
                // Main Android Dependencies
              </p>
              <p>
                <span className="text-slate-500">"expo"</span>:{" "}
                <span className="text-emerald-400">"~54.0.30"</span>,
              </p>
              <p>
                <span className="text-slate-500">"react-native"</span>:{" "}
                <span className="text-emerald-400">"0.81.5"</span>,
              </p>
              <p>
                <span className="text-slate-500">"@supabase/supabase-js"</span>:{" "}
                <span className="text-emerald-400">"^2.89.0"</span>,
              </p>
              <p>
                <span className="text-slate-500">"victory-native"</span>:{" "}
                <span className="text-emerald-400">"^41.20.2"</span>,
              </p>
              <p>
                <span className="text-slate-500">"expo-router"</span>:{" "}
                <span className="text-emerald-400">"~6.0.21"</span>,
              </p>
              <p>
                <span className="text-slate-500">
                  "react-native-reanimated"
                </span>
                : <span className="text-emerald-400">"~4.1.1"</span>,
              </p>
              <p className="text-emerald-500 italic mt-4">// Navigation & UI</p>
              <p>
                <span className="text-slate-500">
                  "@react-navigation/native"
                </span>
                : <span className="text-emerald-400">"^7.1.8"</span>,
              </p>
              <p>
                <span className="text-slate-500">"react-native-chart-kit"</span>
                : <span className="text-emerald-400">"^6.12.0"</span>,
              </p>
              <p>
                <span className="text-slate-500">"expo-haptics"</span>:{" "}
                <span className="text-emerald-400">"~15.0.8"</span>,
              </p>
              <p>
                <span className="text-slate-500">"expo-font"</span>:{" "}
                <span className="text-emerald-400">"~14.0.10"</span>,
              </p>
              <p className="animate-pulse text-emerald-500 font-bold mt-4">
                _ LOAD_COMPLETE: ANDROID_SDK_24_READY
              </p>
            </div>
            <Code2 className="absolute bottom-4 right-4 w-16 h-16 text-white/5" />
          </div>
        </div>
      </motion.section>

      {/* Constraints & Boundaries */}
      <motion.section
        variants={itemVariants}
        className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="grid grid-cols-6 h-full border-white/10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-white/10" />
            ))}
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-500" />
            <h3 className="text-2xl font-black uppercase tracking-tight">
              Delimitations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="text-emerald-400 font-bold flex items-center gap-2">
                <Terminal size={16} /> Functional Boundaries
              </h4>
              <ul className="space-y-4">
                {[
                  "No automated bank scraping (Manual input only)",
                  "No investment or loan management features",
                  "No AI-driven financial forecasting",
                  "Basic budgeting per category only",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-400">
                    <span className="text-emerald-500">•</span> {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-emerald-400 font-bold flex items-center gap-2">
                <Terminal size={16} /> Technical Restrictions
              </h4>
              <ul className="space-y-4">
                {[
                  "Restricted to Android OS (iOS support excluded)",
                  "Fixed currency: Philippine Peso (₱)",
                  "Pilot testing limited to 30 selected users",
                  "Gmail-based login requirement",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-400">
                    <span className="text-emerald-500">•</span> {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
