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

  useEffect(() => {
    fetchInitialData();

    // Strict Android Detection
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
      setIsAndroid(true);
    }
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
        <section className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-30 pb-20 lg:pt-40 lg:pb-32 flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {isAndroid ? "Android Device Ready" : "Android Exclusive App"}
            </div>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
              Master Your <br />
              <span className="text-emerald-600">Peso</span> Flow.
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
              The #1 manual expense tracker for Filipinos. Build financial
              discipline with MoneyGa's intuitive Android interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              {/* --- ONLY VISIBLE ON ANDROID --- */}
              {isAndroid ? (
                <a
                  href="https://github.com/Flamiano/moneyga-app/releases/download/v1.0.0/MoneyGa.apk"
                  download="MoneyGa.apk"
                  className="group flex items-center justify-center gap-3 bg-slate-950 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95 hover:shadow-emerald-500/20"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  <span className="tracking-tight">DOWNLOAD APK</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <div className="px-6 py-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl text-amber-700 dark:text-amber-400 text-sm font-bold">
                  Open on your Android phone to download.
                </div>
              )}

              {/* Registered Users Count */}
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="flex -space-x-2">
                  {["bg-emerald-500", "bg-blue-500", "bg-amber-500"].map((color, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 ${color} flex items-center justify-center shadow-sm`}
                    >
                      <User className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {userCount?.toLocaleString() || "..."}
                  </span>{" "}
                  Registered
                </div>
              </div>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[500px]">
            <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full" />
            <motion.div
              initial={{ y: 20, rotate: -5 }}
              animate={{ y: 0, rotate: -8 }}
              className="w-48 lg:w-64 aspect-[9/19.5] bg-slate-950 rounded-[2.5rem] p-1.5 shadow-2xl z-20 border border-white/10"
            >
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-slate-900">
                <img
                  src="/img/home.png"
                  alt="App Home"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -20, rotate: 5 }}
              animate={{ y: 0, rotate: 8 }}
              className="absolute w-44 lg:w-56 aspect-[9/19.5] bg-slate-950 rounded-[2.2rem] p-1.5 shadow-2xl z-10 border border-white/10 ml-40 mt-20 opacity-50 lg:opacity-100"
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-slate-900">
                <img
                  src="/img/income.png"
                  alt="Analytics"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SECURITY SECTION --- */}
        <section className="py-24 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-100 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <Lock className="w-7 h-7 text-emerald-600" />
                </div>
                <h2 className="text-4xl font-black tracking-tight">
                  Your data is yours. <br />
                  <span className="text-emerald-500">Fully Encrypted.</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                  Powered by **Supabase Auth & PostgreSQL**, we ensure your
                  financial records are invisible even to us.
                </p>
                <ul className="space-y-4">
                  {[
                    "AES-256 Row Level Encryption",
                    "Masked Personal Identity Records",
                    "Secure Local Data Storage",
                    "No Third-Party Financial Access",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 font-semibold text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                    Admin Panel Preview
                  </h4>
                  <div className="space-y-6">
                    <DataField label="Name" value="J**** F*****" />
                    <DataField label="Number" value="09*******" />
                    <DataField label="Email" value="j*******@gmail.com" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CORE FEATURES GRID --- */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Built for Financial Discipline.
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Everything you need to track every Centavo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* --- SHARE EXPERIENCE SECTION --- */}
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/5 rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none">
            <div className="w-full lg:w-5/12 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <MessageSquare className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black tracking-tight italic text-slate-900 dark:text-white leading-none">
                    Share Experience
                  </h2>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    Community feedback drive growth.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-emerald-500 transition-colors mb-1.5 block ml-1">
                    Registered Email
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-emerald-500 transition-colors mb-1.5 block ml-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you love..."
                    className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none font-medium text-sm text-slate-900 dark:text-white"
                  />
                </div>

                {status && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-3 rounded-xl text-[10px] font-bold flex items-center gap-2 ${status.type === "success"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-red-500/10 text-red-600"
                      }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5" />
                    )}
                    {status.msg}
                  </motion.div>
                )}

                <button
                  disabled={loading}
                  className="group w-full bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white p-4 rounded-xl font-black text-xs flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
                >
                  {loading ? "Sending..." : "POST FEEDBACK"}
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>

            <div className="w-full lg:w-7/12 bg-slate-50/50 dark:bg-black/40 p-8 flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
              <div className="relative w-full max-w-sm h-[380px] lg:h-[400px] flex items-center justify-center scale-90 lg:scale-100">
                <motion.div
                  initial={{ opacity: 0, x: 40, rotateY: -25 }}
                  whileInView={{ opacity: 0.2, x: 50, rotateY: -25 }}
                  className="absolute w-40 aspect-[9/19.5] bg-slate-950 rounded-[2rem] p-1 shadow-2xl border border-white/5 hidden sm:block"
                >
                  <div className="w-full h-full rounded-[1.8rem] overflow-hidden">
                    <img
                      src="/img/login.png"
                      alt="Login"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20, rotateY: 15 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 15 }}
                  className="relative w-44 lg:w-48 aspect-[9/19.5] bg-slate-950 rounded-[2.2rem] p-1 shadow-2xl z-20 border border-white/20"
                >
                  <div className="w-full h-full rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5">
                    <img
                      src="/img/register.png"
                      alt="Register"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -right-6 top-1/4 bg-white dark:bg-emerald-500 p-3 rounded-2xl shadow-xl z-30 flex items-center gap-2 border border-slate-100 dark:border-none"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-white" />
                    <span className="text-[9px] font-black text-slate-900 dark:text-white uppercase">
                      Verified
                    </span>
                  </motion.div>
                </motion.div>
              </div>

              <div className="mt-6 text-center z-10">
                <div className="inline-flex items-center gap-2 text-[9px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full mb-2 uppercase">
                  Material You
                </div>
                <p className="text-[10px] font-bold text-slate-400 max-w-[180px]">
                  Seamless notch-free experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEEDBACK DISPLAY GRID --- */}
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 dark:border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {feedbacks.slice(0, visibleCount).map((fb) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={fb.id}
                  className="relative bg-white dark:bg-[#111] p-6 lg:p-8 rounded-[2rem] border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <Quote className="text-emerald-500 w-8 h-8 opacity-20 group-hover:opacity-100 transition-all mb-4" />
                    <p className="text-md font-bold leading-snug mb-6 text-slate-800 dark:text-slate-200 italic">
                      "{fb.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-slate-50 dark:border-white/5 pt-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                      {fb.profiles?.full_name?.charAt(0) || "U"}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-black text-xs text-slate-900 dark:text-white truncate">
                        {getFirstName(fb.profiles?.full_name)}
                      </h4>
                      <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">
                        {new Date(fb.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {feedbacks.length > visibleCount && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white/5 text-white dark:text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all"
              >
                LOAD MORE STORIES <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>

        {/* --- CALL TO ACTION --- */}
        <section className="max-w-5xl mx-auto px-6 pb-32">
          <div className="bg-emerald-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <h2 className="text-4xl lg:text-6xl font-black mb-8 relative z-10">
              Start your Ipon journey <br /> with MoneyGa.
            </h2>
            <div className="relative z-10 flex flex-col items-center gap-4">
              {/* --- ONLY VISIBLE ON ANDROID --- */}
              {isAndroid ? (
                <a
                  href="https://github.com/Flamiano/moneyga-app/releases/download/v1.0.0/MoneyGa.apk"
                  
                  download="MoneyGa.apk"
                  className="inline-block relative z-10 bg-white text-emerald-600 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-xl active:scale-95"
                >
                  Download for Android
                </a>
              ) : (
                <p className="text-emerald-50/70 text-[10px] font-bold uppercase tracking-widest">
                  Installation available on Android devices only
                </p>
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

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
        {React.cloneElement(icon, { className: "w-7 h-7" })}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
        {desc}
      </p>
    </motion.div>
  );
}

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </span>
      <div className="flex items-center justify-between bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-slate-100 dark:border-white/5">
        <span className="font-mono text-slate-700 dark:text-slate-200">
          {value}
        </span>
        <EyeOff className="w-4 h-4 text-slate-300" />
      </div>
    </div>
  );
}