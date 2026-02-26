"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "./util/supabase";
import {
  Wallet,
  ShieldCheck,
  Download,
  Lock,
  EyeOff,
  BarChart3,
  BellRing,
  Users2,
  ArrowRight,
  CheckCircle2,
  User,
  MessageSquare,
  ChevronDown,
  Quote,
  Send,
  Smartphone
} from "lucide-react";
import Navbar from "./comps/navbar/page";
import Footer from "./comps/footer/page";

export default function Home() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isAndroid, setIsAndroid] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const APK_URL = "https://github.com/Flamiano/moneyga-app/releases/download/v1.0.0/MoneyGa.apk";

  useEffect(() => {
    fetchInitialData();

    // Enhanced Android Detection
    const ua = navigator.userAgent.toLowerCase();
    setIsAndroid(/android/.test(ua));
  }, []);

  async function fetchInitialData() {
    const { count } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });
    setUserCount(count);

    const { data, error } = await supabase
      .from("feedbacks")
      .select(`id, email, message, created_at, profiles (full_name)`)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setFeedbacks(data);
    }
  }

  const handleDownload = (e: React.MouseEvent) => {
    // This ensures the link is handled as a download without changing the URL or opening a tab
    // The 'download' attribute on the <a> tag handles this in most modern browsers.
    console.log("Starting Download...");
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email.toLowerCase().trim())
        .single();

      if (profileError || !profile) {
        setStatus({
          type: "error",
          msg: "Email not found. Please register in the MoneyGa app first!",
        });
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("feedbacks").insert({
        user_id: profile.id,
        email: email.toLowerCase().trim(),
        message: message,
      });

      if (insertError) throw insertError;

      setStatus({
        type: "success",
        msg: "Salamat! Your feedback has been posted successfully.",
      });
      setEmail("");
      setMessage("");
      fetchInitialData();
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFirstName = (fullName: string) => {
    return fullName ? fullName.split(" ")[0] : "User";
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 selection:bg-emerald-100 dark:selection:bg-emerald-900/30 overflow-x-hidden font-sans">

        {/* --- HERO SECTION --- */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-500/10 rounded-full border border-emerald-100 dark:border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {isAndroid ? "Compatible with your device" : "Android Exclusive"}
            </div>

            <h1 className="text-6xl lg:text-[100px] font-black tracking-tighter mb-8 leading-[0.85] lg:-ml-1">
              Master Your <br />
              <span className="text-emerald-600 dark:text-emerald-500">Peso</span> Flow.
            </h1>

            <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
              The #1 manual expense tracker for Filipinos. Build financial
              discipline with MoneyGa's intuitive Android interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
              {isAndroid ? (
                <a
                  href={APK_URL}
                  download="MoneyGa.apk"
                  onClick={handleDownload}
                  className="group flex items-center justify-center gap-4 bg-slate-950 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-2xl hover:shadow-emerald-500/40 active:scale-95"
                >
                  <Download className="w-6 h-6 group-hover:animate-bounce" />
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] opacity-70 uppercase tracking-widest">Version 1.0.0</span>
                    <span className="text-lg tracking-tight">DOWNLOAD APK</span>
                  </div>
                </a>
              ) : (
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <div className="px-8 py-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-400 text-sm font-bold flex items-center gap-3">
                    <Smartphone className="w-5 h-5 opacity-50" />
                    Open on Android to Install
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-[#0a0a0a] bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-black text-emerald-600 dark:text-emerald-400 text-base leading-none">
                    {userCount?.toLocaleString() || "..."}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pinoys Saving</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- HERO VISUAL --- */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[500px] lg:h-[700px]">
            <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/10 blur-[140px] rounded-full" />

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-56 lg:w-72 aspect-[9/19] bg-slate-950 rounded-[3rem] p-2 shadow-[0_0_100px_rgba(16,185,129,0.1)] z-20 border-4 border-slate-800 dark:border-white/10"
            >
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-900">
                <img src="/img/home.png" alt="App Home" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 100, opacity: 0.4 }}
              className="absolute w-48 lg:w-64 aspect-[9/19] bg-slate-950 rounded-[2.5rem] p-2 shadow-2xl z-10 border border-white/5 mt-20 hidden lg:block"
            >
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-slate-900 grayscale">
                <img src="/img/income.png" alt="Analytics" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SECURITY SECTION --- */}
        <section className="py-32 bg-slate-50 dark:bg-[#0d0d0d] border-y border-slate-100 dark:border-white/5 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-1/2 space-y-10 text-center lg:text-left">
                <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 mx-auto lg:mx-0">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">
                    Privacy is <span className="text-emerald-500">Default.</span>
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg lg:text-xl font-medium max-w-lg mx-auto lg:mx-0">
                    Your data is strictly between you and your phone. We use industry-standard encryption so even we can't see your budget.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "AES-256 Encryption",
                    "Row Level Security",
                    "Supabase Protected",
                    "No Data Selling",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="bg-white dark:bg-black rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative">
                  <div className="absolute top-8 right-10">
                    <ShieldCheck className="w-6 h-6 text-emerald-500 animate-pulse" />
                  </div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">
                    Encrypted Database Profile
                  </h4>
                  <div className="space-y-8">
                    <DataField label="Identity" value="********-****-****-****" />
                    <DataField label="Wallet Balance" value="₱ **,***.**" />
                    <DataField label="Personal Email" value="u****@example.com" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CORE FEATURES --- */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black mb-6">Built for Discipline.</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Every feature is designed to stop impulsive spending.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BarChart3 />}
              title="Visual Reports"
              desc="Simple charts to understand spending patterns quickly."
            />
            <FeatureCard
              icon={<Wallet />}
              title="Budget Setting"
              desc="Set monthly limits per category and stay on track."
            />
            <FeatureCard
              icon={<BellRing />}
              title="Notifications"
              desc="Get alerted when you're reaching your budget limits."
            />
            <FeatureCard
              icon={<Users2 />}
              title="Live Community"
              desc={`Join ${userCount ?? "30+"} registered users.`}
            />
          </div>
        </section>

        {/* --- FEEDBACK FORM --- */}
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/5 rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <div className="w-full lg:w-5/12 p-10 lg:p-16">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30">
                  <MessageSquare className="text-white w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight italic leading-none">Voices.</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Community Insights</p>
                </div>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block ml-1">Email (Use app email)</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block ml-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How did MoneyGa help you today?"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-sm outline-none resize-none"
                  />
                </div>

                {status && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-4 rounded-2xl text-xs font-black flex items-center gap-3 ${status.type === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}
                  >
                    {status.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    {status.msg}
                  </motion.div>
                )}

                <button
                  disabled={loading}
                  className="w-full bg-slate-950 dark:bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl hover:shadow-emerald-500/20 disabled:opacity-50"
                >
                  {loading ? "SENDING..." : "POST TO WALL"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="w-full lg:w-7/12 bg-slate-50 dark:bg-black/50 p-10 flex items-center justify-center">
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="w-56 lg:w-64 aspect-[9/19] bg-slate-950 rounded-[3rem] p-2 border-4 border-slate-800 dark:border-white/10 shadow-2xl overflow-hidden"
                >
                  <img src="/img/register.png" alt="Register UI" className="w-full h-full object-cover" />
                </motion.div>
                <div className="absolute -right-8 bottom-20 bg-emerald-500 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase shadow-2xl">
                  100% Free
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEEDBACK GRID --- */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 dark:border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {feedbacks.slice(0, visibleCount).map((fb) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={fb.id}
                  className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
                >
                  <div>
                    <Quote className="text-emerald-500 w-10 h-10 opacity-20 mb-6" />
                    <p className="text-lg font-bold leading-relaxed text-slate-800 dark:text-slate-200 italic mb-8">
                      "{fb.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-50 dark:border-white/5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-black text-lg">
                      {fb.profiles?.full_name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="font-black text-sm">{getFirstName(fb.profiles?.full_name)}</h4>
                      <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase">{new Date(fb.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {feedbacks.length > visibleCount && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white/5 text-white dark:text-emerald-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all"
              >
                LOAD MORE <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* --- FINAL CTA --- */}
        <section className="max-w-5xl mx-auto px-6 pb-40">
          <div className="bg-emerald-600 rounded-[4rem] p-12 lg:p-28 text-center text-white relative overflow-hidden shadow-[0_40px_100px_rgba(16,185,129,0.3)]">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 text-8xl font-black rotate-12">₱</div>
              <div className="absolute bottom-10 right-10 text-8xl font-black -rotate-12">₱</div>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black mb-10 relative z-10 tracking-tighter">
              Build your Ipon habit.
            </h2>

            <div className="relative z-10 flex flex-col items-center gap-6">
              {isAndroid ? (
                <a
                  href={APK_URL}
                  download="MoneyGa.apk"
                  className="bg-white text-emerald-600 px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-transform shadow-2xl active:scale-95 flex items-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  Install MoneyGa Now
                </a>
              ) : (
                <div className="space-y-4">
                  <p className="text-emerald-100 font-bold max-w-sm">MoneyGa is currently only available for Android users.</p>
                  <div className="inline-block bg-emerald-700/50 backdrop-blur-md px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">iOS Version Coming Soon</div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

// --- HELPER COMPONENTS ---

function FeatureCard({ icon, title, desc }: { icon: any; title: string; desc: string; }) {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="p-10 bg-white dark:bg-[#111] rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all"
    >
      <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center mb-8 text-emerald-600">
        {React.cloneElement(icon, { className: "w-8 h-8" })}
      </div>
      <h3 className="text-2xl font-black mb-4">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
        {desc}
      </p>
    </motion.div>
  );
}

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </span>
      <div className="flex items-center justify-between bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5">
        <span className="font-mono text-sm font-bold text-slate-700 dark:text-emerald-500">
          {value}
        </span>
        <EyeOff className="w-4 h-4 text-slate-300 dark:text-white/20" />
      </div>
    </div>
  );
}