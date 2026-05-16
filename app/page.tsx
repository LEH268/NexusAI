"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1e3a8a,transparent_30%),radial-gradient(circle_at_bottom_left,#7c3aed,transparent_30%)] opacity-30" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-6">
        <h1 className="text-3xl font-bold">
          Nexus<span className="text-blue-400">AI</span>
        </h1>

        <Link
          href="/dashboard"
          className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-6">
            AI Relationship Intelligence Platform
          </div>

          <h1 className="text-7xl font-extrabold leading-tight max-w-5xl">
            Autonomous
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Ecosystem Intelligence
            </span>
          </h1>

          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            NexusAI transforms manual ecosystem coordination into intelligent,
            AI-powered relationship orchestration across talents, companies,
            mentors, startups, and innovation ecosystems.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-7 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 transition flex items-center gap-2 font-medium"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}