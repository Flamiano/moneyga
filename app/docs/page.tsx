"use client";
import React, { useState, useEffect } from "react";
import DocsSidebar from "@/app/comps/docs-sidebar/page";
import {
  ChevronRight,
  Download,
  Code2,
  Database,
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  Globe,
  PlayCircle,
  Lock,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../comps/navbar/page";
import { motion, AnimatePresence } from "framer-motion";

// Import your sub-components
import QuickStart from "./QuickStart";
import ProjectScope from "./ProjectScope";
import Footer from "../comps/footer/page";

// --- CONFIGURATION ---
const TOC_CONFIG: Record<string, { id: string; label: string }[]> = {
  Overview: [
    { id: "introduction", label: "Introduction" },
    { id: "limitations", label: "Scope & Limitations" },
    { id: "discipline", label: "Financial Discipline" },
    { id: "security", label: "Security Architecture" },
  ],
  "Quick Start": [
    { id: "launch", label: "Launch Your Vault" },
    { id: "installation", label: "Installation" },
    { id: "boundaries", label: "System Boundaries" },
  ],
  "Project Scope": [
    { id: "goals", label: "Project Goals" },
    { id: "tech-stack", label: "Tech Stack" },
  ],
};

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeSection, setActiveSection] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // NEW: State for Mobile Hamburger Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 1. PERSISTENCE: LOAD ON REFRESH ---
  useEffect(() => {
    const savedTab = localStorage.getItem("moneyga_active_tab");
    if (savedTab && TOC_CONFIG[savedTab]) {
      setActiveTab(savedTab);
    }
    setIsMounted(true);
  }, []);

  // --- 2. PERSISTENCE & AUTO-SCROLL TOP ---
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("moneyga_active_tab", activeTab);
      setActiveSection("");
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [activeTab, isMounted]);

  // --- 3. SCROLL SPY LOGIC ---
  useEffect(() => {
    if (!isMounted) return;

    const observerTimer = setTimeout(() => {
      const currentSections = TOC_CONFIG[activeTab] || [];
      if (currentSections.length === 0) return;

      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );

      currentSections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, 150);

    return () => clearTimeout(observerTimer);
  }, [activeTab, isMounted]);

  // --- RENDER CONTENT HANDLER ---
  const renderContent = () => {
    if (!isMounted) return null;

    switch (activeTab) {
      case "Quick Start":
        return <QuickStart key="quick-start" />;
      case "Project Scope":
        return <ProjectScope key="project-scope" />;
      case "Overview":
      default:
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 selection:bg-emerald-100 dark:selection:bg-emerald-900/30 overflow-x-hidden"
          >
            <header className="mb-12">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white mb-6 leading-[1.1]">
                Master Your{" "}
                <span className="text-emerald-500 italic">Peso</span> Flow
              </h1>
              <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed font-medium">
                MoneyGa is a high-performance Android finance tool designed to
                bridge the gap between daily Filipino spending habits and
                long-term financial stability. Built with precision, focused on
                privacy.
              </p>
            </header>

            <hr className="border-slate-100 dark:border-white/5 mb-16" />

            {/* INTRODUCTION */}
            <section id="introduction" className="scroll-mt-24 space-y-8 mb-24">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                <h2 className="text-3xl font-black tracking-tight dark:text-white">
                  Introduction
                </h2>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400">
                <p className="text-lg leading-relaxed">
                  MoneyGa (Money-Gastos) is born from a simple observation: most
                  finance apps are too complex for the average Filipino user or
                  require dangerous bank integrations. Our philosophy centers on{" "}
                  <span className="text-emerald-500 font-bold underline decoration-emerald-500/30">
                    Manual Consciousness
                  </span>
                  . By manually inputting every ₱50 spent on a jeepney ride or
                  ₱150 on a coffee, you create a psychological barrier to
                  overspending.
                </p>

                <div className="my-10 rounded-3xl overflow-hidden border border-slate-100 dark:border-white/10 bg-slate-950 aspect-video shadow-2xl relative group">
                  <video
                    src="/video/IponTracker.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-white font-bold mb-2">
                      <PlayCircle className="w-5 h-5 text-emerald-500" />
                      Visualizing the Ipon Tracker
                    </div>
                    <p className="text-xs text-slate-300 max-w-sm font-medium">
                      Watch how MoneyGa animates your progress as you hit your
                      daily savings goals.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-3xl">
                    <Code2 className="w-8 h-8 text-emerald-500 mb-4" />
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                      React Native Core
                    </h4>
                    <p className="text-sm">
                      Leveraging the power of the React ecosystem to deliver
                      60FPS animations. Optimized for lower-end Android devices
                      commonly used in the Philippines.
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-3xl">
                    <Database className="w-8 h-8 text-emerald-500 mb-4" />
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                      Supabase Backend
                    </h4>
                    <p className="text-sm">
                      Real-time sync across your devices. Even if you lose your
                      phone, your records remain encrypted and safely stored in
                      the cloud via PostgreSQL.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-black pt-8 dark:text-white">
                  Interface Overview
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { src: "/img/login.png", label: "Access" },
                    { src: "/img/home.png", label: "Dashboard" },
                    { src: "/img/income.png", label: "Flow" },
                    { src: "/img/register.png", label: "Onboarding" },
                  ].map((img, i) => (
                    <div key={i} className="space-y-2">
                      <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-white/10 hover:border-emerald-500/50 transition-all shadow-sm bg-slate-100 dark:bg-white/5">
                        <img
                          src={img.src}
                          alt={img.label}
                          className="w-full grayscale-[50%] hover:grayscale-0 transition-all cursor-zoom-in"
                        />
                      </div>
                      <p className="text-[10px] text-center font-bold uppercase tracking-widest text-slate-400">
                        {img.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* LIMITATIONS */}
            <section id="limitations" className="scroll-mt-24 space-y-8 mb-24">
              <h2 className="text-3xl font-black tracking-tight dark:text-white flex items-center gap-3">
                <Zap className="text-emerald-500" /> Scope & Limitations
              </h2>
              <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  To maintain the highest level of security and specialized
                  focus, MoneyGa operates within strict boundaries. Currently,
                  we prioritize the <strong>Android Ecosystem</strong> (min SDK
                  24) to cater to the majority of the local market.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                    <Globe className="w-5 h-5 text-emerald-500" />
                    <h5 className="font-bold text-slate-900 dark:text-white">
                      Local Currency Only
                    </h5>
                    <p className="text-xs">
                      Exclusively supports PHP (₱). Multi-currency support is
                      omitted to keep the UI clean and relevant to local
                      transactions.
                    </p>
                  </div>
                  <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                    <BarChart3 className="w-5 h-5 text-emerald-500" />
                    <h5 className="font-bold text-slate-900 dark:text-white">
                      Pure Manual Input
                    </h5>
                    <p className="text-xs">
                      No automatic bank scraping. We believe your banking
                      credentials should never be shared with third-party apps.
                    </p>
                  </div>
                  <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                    <Users className="w-5 h-5 text-emerald-500" />
                    <h5 className="font-bold text-slate-900 dark:text-white">
                      User Testing
                    </h5>
                    <p className="text-xs">
                      Limited to 30 selected community users for the initial
                      phase to ensure stability and feature relevance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* DISCIPLINE */}
            <section id="discipline" className="scroll-mt-24 space-y-8 mb-24">
              <h2 className="text-3xl font-black tracking-tight dark:text-white">
                Financial Discipline
              </h2>
              <div className="bg-emerald-500/5 p-8 rounded-[2.5rem] border border-emerald-500/10 space-y-6">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Financial freedom is 20% knowledge and 80% behavior. MoneyGa's{" "}
                  <strong>Discipline Framework</strong> helps you visualize your
                  "lifestyle inflation." By categorizing expenses into{" "}
                  <em>Needs</em>, <em>Wants</em>, and <em>Bills</em>, you get a
                  clear picture of whether your salary is working for you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Set strict monthly limits for 'Luho'.",
                    "Receive visual alerts at 80% budget.",
                    "Track hidden 'sunk costs' easily.",
                    "Achieve 100% conscious spending.",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                        {i + 1}
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECURITY */}
            <section id="security" className="scroll-mt-24 space-y-8 mb-24">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                <h2 className="text-3xl font-black tracking-tight dark:text-white">
                  Security Architecture
                </h2>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                <div className="flex flex-col xl:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-6">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Security is our top priority. MoneyGa utilizes{" "}
                      <span className="text-emerald-500 font-bold">
                        PostgreSQL Row Level Security (RLS)
                      </span>{" "}
                      to ensure hardware-level isolation. Not even database
                      admins can access raw spending data without proper keys.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-xl font-bold dark:text-white flex items-center gap-2">
                        <Lock className="w-5 h-5 text-emerald-500" /> Admin-Side
                        Data Masking
                      </h4>
                      <p className="text-sm text-slate-500">
                        Our administrative dashboard uses{" "}
                        <strong>Zero-Visibility Protocols</strong>. PII data is
                        masked to prevent internal exposure.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-[#0f0f0f] shadow-xl">
                      <div className="bg-slate-50 dark:bg-white/5 px-4 py-2 border-b border-slate-200 dark:border-white/10 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest ml-2">
                          Secure_Admin_Vault
                        </span>
                      </div>
                      <div className="p-4 overflow-x-auto">
                        <table className="w-full text-[11px] font-mono">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-100 dark:border-white/5 text-left">
                              <th className="pb-2 font-medium">USER_ID</th>
                              <th className="pb-2 font-medium">EMAIL_MASK</th>
                              <th className="pb-2 font-medium">PHONE_MASK</th>
                              <th className="pb-2 font-medium">STATUS</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-600 dark:text-slate-300">
                            <tr className="border-b border-slate-100 dark:border-white/5">
                              <td className="py-3">UID_8821</td>
                              <td className="py-3 font-bold">
                                j*****17@gmail.com
                              </td>
                              <td className="py-3">09******239</td>
                              <td className="py-3 text-emerald-500 underline underline-offset-4">
                                [SECURE]
                              </td>
                            </tr>
                            <tr>
                              <td className="py-3">UID_9042</td>
                              <td className="py-3 font-bold">
                                m*****ga@gmail.com
                              </td>
                              <td className="py-3">09******112</td>
                              <td className="py-3 text-emerald-500 underline underline-offset-4">
                                [SECURE]
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="w-full xl:w-72 shrink-0 space-y-4">
                    <img
                      src="/img/login.png"
                      alt="Security"
                      className="w-full rounded-3xl shadow-2xl border border-emerald-500/20 rotate-2"
                    />
                  </div>
                </div>

                <div className="p-6 bg-slate-900 rounded-3xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldCheck className="w-24 h-24 text-white" />
                  </div>
                  <h5 className="text-emerald-500 font-mono text-xs mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    AES-256 LOGS_ACTIVE
                  </h5>
                  <p className="text-white/60 text-[11px] leading-relaxed font-mono relative z-10">
                    "All administrative actions are immutable and logged.
                    Database admins cannot view raw balance figures or
                    transaction history."
                  </p>
                </div>
              </div>
            </section>

            <Footer />
          </motion.div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
      {/* MODIFIED: Pass the open function to Navbar. 
         Ensure your Navbar component calls this when the hamburger is clicked.
      */}
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />

      {/* MODIFIED: Pass the state and close function to the Sidebar
       */}
      <DocsSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 lg:pl-72 xl:pr-80 pt-16">
        <div className="max-w-4xl mx-auto py-12 px-6 lg:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
            <Link
              href="/docs"
              className="hover:text-emerald-500 transition-colors"
            >
              Documentation
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-emerald-500">{activeTab}</span>
          </div>

          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </main>

      {/* --- TABLE OF CONTENTS (RIGHT SIDEBAR) --- */}
      <aside className="fixed right-0 top-16 w-80 h-[calc(100vh-64px)] py-12 px-8 hidden xl:block border-l border-slate-100 dark:border-white/5">
        <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
          On this page
        </h4>
        <nav className="space-y-1">
          {TOC_CONFIG[activeTab]?.map((section) => (
            <TOCLink
              key={section.id}
              id={section.id}
              active={activeSection === section.id}
            >
              {section.label}
            </TOCLink>
          ))}
        </nav>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5">
          <div className="bg-slate-50 dark:bg-white/[0.02] p-4 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase">
              System Status
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              All Systems Operational
            </div>
            <button className="w-full flex items-center justify-between gap-2 p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold transition-all transform active:scale-95">
              DOWNLOAD APK <Download className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

// TOCLink Component with Smooth Scroll Logic
function TOCLink({
  id,
  children,
  active,
}: {
  id: string;
  children: React.ReactNode;
  active: boolean;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      className={`block py-1.5 text-[11px] font-bold transition-all duration-300 border-l-2 px-4 ${
        active
          ? "text-emerald-500 border-emerald-500 bg-emerald-500/5 translate-x-1"
          : "text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      {children}
    </a>
  );
}
  