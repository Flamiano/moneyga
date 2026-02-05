"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/util/supabase";
import {
  Github,
  Twitter,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  TrendingUp,
  MapPin,
  Loader2,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("Detecting location...");

  // Newsletter States
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error" | "loading";
    msg: string;
  }>({
    type: "idle",
    msg: "",
  });

  useEffect(() => {
    async function fetchUserCount() {
      const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      if (!error && count !== null) {
        setUserCount(count);
      }
    }

    async function fetchLocation() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.city) {
          setLocation(
            `${data.city}, ${data.country_name || data.country_code}`
          );
        }
      } catch (err) {
        setLocation("Quezon City, PH");
      }
    }

    fetchUserCount();
    fetchLocation();
  }, []);

  // Auto-reset status after 3 seconds so user can search again
  useEffect(() => {
    if (status.type === "success" || status.type === "error") {
      const timer = setTimeout(() => {
        setStatus({ type: "idle", msg: "" });
        setEmail(""); // Optional: clears input for next search
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleCheckUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status.type === "loading") return;

    setStatus({ type: "loading", msg: "Checking database..." });

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email.trim().toLowerCase())
        .single();

      if (error || !data) {
        setStatus({ type: "error", msg: "Not a registered member yet." });
      } else {
        setStatus({ type: "success", msg: "Member verified!" });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Verification failed. Try again." });
    }
  };

  const formattedCount = userCount ? userCount.toLocaleString() : "5,000";

  return (
    <footer className="bg-white dark:bg-black border-t border-slate-200 dark:border-white/10 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/20">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
                Money<span className="text-emerald-500">Ga</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed mb-6">
              The next-generation financial community platform. Connect, share,
              and grow your wealth together with transparency.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink
                href="#"
                icon={<MessageSquare className="w-5 h-5" />}
              />
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest">
              Resources
            </h4>
            <ul className="space-y-4">
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/analytics">Analytics</FooterLink>
              <FooterLink href="/community">Forum</FooterLink>
              <FooterLink href="/blogs">Financial Blog</FooterLink>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest">
              Ecosystem
            </h4>
            <ul className="space-y-4">
              <FooterLink href="/api-access">API Access</FooterLink>
              <FooterLink href="/partners">Partners</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest">
              Legal
            </h4>
            <ul className="space-y-4">
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms-conditions">Terms of Use</FooterLink>
            </ul>
          </div>

          {/* Newsletter / Dynamic CTA */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3 text-emerald-500" />
              {location}
            </h4>
            <form onSubmit={handleCheckUser} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/10 p-3.5 rounded-xl text-xs focus:outline-none transition-all pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                />
                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-white rounded-lg hover:bg-emerald-500 transition-all flex items-center justify-center disabled:opacity-50 min-w-[44px]"
                >
                  {status.type === "loading" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                  ) : (
                    <span className="text-[10px] font-black tracking-tighter flex items-center">
                      <span className="text-slate-900 dark:text-white">M</span>
                      <span className="text-emerald-500">G</span>
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Status Message */}
            <div className="h-4">
              {" "}
              {/* Fixed height wrapper to prevent layout jump */}
              {status.msg && (
                <p
                  className={`mt-2 text-[10px] font-bold ${
                    status.type === "error"
                      ? "text-red-500"
                      : "text-emerald-500"
                  }`}
                >
                  {status.msg}
                </p>
              )}
            </div>

            {/* Dynamic Registered Users Count */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border-2 border-white dark:border-black bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden"
                  >
                    <div className="w-full h-full bg-gradient-to-tr from-emerald-400 to-blue-400 opacity-80" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-tight uppercase">
                JOIN <span className="text-emerald-500">{formattedCount}+</span>{" "}
                USERS
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-white/5 gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded-md">
              LIVE
            </span>
            © {currentYear} MoneyGa, Inc.
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-full border border-slate-200 dark:border-white/10 scale-90 sm:scale-100">
            <button className="p-2 hover:text-emerald-500 transition-colors">
              <Globe className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-slate-300 dark:bg-white/10 mx-1" />
            <button className="p-2 hover:text-emerald-500 transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-slate-300 dark:bg-white/10 mx-1" />
            <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-black rounded-full shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase text-slate-900 dark:text-white">
                System Stable
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors font-medium flex items-center group"
      >
        {children}
        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-slate-400 hover:text-emerald-500 transition-colors p-2 hover:bg-emerald-500/5 rounded-xl border border-transparent hover:border-emerald-500/10"
    >
      {icon}
    </Link>
  );
}
