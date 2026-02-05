"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/app/util/supabase";
import Navbar from "../comps/navbar/page";
import Footer from "../comps/footer/page";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Activity, UserPlus, Zap } from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function UserAnalytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeNow: 0,
    growthData: [] as any[],
  });

  useEffect(() => {
    fetchUserData();
    setupRealtimePresence();
  }, []);

  // 1. REAL-TIME PRESENCE (Actual Live Users)
  function setupRealtimePresence() {
    const channel = supabase.channel("online-status", {
      config: { presence: { key: "user" } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        setStats((prev) => ({ ...prev, activeNow: count }));
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }

  // 2. FETCH DATABASE STATS
  async function fetchUserData() {
    try {
      setLoading(true);

      // Fetch from profiles using updated_at as per your schema
      const {
        data: profiles,
        count,
        error,
      } = await supabase
        .from("profiles")
        .select("updated_at", { count: "exact" })
        .order("updated_at", { ascending: true });

      if (error) throw error;

      let runningTotal = 0;
      const dailyData: Record<string, number> = {};

      if (profiles) {
        profiles.forEach((profile) => {
          const date = new Date(profile.updated_at).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            }
          );
          dailyData[date] = (dailyData[date] || 0) + 1;
        });
      }

      const chartData = Object.keys(dailyData).map((date) => {
        runningTotal += dailyData[date];
        return { date, users: runningTotal };
      });

      setStats((prev) => ({
        ...prev,
        totalUsers: count || 0,
        growthData:
          chartData.length > 0
            ? chartData
            : [{ date: "Today", users: count || 0 }],
      }));
    } catch (e) {
      console.error("Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4 text-emerald-500 font-bold tracking-widest uppercase text-xs">
            <Activity className="w-4 h-4 animate-pulse" /> Live System Status
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Community <span className="text-emerald-500 italic">Insights</span>
          </h1>
        </motion.div>

        {/* Real-time Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <StatCard
            label="Total Registered"
            value={stats.totalUsers.toString()}
            sub="Users signed up"
            icon={<Users className="w-6 h-6" />}
          />
          <StatCard
            label="Active Now"
            value={stats.activeNow.toString()}
            sub="Live connections"
            icon={<Zap className="w-6 h-6 text-amber-500" />}
            isLive={true}
          />
        </div>

        {/* Growth Chart Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[3rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5"
        >
          <div className="mb-10">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <UserPlus className="text-emerald-500" /> Growth Curve
            </h3>
            <p className="text-sm text-slate-500 font-medium italic">
              Cumulative user registration trend
            </p>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.growthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.05}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                />
                <YAxis hide domain={["dataMin", "dataMax + 1"]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    background: "#000",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#10b981" }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <Footer />
      </main>
    </div>
  );
}

function StatCard({ label, value, sub, icon, isLive }: any) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 relative overflow-hidden transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="text-emerald-500 bg-emerald-500/10 p-4 rounded-2xl">
          {icon}
        </div>
        {isLive && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />{" "}
            Live Now
          </div>
        )}
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
        {label}
      </p>
      <AnimatePresence mode="wait">
        <motion.h2
          key={value}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="text-6xl font-black tracking-tighter"
        >
          {value}
        </motion.h2>
      </AnimatePresence>
      <p className="text-xs font-bold text-slate-500 italic mt-2">{sub}</p>
    </motion.div>
  );
}
