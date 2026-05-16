import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// 初始化 Gemini 客户端，它会自动读取环境变量中的 GEMINI_API_KEY
const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    // 从前端传过来的请求体中，获取当前这位候选人的聚合数据
    const { candidateName, score, role, skills, experience, location, matchTarget } = await request.json();

    // 构建一个精简、严谨的 Prompt 喂给 AI
    const prompt = `
        You are an expert HR ecosystem analyst. 
        Analyze why the candidate ${candidateName} is a top match for the position "${matchTarget.position}" at "${matchTarget.company}".
        
        Candidate Data:
        - Total Match Score: ${score}%
        - Current Role: ${role}
        - Core Skills: ${skills.join(", ")}
        - Experience: ${experience} years
        - Location & Mode: ${location}
        
        User's Exact Search Target:
        - Required Skills: ${matchTarget.requireSkills}
        - Min Experience: ${matchTarget.minimumExperience}
        - Target Region: ${matchTarget.region}
        - Target Mode: ${matchTarget.workMode}

        Task: 
        Write a high-impact, professional executive summary about this match.
        
        CRITICAL CONSTRAINTS:
        1. STRICTLY LIMIT the output to exactly 2 sentences. 
        2. Maximum of 45-50 words in total.
        3. Do not include markdown, bold text (**), bullet points, or introductory filler phrases (e.g., "Based on the data..."). 
        4. Go straight to the strategic value of hiring this candidate.
        5. Return PLAIN TEXT only.
    `;

    // 调用轻量、快速且免费额度高的 gemini-2.5-flash 模型
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const summary = response.text || "Failed to generate AI executive summary.";

    // 将 AI 总结安全的返回给前端
    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "AI Synthesis unavailable" }, { status: 500 });
  }
}