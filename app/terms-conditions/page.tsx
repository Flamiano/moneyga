"use client";
import Navbar from "../comps/navbar/page";
import {
  Scale,
  Smartphone,
  AlertCircle,
  Coins,
  ClipboardCheck,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../comps/footer/page";

export default function TermsConditions() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const sectionVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#060606] transition-colors duration-500 text-slate-900 dark:text-white pb-32">
      <Navbar />

      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-4">
              <Scale className="w-4 h-4" /> Legal Framework
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-8">
              Terms of <span className="text-emerald-500 italic">Service.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-12">
              Please read these terms carefully as they define the scope and
              limitations of the MoneyGa project as presented in our technical
              proposal.
            </p>
          </motion.div>

          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* 1. Scope of Service */}
            <motion.section variants={sectionVars} className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-emerald-500" /> 1. Scope of
                Service
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                MoneyGa is a personal finance tool designed for{" "}
                <strong>Android platforms</strong> only. The service includes
                expense tracking, income monitoring, and budget setting. iOS
                support and advanced financial forecasting are expressly
                excluded from the current version.
              </p>
            </motion.section>

            {/* 2. Manual Data Entry */}
            <motion.section variants={sectionVars} className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <ClipboardCheck className="w-6 h-6 text-emerald-500" /> 2.
                Manual Input Requirement
              </h2>
              <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 text-amber-700 dark:text-amber-400/90 text-sm leading-relaxed">
                <strong>Important:</strong> MoneyGa does not include automatic
                bank or credit card synchronization. Users are responsible for
                manually inputting all financial data to ensure accurate
                tracking and reporting.
              </div>
            </motion.section>

            {/* 3. Currency and Region */}
            <motion.section variants={sectionVars} className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Coins className="w-6 h-6 text-emerald-500" /> 3. Currency
                Restriction
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The application is restricted to supporting the{" "}
                <strong>Philippine Peso (₱)</strong>. Multi-currency support and
                investment tracking features are currently not part of the
                platform's functional scope.
              </p>
            </motion.section>

            {/* 4. Use for Educational Purposes */}
            <motion.section variants={sectionVars} className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-emerald-500" /> 4. Academic
                Disclaimer
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                This app is developed as a school project for{" "}
                <strong>Ma'am Jessa Brogada</strong>. The evaluation is limited
                to 30 selected users. Unlimited long-term support and
                third-party licensing fees are not included in this deployment
                phase.
              </p>
            </motion.section>

            {/* 5. Limitation of Liability */}
            <motion.section variants={sectionVars} className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" /> 5. Limitation
                of Liability
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                MoneyGa is a tool for financial awareness and discipline. We do
                not provide financial advice. The developers are not liable for
                any financial decisions or inaccuracies resulting from manual
                data entry errors.
              </p>
            </motion.section>
          </motion.div>

          {/* Footer Info */}
          <footer className="mt-20 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              MoneyGa • Project lifecycle: Design to Deployment
            </p>
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </footer>
        </div>
      </section>
      <Footer />
    </main>
  );
}
