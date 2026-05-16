"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Sparkles } from "lucide-react";

const candidates = [
  {
    name: "Sarah Tan",
    score: "94%",
    role: "AI Engineer",
    industry: "Fintech",
    experience: "5 years",
    explanation: [
      "Strong fintech AI background",
      "Previous startup ecosystem experience",
      "High adaptability score",
      "Excellent ecosystem compatibility",
    ],
  },
  {
    name: "Jason Lee",
    score: "89%",
    role: "Machine Learning Engineer",
    industry: "AI SaaS",
    experience: "4 years",
    explanation: [
      "Strong AI engineering capabilities",
      "Fast-paced startup culture fit",
      "High mentorship collaboration score",
      "Good technical leadership potential",
    ],
  },
  {
    name: "Amanda Lim",
    score: "85%",
    role: "Data Scientist",
    industry: "Digital Banking",
    experience: "3 years",
    explanation: [
      "Fintech ecosystem alignment",
      "Strong Python and ML skills",
      "Remote collaboration experience",
      "Positive ecosystem relationship history",
    ],
  },
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 mb-5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm">
              AI Ecosystem Matching Results
            </span>
          </div>

          <h1 className="text-5xl font-bold">
            Top Relationship Matches
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            NexusAI analyzed ecosystem compatibility and relationship success
            patterns to generate optimal candidate recommendations.
          </p>
        </div>

        {/* Candidate Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-blue-500/30 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {candidate.name}
                  </h2>

                  <p className="text-gray-400 mt-1">
                    {candidate.role}
                  </p>
                </div>

                <div className="px-4 py-2 rounded-2xl bg-blue-500/20 text-blue-300 font-bold">
                  {candidate.score}
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-400">
                <p>Industry: {candidate.industry}</p>
                <p>Experience: {candidate.experience}</p>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <BrainCircuit className="w-5 h-5 text-purple-400" />

                  <h3 className="font-semibold">
                    AI Relationship Explanation
                  </h3>
                </div>

                <ul className="space-y-3">
                  {candidate.explanation.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-gray-300 flex gap-2"
                    >
                      <span className="text-blue-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Match generated using ecosystem compatibility,
                  startup collaboration history, mentorship success
                  patterns, and AI relationship intelligence.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}