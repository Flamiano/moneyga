"use client";
import { useEffect, useState } from "react";
import Navbar from "../comps/navbar/page";
import { supabase } from "../util/supabase";
import {
  Users,
  Globe,
  MessageSquare,
  Quote,
  Loader2,
  Calendar,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../comps/footer/page";

export default function CommunityPage() {
  const [stats, setStats] = useState({ users: 0, loading: true });
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Fetch User Count from profiles
        const { count } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // 2. Fetch Feedback Entries from your public.feedbacks table
        const { data: feedbackData } = await supabase
          .from("feedbacks")
          .select("email, message, created_at")
          .order("created_at", { ascending: false })
          .limit(9);

        setStats({ users: count || 0, loading: false });
        setFeedbacks(feedbackData || []);
      } catch (error) {
        console.error("Database Error:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    }
    fetchData();
  }, []);

  // Animation Constants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVars = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#060606] transition-colors duration-500 text-slate-900 dark:text-white pb-32">
      <Navbar />

      {/* Hero Title */}
      <section className="pt-32 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-4">
                <Star className="w-4 h-4 fill-emerald-500" /> Community Wall
              </div>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none">
                Voices of <br />
                <span className="text-emerald-500">MoneyGa.</span>
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-sm border-l-2 border-emerald-500 pl-6">
              Transparency matters. Here is what our community is saying about
              the future of finance in the Philippines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Section: Users & Region */}
      <section className="px-6 lg:px-12 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* USER STAT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-8 p-12 lg:p-20 rounded-[3.5rem] bg-emerald-500 text-white relative overflow-hidden group shadow-2xl shadow-emerald-500/20"
          >
            <Users className="absolute -bottom-12 -right-12 w-80 h-80 opacity-10 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10">
              <h2 className="text-[10rem] lg:text-[14rem] font-black leading-none tracking-tighter tabular-nums">
                {stats.loading ? "..." : stats.users.toLocaleString()}
              </h2>
              <div className="flex items-center gap-4 mt-4">
                <div className="h-px w-12 bg-white/50" />
                <p className="text-2xl font-bold tracking-tight uppercase">
                  Verified Members
                </p>
              </div>
            </div>
          </motion.div>

          {/* REGION CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 p-12 lg:p-16 rounded-[3.5rem] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col justify-between group relative overflow-hidden"
          >
            <Globe className="absolute -top-10 -right-10 w-48 h-48 text-emerald-500 opacity-5 group-hover:rotate-45 transition-transform duration-1000" />
            <div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">
                Deployment
              </span>
              <h2 className="text-9xl font-black tracking-tighter text-slate-900 dark:text-white mt-4">
                PH
              </h2>
            </div>
            <div className="pt-8">
              <p className="text-xl font-bold">Philippines</p>
              <p className="text-sm text-slate-500">Regional Standard HQ</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feedback Feed */}
      <section className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black tracking-tight flex items-center gap-4">
              <MessageSquare className="w-8 h-8 text-emerald-500" /> Live
              Feedback
            </h3>
            <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
              Real-time Sync
            </div>
          </div>

          <AnimatePresence>
            {stats.loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Accessing Database...
                </p>
              </div>
            ) : (
              <motion.div
                variants={containerVars}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {feedbacks.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="group p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-500 relative flex flex-col justify-between min-h-[300px]"
                  >
                    <div>
                      <Quote className="w-10 h-10 text-emerald-500/10 group-hover:text-emerald-500/30 transition-colors mb-6" />
                      <p className="text-lg lg:text-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300 italic">
                        "{item.message}"
                      </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="max-w-[140px]">
                          <p className="text-[10px] font-black uppercase text-emerald-500 tracking-tighter">
                            Verified User
                          </p>
                          <p className="text-xs font-bold text-slate-400 truncate">
                            {item.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
                        <Calendar className="w-3 h-3 mb-1" />
                        <span className="text-[9px] font-black uppercase tracking-tighter">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State if no feedback */}
          {!stats.loading && feedbacks.length === 0 && (
            <div className="text-center py-32 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[3rem]">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-slate-200" />
              <p className="text-slate-400 font-bold">
                No community messages yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
