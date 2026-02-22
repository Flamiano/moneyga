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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTab = localStorage.getItem("moneyga_active_tab");
    if (savedTab && TOC_CONFIG[savedTab]) {
      setActiveTab(savedTab);
    }
    setIsMounted(true);
  }, []);

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
          </motion.div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden font-sans">
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />

      {/* LEFT SIDEBAR - Ensure it has z-index to cover content on mobile */}
      <DocsSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />


      {/* MAIN CONTENT AREA */}
      <main className="w-full pt-16 lg:ml-72 xl:mr-80 transition-all duration-300">
        <div className="max-w-4xl mx-auto py-12 px-6 md:px-12">
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
        <Footer />
      </main>

      {/* RIGHT SIDEBAR (TOC) */}
      <aside className="fixed right-0 top-16 w-80 h-[calc(100vh-64px)] py-12 px-8 hidden xl:block border-l border-slate-100 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm">
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
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                System Status
              </p>
              <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-200 dark:bg-white/10 rounded-md text-slate-500">
                v1.0.0
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-500">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              All Systems Operational
            </div>

            <a
              href="https://github.com/Flamiano/moneyga-app/releases/download/v1.0.0/MoneyGa.apk"
              download="MoneyGa.apk"
              className="w-full flex items-center justify-between gap-2 p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black transition-all transform active:scale-[0.98] shadow-lg shadow-emerald-500/10"
            >
              DOWNLOAD LATEST APK
              <Download className="w-3.5 h-3.5 animate-bounce" />
            </a>

            <p className="text-[9px] text-center text-slate-400 font-medium italic">
              Optimized for Android 11 and above
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

// TOCLink remains the same...
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
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      className={`block py-1.5 text-[11px] font-bold transition-all duration-300 border-l-2 px-4 ${active
        ? "text-emerald-500 border-emerald-500 bg-emerald-500/5 translate-x-1"
        : "text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white"
        }`}
    >
      {children}
    </a>
  );
}
