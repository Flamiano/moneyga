"use client";
import React from "react";
import { Info, Layers, Zap, X } from "lucide-react";

interface DocsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean; // New prop for mobile
  onClose?: () => void; // New prop for mobile
}

export default function DocsSidebar({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
}: DocsSidebarProps) {
  const navContent = (
    <div className="p-6">
      {/* Mobile Close Button */}
      <div className="flex justify-end lg:hidden mb-4">
        <button onClick={onClose} className="p-2 text-slate-500">
          <X />
        </button>
      </div>

      <nav className="space-y-8">
        <div>
          <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
            The Basics
          </h4>
          <div className="space-y-1">
            {[
              { id: "Overview", icon: Info },
              { id: "Quick Start", icon: Zap },
              { id: "Project Scope", icon: Layers },
            ].map((item) => (
              <SidebarLink
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose(); // Close drawer on mobile click
                }}
                active={activeTab === item.id}
                icon={item.icon}
              >
                {item.id}
              </SidebarLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-16 w-72 h-[calc(100vh-64px)] bg-white dark:bg-[#0a0a0a] border-r border-slate-100 dark:border-white/5 overflow-y-auto z-40 hidden lg:block custom-scrollbar">
        {navContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="fixed left-0 top-0 w-80 h-full bg-white dark:bg-[#0a0a0a] shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarLink({ children, active, icon: Icon, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 text-sm lg:text-xs font-bold rounded-xl transition-all ${
        active
          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 shadow-sm"
          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
