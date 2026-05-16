"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, User, Briefcase, MapPin, Clock, Sparkle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const CANDIDATES_DATABASE = [
  { id: "C001", name: "Sarah Tan", current_role: "AI Engineer", desired_position: "AI Engineer", skills: ["Python", "Machine Learning", "FastAPI", "SQL"], years_experience: 5, region: "Malaysia", work_mode: "Remote" },
  { id: "C002", name: "Jason Lee", current_role: "Frontend Developer", desired_position: "Full Stack Engineer", skills: ["React", "Node.js", "JavaScript", "SQL"], years_experience: 3, region: "Singapore", work_mode: "Hybrid" },
  { id: "C003", name: "Amanda Lim", current_role: "Machine Learning Engineer", desired_position: "AI Engineer", skills: ["Python", "TensorFlow", "FastAPI", "Docker"], years_experience: 4, region: "Malaysia", work_mode: "Remote" },
  { id: "C004", name: "Kevin Wong", current_role: "Backend Engineer", desired_position: "Backend Engineer", skills: ["Python", "FastAPI", "PostgreSQL", "Docker"], years_experience: 6, region: "Malaysia", work_mode: "Hybrid" },
  { id: "C005", name: "Michelle Ong", current_role: "Data Scientist", desired_position: "Machine Learning Engineer", skills: ["Python", "Pandas", "Machine Learning", "SQL"], years_experience: 4, region: "Singapore", work_mode: "Remote" },
  { id: "C006", name: "Daniel Chua", current_role: "Software Engineer", desired_position: "Backend Engineer", skills: ["Java", "Spring Boot", "MySQL", "Docker"], years_experience: 5, region: "Malaysia", work_mode: "Onsite" },
  { id: "C007", name: "Chloe Tan", current_role: "AI Research Engineer", desired_position: "AI Engineer", skills: ["Python", "PyTorch", "Machine Learning", "FastAPI"], years_experience: 7, region: "Singapore", work_mode: "Remote" },
  { id: "C008", name: "Ethan Lim", current_role: "Full Stack Developer", desired_position: "Full Stack Engineer", skills: ["React", "Node.js", "Python", "MongoDB"], years_experience: 3, region: "Malaysia", work_mode: "Hybrid" },
  { id: "C009", name: "Grace Ng", current_role: "Data Engineer", desired_position: "Data Engineer", skills: ["Python", "SQL", "Airflow", "Spark"], years_experience: 5, region: "Malaysia", work_mode: "Remote" },
  { id: "C010", name: "Ryan Teo", current_role: "Cloud Engineer", desired_position: "DevOps Engineer", skills: ["AWS", "Docker", "Kubernetes", "Python"], years_experience: 6, region: "Singapore", work_mode: "Hybrid" },
  { id: "C011", name: "Sophie Yap", current_role: "ML Engineer", desired_position: "AI Engineer", skills: ["Python", "Scikit-learn", "FastAPI", "TensorFlow"], years_experience: 4, region: "Malaysia", work_mode: "Remote" },
  { id: "C012", name: "Marcus Ho", current_role: "Backend Developer", desired_position: "Backend Engineer", skills: ["Python", "Django", "PostgreSQL", "Redis"], years_experience: 3, region: "Indonesia", work_mode: "Remote" },
  { id: "C013", name: "Natalie Goh", current_role: "Product Engineer", desired_position: "Full Stack Engineer", skills: ["Python", "React", "FastAPI", "SQL"], years_experience: 2, region: "Malaysia", work_mode: "Hybrid" },
  { id: "C014", name: "Brandon Tan", current_role: "Software Engineer", desired_position: "Machine Learning Engineer", skills: ["C++", "Python", "Machine Learning", "Linux"], years_experience: 5, region: "Singapore", work_mode: "Onsite" },
  { id: "C015", name: "Rachel Lim", id_name: "Rachel Lim", current_role: "AI Developer", desired_position: "AI Engineer", skills: ["Python", "OpenCV", "TensorFlow", "FastAPI"], years_experience: 4, region: "Malaysia", work_mode: "Remote" },
  { id: "C016", name: "Adrian Lee", current_role: "DevOps Engineer", desired_position: "DevOps Engineer", skills: ["Docker", "Kubernetes", "AWS", "Linux"], years_experience: 6, region: "Thailand", work_mode: "Hybrid" },
  { id: "C017", name: "Vanessa Ong", current_role: "Data Analyst", desired_position: "Data Scientist", skills: ["Python", "SQL", "Power BI", "Pandas"], years_experience: 3, region: "Malaysia", work_mode: "Remote" },
  { id: "C018", name: "Justin Ng", current_role: "Full Stack Engineer", desired_position: "Backend Engineer", skills: ["React", "FastAPI", "Python", "PostgreSQL"], years_experience: 4, region: "Singapore", work_mode: "Hybrid" },
  { id: "C019", name: "Emily Chua", current_role: "Machine Learning Engineer", desired_position: "AI Engineer", skills: ["Python", "PyTorch", "NLP", "FastAPI"], years_experience: 5, region: "Malaysia", work_mode: "Remote" },
  { id: "C020", name: "Sean Wong", current_role: "Software Developer", desired_position: "Backend Engineer", skills: ["Python", "FastAPI", "Docker", "MongoDB"], years_experience: 2, region: "Philippines", work_mode: "Remote" },
];

export default function ResultsPage() {
  const [requirements, setRequirements] = useState<any>(null);
  const [topMatches, setTopMatches] = useState<any[]>([]);
  
  const [aiSummaries, setAiSummaries] = useState<{ [key: string]: string }>({});
  const [loadingAI, setLoadingAI] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const storedData = localStorage.getItem("jobRequirement");
    if (storedData) {
      try {
        const parsedReq = JSON.parse(storedData);
        setRequirements(parsedReq);
        calculateMatches(parsedReq);
      } catch (error) {
        console.error("Failed to parse jobRequirement:", error);
      }
    }
  }, []);

  const fetchGeminiSummary = async (candidate: any, req: any) => {
    if (aiSummaries[candidate.id]) return;

    setLoadingAI((prev) => ({ ...prev, [candidate.id]: true }));

    try {
      const response = await fetch("/api/gemini-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: candidate.name,
          score: candidate.finalScore,
          role: candidate.current_role,
          skills: candidate.skills,
          experience: candidate.years_experience,
          location: `${candidate.region} (${candidate.work_mode})`,
          matchTarget: req 
        }),
      });

      const data = await response.json();
      if (data.summary) {
        setAiSummaries((prev) => ({ ...prev, [candidate.id]: data.summary }));
      }
    } catch (err) {
      console.error("Failed to fetch Gemini summary:", err);
    } finally {
      setLoadingAI((prev) => ({ ...prev, [candidate.id]: false }));
    }
  };

  const calculateMatches = (req: any) => {
    const userSkills = req.requireSkills
      ? req.requireSkills.split(/[,;]/).map((s: string) => s.trim().toLowerCase()).filter(Boolean)
      : [];
    
    const minExp = req.minimumExperience ? parseInt(req.minimumExperience.replace(/[^0-9]/g, "")) || 0 : 0;

    const scoredCandidates = CANDIDATES_DATABASE.map((candidate) => {
      let skillScore = 0;
      let expScore = 0;
      let posScore = 0;
      let regionScore = 0;
      let modeScore = 0;

      if (userSkills.length > 0) {
        const matchedSkillsCount = candidate.skills.filter((skill) =>
          userSkills.includes(skill.toLowerCase())
        ).length;
        skillScore = (matchedSkillsCount / userSkills.length) * 100;
      } else {
        skillScore = 100;
      }

      if (minExp === 0) {
        expScore = 100;
      } else {
        expScore = candidate.years_experience >= minExp ? 100 : (candidate.years_experience / minExp) * 100;
      }

      if (req.position && candidate.desired_position.toLowerCase().includes(req.position.toLowerCase())) {
        posScore = 100;
      }

      if (req.region && candidate.region.toLowerCase() === req.region.toLowerCase()) {
        regionScore = 100;
      }

      if (req.workMode && candidate.work_mode.toLowerCase() === req.workMode.toLowerCase()) {
        modeScore = 100;
      }

      const finalScore = Math.round(
        skillScore * 0.35 +
        expScore * 0.25 +
        posScore * 0.2 +
        regionScore * 0.1 +
        modeScore * 0.1
      );

      const explanation = [
        `Matched ${candidate.skills.filter(s => userSkills.includes(s.toLowerCase())).length} required core skills.`,
        `Has ${candidate.years_experience} years of experience (Target: ${minExp}+ years).`,
        candidate.desired_position.toLowerCase().includes((req.position || "").toLowerCase()) 
          ? `Perfect alignment with desired position: ${candidate.desired_position}.`
          : `Interested in shifting to similar ecosystem roles.`,
        candidate.region.toLowerCase() === (req.region || "").toLowerCase()
          ? `Based locally in ${candidate.region}, eliminating timezone friction.`
          : `Located in ${candidate.region}, requires cross-border arrangement.`
      ];

      return {
        ...candidate,
        finalScore,
        explanation
      };
    });

    const sorted = scoredCandidates
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 3);

    setTopMatches(sorted);

    sorted.forEach((candidate) => {
      fetchGeminiSummary(candidate, req);
    });
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 mb-5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm">AI Ecosystem Matching Results</span>
          </div>

          <h1 className="text-5xl font-bold">Top Relationship Matches</h1>

          <p className="text-gray-400 mt-4 text-lg">
            NexusAI analyzed your candidate database dynamically using weighted matching matrices.
          </p>

          {/* User Targets Monitor Dashboard View */}
          {requirements && (
            <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10 max-w-3xl">
              <p className="text-sm text-blue-400 font-semibold mb-3">Your Match Target (From Form):</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div><span className="text-gray-500 block">Company</span><span className="text-gray-200">{requirements.company || "N/A"}</span></div>
                <div><span className="text-gray-500 block">Position</span><span className="text-gray-200">{requirements.position || "N/A"}</span></div>
                <div><span className="text-gray-500 block">Required Skills</span><span className="text-gray-200">{requirements.requireSkills || "N/A"}</span></div>
                <div><span className="text-gray-500 block">Min Experience</span><span className="text-gray-200">{requirements.minimumExperience || "N/A"}</span></div>
                <div><span className="text-gray-500 block">Region</span><span className="text-gray-200">{requirements.region || "N/A"}</span></div>
                <div><span className="text-gray-500 block">Work Mode</span><span className="text-gray-200">{requirements.workMode || "N/A"}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Top 3 Profile Matching Cards Grid container */}
        <div className="grid lg:grid-cols-3 gap-6">
          {topMatches.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-blue-500/30 transition relative overflow-hidden flex flex-col justify-between min-h-[600px]"
            >
              <div className="flex-1">
                {/* Dynamic Placement Banner */}
                <div className="absolute top-0 right-0 bg-blue-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                  RANK #{index + 1}
                </div>

                <div className="flex items-start justify-between mt-2">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-400" />
                      {candidate.name}
                    </h2>
                    <p className="text-gray-400 mt-1 text-sm">Current: {candidate.current_role}</p>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-blue-500/20 text-blue-300 font-bold text-xl">
                    {candidate.finalScore}%
                  </div>
                </div>

                {/* Core Basic Information Profile */}
                <div className="mt-6 space-y-2 text-sm text-gray-400 border-t border-b border-white/5 py-4">
                  <p className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-gray-500"/> Desired Role: <span className="text-gray-200">{candidate.desired_position}</span></p>
                  <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500"/> Experience: <span className="text-gray-200">{candidate.years_experience} years</span></p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500"/> Location: <span className="text-gray-200">{candidate.region} ({candidate.work_mode})</span></p>
                </div>

                {/* Skill Pill Badges */}
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Candidate Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.map((s: string) => (
                      <span key={s} className="text-xs bg-white/5 border border-white/10 rounded-md px-2 py-0.5 text-gray-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Analytical Breakdown Module */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BrainCircuit className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-sm">Weighted Matrix Analysis</h3>
                  </div>

                  <ul className="space-y-2">
                    {candidate.explanation.map((item: string) => (
                      <li key={item} className="text-xs text-gray-300 flex gap-2 leading-relaxed">
                        <span className="text-blue-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gemini Summary Section */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkle className="w-4 h-4 text-blue-400" />
                    <h4 className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Gemini Executive Synthesis</h4>
                  </div>
                  
                  {loadingAI?.[candidate.id] ? (
                    <div className="flex items-center gap-2 text-xs text-gray-500 py-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                      Synthesizing ecosystem narrative...
                    </div>
                  ) : (
                    <p className="text-xs text-gray-300 leading-relaxed italic bg-blue-500/5 p-3 rounded-xl border border-blue-500/10">
                      "{aiSummaries?.[candidate.id] || "Generating summary..."}"
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 p-3 rounded-xl bg-white/5 text-center text-xs text-gray-500 w-full">
                ID: {candidate.id} | Matrix Verified
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}