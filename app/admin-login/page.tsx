"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/app/util/supabase";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else alert("Login successful!");

    setLoading(false);
  };

  return (
    <div className={`flex min-h-screen bg-white ${poppins.className}`}>
      {/* LEFT SIDE: Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-24"
      >
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-500">
            Please enter your details to sign in.
          </p>

          <form onSubmit={handleLogin} className="mt-10 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Visuals */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden w-1/2 flex-col items-center justify-center bg-gray-50 md:flex"
      >
        <div className="relative flex flex-col items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="mb-8">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={150}
              height={150}
              priority
            />
          </motion.div>

          {/* Android / App Preview Pic */}
          <div className="relative">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/img/income.png"
                alt="Income Preview"
                width={300}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Secondary floating image (Home) */}
            <motion.div
              className="absolute -bottom-10 -left-20"
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Image
                src="/img/home.png"
                alt="Home Preview"
                width={200}
                height={350}
                className="rounded-xl shadow-xl border-4 border-white"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
