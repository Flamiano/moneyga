"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Search,
  Sun,
  Moon,
  PieChart,
  BookOpen,
  FileText,
  Clock,
  ExternalLink,
} from "lucide-react";

/**
 * 1. SEARCH REGISTRY
 * Updated to match TOC_CONFIG IDs and Project Proposal details
 */
const SEARCHABLE_PAGES = [
  // Overview Section
  {
    title: "Introduction to MoneyGa",
    path: "/docs#introduction",
    category: "Overview",
    keywords: "help, guide, introduction, moneyga, jessa brogada",
  },
  {
    title: "Scope & Limitations",
    path: "/docs#limitations",
    category: "Overview",
    keywords: "limitations, android, peso, manual input, boundaries",
  },
  {
    title: "Security Architecture",
    path: "/docs#security",
    category: "Overview",
    keywords: "postgresql, rls, vault, security, data protection",
  },
  // Quick Start Section
  {
    title: "Installation Guide",
    path: "/docs#installation",
    category: "Quick Start",
    keywords: "install, setup, start, apk, download, android",
  },
  {
    title: "System Boundaries",
    path: "/docs#boundaries",
    category: "Quick Start",
    keywords: "constraints, manual entry, no bank sync",
  },
  // Project Scope Section
  {
    title: "Project Goals",
    path: "/docs#goals",
    category: "Project Scope",
    keywords: "discipline, awareness, goals, objectives, mission",
  },
  {
    title: "Tech Stack",
    path: "/docs#tech-stack",
    category: "Project Scope",
    keywords: "nextjs, supabase, tailwind, framer motion",
  },
  // Main Pages
  {
    title: "Financial Analytics",
    path: "/analytics",
    category: "Data",
    keywords: "charts, reports, spending, dashboard, graphs",
  },
  {
    title: "Mobile App Proposal",
    path: "/blogs",
    category: "Blog",
    keywords: "moneyga, proposal, project, blog, jessa",
  },
  {
    title: "Privacy & Terms",
    path: "/terms-conditions",
    category: "Legal",
    keywords: "terms, privacy, rules, scope, peso, currency",
  },
];

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof SEARCHABLE_PAGES>(
    []
  );
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // PH Time Logic
  useEffect(() => {
    const updateTime = () => {
      const phTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setTime(phTime);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme & Click Outside Setup
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, mounted]);

  // Search Logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filtered = SEARCHABLE_PAGES.filter(
      (page) =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.keywords.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  /**
   * Enhanced Navigation Logic
   * Handles smooth scrolling for anchor IDs (#)
   */
  const handleSearchNavigation = (path: string) => {
    router.push(path);
    setIsSearchFocused(false);
    setSearchQuery("");

    if (path.includes("#")) {
      const id = path.split("#")[1];
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  const handleHamburgerClick = () => {
    if (pathname.startsWith("/docs") && onMenuClick) {
      onMenuClick();
    } else {
      setIsOpen(!isOpen);
    }
  };

  if (!mounted) return <div className="h-20 w-full" />;

  return (
    <nav className="fixed top-0 w-full z-[100] font-sans">
      <div className="absolute inset-0 bg-white/80 dark:bg-black/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 transition-colors duration-500 z-[-1]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/img/logo.png"
                alt="Logo"
                className="w-9 h-9 lg:w-11 lg:h-11 rounded-full shadow-sm"
              />
              <span className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white">
                Money<span className="text-emerald-500">Ga</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink
                href="/docs"
                active={pathname.startsWith("/docs")}
                icon={<FileText className="w-4 h-4" />}
              >
                Docs
              </NavLink>
              <NavLink
                href="/analytics"
                active={pathname === "/analytics"}
                icon={<PieChart className="w-4 h-4" />}
              >
                Analytics
              </NavLink>
              <NavLink
                href="/blogs"
                active={pathname === "/blogs"}
                icon={<BookOpen className="w-4 h-4" />}
              >
                Blogs
              </NavLink>
            </div>
          </div>

          {/* Right Tools */}
          <div className="flex items-center gap-3">
            {/* Clock Display */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tabular-nums uppercase tracking-wider">
                PH: {time}
              </span>
            </div>

            {/* Functional Search Bar */}
            <div className="relative hidden md:block" ref={searchRef}>
              <div
                className={`flex items-center gap-3 bg-slate-100 dark:bg-white/5 border px-4 py-2 rounded-xl w-64 transition-all duration-300 ${
                  isSearchFocused
                    ? "ring-2 ring-emerald-500/50 border-emerald-500/50 w-80"
                    : "border-slate-200 dark:border-white/10"
                }`}
              >
                <Search
                  className={`w-4 h-4 ${
                    isSearchFocused ? "text-emerald-500" : "text-slate-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="bg-transparent border-none outline-none text-sm dark:text-slate-200 w-full placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 w-full bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 z-[110]"
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchNavigation(result.path)}
                          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors group text-left"
                        >
                          <div>
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">
                              {result.category}
                            </p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                              {result.title}
                            </p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-slate-500 font-medium">
                        No results for "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-all active:scale-90"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={handleHamburgerClick}
              className="lg:hidden p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors"
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden relative z-[101] bg-white dark:bg-black border-b border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Manila, PH
                </span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {time}
                </span>
              </div>

              <MobileNavLink
                href="/docs"
                active={pathname.startsWith("/docs")}
                icon={<FileText className="w-5 h-5" />}
                onClick={() => setIsOpen(false)}
              >
                Docs
              </MobileNavLink>
              <MobileNavLink
                href="/analytics"
                active={pathname === "/analytics"}
                icon={<PieChart className="w-5 h-5" />}
                onClick={() => setIsOpen(false)}
              >
                Analytics
              </MobileNavLink>
              <MobileNavLink
                href="/blogs"
                active={pathname === "/blogs"}
                icon={<BookOpen className="w-5 h-5" />}
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </MobileNavLink>

              <div className="pt-4">
                <button className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Sub-components
function NavLink({
  href,
  children,
  icon,
  active,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all relative group ${
        active
          ? "text-emerald-500 dark:text-emerald-400"
          : "text-slate-500 dark:text-slate-400 hover:text-emerald-500"
      }`}
    >
      {icon} {children}
      <span
        className={`absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 transition-transform origin-left duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

function MobileNavLink({ href, children, icon, onClick, active }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-4 p-4 text-base font-bold rounded-2xl transition-colors border ${
        active
          ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
          : "text-slate-800 dark:text-slate-200 border-transparent"
      }`}
    >
      <div
        className={`p-2 rounded-lg ${
          active
            ? "bg-emerald-500 text-white"
            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        }`}
      >
        {icon}
      </div>
      {children}
    </Link>
  );
}
