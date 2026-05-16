"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Brain, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // 1. 修改状态结构，对应你的 6 个新字段
  const [form, setForm] = useState({
    company: "",
    position: "",
    requireSkills: "",
    minimumExperience: "",
    region: "",
    workMode: "",
  });

  const handleSubmit = async () => {
    setLoading(true);

    localStorage.setItem("jobRequirement", JSON.stringify(form));

    setTimeout(() => {
      router.push("/results");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-sm">AI Relationship Engine</span>
          </div>

          <h1 className="text-5xl font-bold">
            Ecosystem Matching Dashboard
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Describe your ideal candidate and let NexusAI build intelligent
            ecosystem relationships automatically.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT SIDE - 修改后的输入框区域 */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Company Requirement Form
            </h2>

            <div className="space-y-5">
              {/* 1. Company */}
              <InputField
                label="Company"
                placeholder="NexusCorp"
                value={form.company}
                onChange={(e: any) =>
                  setForm({ ...form, company: e.target.value })
                }
              />

              {/* 2. Position */}
              <InputField
                label="Position"
                placeholder="AI Engineer"
                value={form.position}
                onChange={(e: any) =>
                  setForm({ ...form, position: e.target.value })
                }
              />

              {/* 3. Require Skills */}
              <InputField
                label="Require Skills"
                placeholder="Python, React, LLMs"
                value={form.requireSkills}
                onChange={(e: any) =>
                  setForm({ ...form, requireSkills: e.target.value })
                }
              />

              {/* 4. Minimum Experience */}
              <InputField
                label="Minimum Experience"
                placeholder="2+ years"
                value={form.minimumExperience}
                onChange={(e: any) =>
                  setForm({ ...form, minimumExperience: e.target.value })
                }
              />

              {/* 5. Region */}
              <InputField
                label="Region"
                placeholder="North America / Remote"
                value={form.region}
                onChange={(e: any) =>
                  setForm({ ...form, region: e.target.value })
                }
              />

              {/* 6. Work Mode */}
              <InputField
                label="Work Mode"
                placeholder="Full-time / Part-time"
                value={form.workMode}
                onChange={(e: any) =>
                  setForm({ ...form, workMode: e.target.value })
                }
              />

              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-blue-500 hover:bg-blue-600 transition py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Building Ecosystem Relationships...
                  </>
                ) : (
                  "Generate AI Matches"
                )}
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">
              AI Relationship Intelligence
            </h2>

            <div className="space-y-5 text-gray-300">
              <p>NexusAI analyzes:</p>

              <ul className="space-y-3">
                <li>• Skill compatibility</li>
                <li>• Industry alignment</li>
                <li>• Startup ecosystem experience</li>
                <li>• Team adaptability</li>
                <li>• Relationship success patterns</li>
                <li>• Ecosystem collaboration history</li>
              </ul>

              <div className="mt-10 p-6 rounded-2xl bg-black/30 border border-white/10">
                <p className="text-blue-300 mb-2">
                  AI Relationship Insight
                </p>

                <p className="text-sm text-gray-400 leading-relaxed">
                  “Our AI continuously learns from successful ecosystem
                  engagements to improve future relationship recommendations.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
}: any) {
  return (
    <div>
      <label className="block mb-2 text-gray-300">{label}</label>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition"
      />
    </div>
  );
}