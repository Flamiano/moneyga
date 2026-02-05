"use client";
import Link from "next/link";
import Footer from "../comps/footer/page";
import Navbar from "../comps/navbar/page";
import {
  Target,
  CheckCircle2,
  ShieldAlert,
  Layout,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-6 uppercase tracking-wider">
            Project Proposal
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Money<span className="text-emerald-500">Ga</span>: Personal Finance
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            A comprehensive mobile application designed to empower users to
            effectively manage their money through intuitive tracking and
            budgeting.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12">
          {/* Objectives & Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Core Objectives
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  Improve financial discipline via informed spending.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  Streamline budget setting per category.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  Increase awareness through visual reports.
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <TrendingUp className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Strategic Benefits
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  Convenience for on-the-go finance tracking.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  Strong brand presence in personal finance.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  High user engagement via utility-focused design.
                </li>
              </ul>
            </div>
          </div>

          {/* Key Features & Scope */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Layout className="text-emerald-500" /> Project Scope & Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Expense Tracking",
                "Income Monitoring",
                "Budget Setting",
                "Visual Reports",
                "User Accounts",
                "Local/Cloud Sync",
              ].map((feature) => (
                <div
                  key={feature}
                  className="p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-[#0f0f0f] text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Limitations - "Delimitations" */}
          <div className="p-8 md:p-12 rounded-[2rem] bg-amber-500/5 border border-amber-500/20">
            <h2 className="text-2xl font-black text-amber-600 dark:text-amber-400 mb-8 flex items-center gap-3">
              <ShieldAlert /> Project Limitations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">
                  Functional
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Manual inputs only. No bank synchronization, investment
                  tracking, or AI forecasting.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">
                  Technical
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Android only. Supports Philippine Peso (₱) exclusively.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">
                  Testing
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Limited to 30 selected users within the local community for QA
                  testing.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="flex flex-col items-center py-12 border-t border-slate-100 dark:border-white/5 text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Interested in the development?
            </h3>
            <Link href="/docs">
              <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20">
                View Documentation <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
