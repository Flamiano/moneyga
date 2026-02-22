"use client";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Download,
  MailCheck,
  ShieldCheck,
  Zap,
  ShieldAlert,
  CloudCog,
  Smartphone,
  LayoutDashboard,
  ArrowRight,
  Info,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function QuickStart() {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // Device Detection Logic
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
      setIsAndroid(true);
    }
  }, []);

  const handleAction = () => {
    if (isAndroid) {
      // Direct link to your APK
      window.location.href = "https://github.com/Flamiano/moneyga-app/releases/download/v1.0.0/MoneyGa.apk";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16 pb-20"
    >
      {/* Header Section */}
      <motion.header variants={itemVariants} className="space-y-4 scroll-mt-24" id="launch">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wider uppercase border border-emerald-500/20">
          <Zap className="w-3 h-3 animate-pulse" /> Fast Track Launch
        </div>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-950 dark:text-white leading-[1.1]">
          Launch Your <span className="text-emerald-500 italic">Vault</span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed font-medium">
          MoneyGa is designed for those who value speed and privacy. Deploy your
          personal financial command center in under 3 minutes.
        </p>
      </motion.header>

      <hr className="border-slate-100 dark:border-white/5" />

      {/* Step-by-Step Flow */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 01: Installation */}
        <motion.div
          id="installation"
          whileHover={{ y: -8 }}
          className="group relative p-8 bg-slate-50 dark:bg-white/[0.02] rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 transition-all scroll-mt-24 overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors">
            <Download size={160} />
          </div>
          <div className="w-14 h-14 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
            <Smartphone className="w-7 h-7 text-emerald-500 group-hover:text-white" />
          </div>
          <h3 className="font-bold text-2xl mb-4 dark:text-white">01. Installation</h3>
          <div className="space-y-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            <p>
              Download the latest{" "}
              <code className="bg-emerald-500/10 text-emerald-600 px-1 rounded font-mono">.apk</code> build directly to
              your Android device.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 italic">
                <ArrowRight size={12} className="text-emerald-500" /> Enable "Unknown Sources" in Settings
              </li>
              <li className="flex items-center gap-2 italic">
                <ArrowRight size={12} className="text-emerald-500" /> Run installer and grant permissions
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Step 02: Secure Access */}
        <motion.div
          id="setup"
          whileHover={{ y: -8 }}
          className="group relative p-8 bg-slate-50 dark:bg-white/[0.02] rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 transition-all scroll-mt-24 overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors">
            <MailCheck size={160} />
          </div>
          <div className="w-14 h-14 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
            <MailCheck className="w-7 h-7 text-emerald-500 group-hover:text-white" />
          </div>
          <h3 className="font-bold text-2xl mb-4 dark:text-white">02. Secure Access</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            MoneyGa uses <strong>Gmail-only authentication</strong> to ensure data integrity.
          </p>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li className="flex items-center gap-2 italic font-medium text-emerald-600 dark:text-emerald-400">
              <ShieldAlert size={12} /> Email Verification Required
            </li>
          </ul>
        </motion.div>
      </motion.section>

      {/* Core Experience Section */}
      <motion.section variants={itemVariants} className="bg-emerald-500/[0.03] rounded-[3rem] p-10 border border-emerald-500/10">
        <h2 className="text-2xl font-black mb-10 dark:text-white uppercase tracking-tight">The Core Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureItem icon={<LayoutDashboard />} title="Dashboard" desc="Real-time breakdown of Ipon goals." />
          <FeatureItem icon={<CloudCog />} title="Zero-Latency" desc="Log offline; sync when online." />
          <FeatureItem icon={<ShieldCheck />} title="E2E Encryption" desc="Your data is hashed locally." />
        </div>
      </motion.section>

      {/* System Boundaries */}
      <motion.section variants={itemVariants} className="space-y-6 scroll-mt-24" id="boundaries">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-emerald-500 rounded-full" />
          <h2 className="text-3xl font-black tracking-tight dark:text-white uppercase">System Boundaries</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BoundaryBox type="features" title="MoneyGa Features" items={[
            "Offline-first transaction logging", "Encrypted cloud synchronization", "Ipon goal visualizations", "Native Biometric integration"
          ]} />
          <BoundaryBox type="restrictions" title="Platform Restrictions" items={[
            "No automated bank scraping", "Android only (No iOS support)", "No investment trading features"
          ]} />
        </div>
      </motion.section>

      {/* Dynamic Footer Button */}
      <motion.footer
        variants={itemVariants}
        className="p-10 bg-slate-950 rounded-[3rem] text-white flex flex-col lg:flex-row items-center gap-10 justify-between shadow-2xl border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck className="w-48 h-48" />
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="p-5 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 backdrop-blur-sm">
            <ShieldCheck className="w-12 h-12 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-2xl font-bold mb-2 tracking-tight">Privacy Focused</h4>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Your financial data is yours alone. MoneyGa never sees your personal logs.
            </p>
          </div>
        </div>

        {isAndroid ? (
          <motion.button
            onClick={handleAction}
            whileHover={{ scale: 1.05, backgroundColor: "#10b981" }}
            whileTap={{ scale: 0.95 }}
            className="w-full lg:w-auto bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 transition-all whitespace-nowrap relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            Begin Setup <ArrowRight size={20} />
          </motion.button>
        ) : (
          <div className="relative z-10 w-full lg:w-auto flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl text-slate-400 cursor-not-allowed">
              <Smartphone className="w-5 h-5 opacity-50" />
              <span className="font-black text-sm uppercase tracking-widest">Available on Android</span>
            </div>
            <p className="text-[10px] text-emerald-500/60 font-bold uppercase flex items-center gap-1">
              <Info size={12} /> Open on your android to download
            </p>
          </div>
        )}
      </motion.footer>
    </motion.div>
  );
}

// Helper Components
function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="space-y-3">
      <div className="text-emerald-500">{icon}</div>
      <h4 className="font-bold dark:text-white">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function BoundaryBox({ type, title, items }: { type: 'features' | 'restrictions', title: string, items: string[] }) {
  const isFeature = type === 'features';
  return (
    <div className={`p-8 rounded-[2.5rem] border ${isFeature ? 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/10' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10'}`}>
      <h4 className={`flex items-center gap-2 font-bold mb-6 text-lg ${isFeature ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
        {isFeature ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />} {title}
      </h4>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isFeature ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}