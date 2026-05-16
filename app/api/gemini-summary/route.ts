import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the Gemini client, which automatically reads the GEMINI_API_KEY from environment variables
const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    // Extract the aggregated data of the current candidate from the frontend request body
    const { candidateName, score, role, skills, experience, location, matchTarget } = await request.json();

    // Construct a concise and rigorous prompt to feed into the AI
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

    // Call gemini-2.5-flash model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const summary = response.text || "Failed to generate AI executive summary.";

    // Return the AI summary safely to the frontend
    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "AI Synthesis unavailable" }, { status: 500 });
  }
}