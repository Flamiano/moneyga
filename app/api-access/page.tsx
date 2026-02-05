"use client";
import Navbar from "../comps/navbar/page";
import {
  Terminal,
  Key,
  ShieldCheck,
  Cpu,
  Code2,
  Copy,
  ExternalLink,
  Lock,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../comps/footer/page";

export default function APIAccessPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#060606] transition-colors duration-500 text-slate-900 dark:text-white pb-32">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-4">
              <Cpu className="w-4 h-4" /> Developer Portal
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight mb-6">
              Build with the <br />
              <span className="text-emerald-500">MoneyGa Engine.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Integrate real-time Philippine financial data into your own
              applications. Our REST API provides secure access to masked
              spending analytics and local bank rates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* API Key Status / Terminal Section */}
      <section className="px-6 lg:px-12 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Key Management */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-6"
          >
            <motion.div
              variants={itemVars}
              className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Key className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-xl tracking-tight">
                    API Keys
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                  Active
                </span>
              </div>

              <div className="space-y-4">
                <div className="group relative">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 mb-2 block">
                    Production Key
                  </label>
                  <div className="flex items-center gap-2 p-4 bg-white dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/10 font-mono text-xs overflow-hidden">
                    <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-500">
                      mg_live_••••••••••••••••••••••••••••••••
                    </span>
                    <button className="ml-auto p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-emerald-500" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVars}
              className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-3xl flex gap-4"
            >
              <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0" />
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400/80 leading-relaxed">
                Keys provide full access to your masked data. Never share your
                secret keys in client-side code or public repositories.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Code Preview Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 rounded-[2.5rem] bg-[#0d1117] overflow-hidden shadow-2xl border border-white/5 group"
          >
            <div className="px-6 py-4 bg-[#161b22] border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-2 uppercase tracking-widest">
                <Terminal className="w-3 h-3" /> Fetch_Spending.js
              </span>
            </div>
            <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto">
              <pre className="text-slate-300">
                <code className="block">
                  <span className="text-emerald-400">const</span> fetchAnalytics
                  = <span className="text-emerald-400">async</span> () =&gt;{" "}
                  {"{"} <br />
                  &nbsp;&nbsp;<span className="text-emerald-400">
                    const
                  </span>{" "}
                  response = <span className="text-emerald-400">await</span>{" "}
                  fetch(
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-amber-300">
                    'https://api.moneyga.ph/v1/analytics'
                  </span>
                  ,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{"{"} headers: {"{"}{" "}
                  <span className="text-amber-300">'Authorization'</span>:{" "}
                  <span className="text-amber-300">'Bearer mg_live_...'</span>{" "}
                  {"}}"} <br />
                  &nbsp;&nbsp;); <br />
                  &nbsp;&nbsp;<span className="text-emerald-400">
                    return
                  </span>{" "}
                  response.json(); <br />
                  {"}"};
                </code>
              </pre>
            </div>
            <div className="px-8 py-4 bg-emerald-500/5 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                Response 200 OK
              </span>
              <Zap className="w-4 h-4 text-emerald-500 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Documentation Links */}
      <section className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DocCard
              icon={<Code2 className="w-5 h-5" />}
              title="SDK Reference"
              desc="Next.js and React Native libraries for faster integration."
            />
            <DocCard
              icon={<ShieldCheck className="w-5 h-5" />}
              title="Authentication"
              desc="OAuth2 and Bearer Token standards for enterprise apps."
            />
            <DocCard
              icon={<ExternalLink className="w-5 h-5" />}
              title="Webhooks"
              desc="Real-time notifications for transaction syncs."
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function DocCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/10 hover:border-emerald-500/50 transition-all group cursor-pointer">
      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors mb-6">
        {icon}
      </div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
