import json
import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

app = FastAPI(title="NexusAI Matching Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

CANDIDATES_FILE = Path(__file__).parent.parent / "app" / "data" / "candidates.json"


class JobRequirement(BaseModel):
    position: str
    industry: str
    skills: List[str]


class MatchingResult(BaseModel):
    candidate_id: str
    name: str
    match_score: int
    reason: str


class MatchingResponse(BaseModel):
    job_requirement: JobRequirement
    matches: List[MatchingResult]


def load_candidates() -> List[dict]:
    """Load candidates from candidates.json"""
    try:
        with open(CANDIDATES_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(
            status_code=500,
            detail=f"Candidates file not found at {CANDIDATES_FILE}"
        )


def get_ai_matches(job_req: JobRequirement, candidates: List[dict]) -> List[MatchingResult]:
    """Use OpenAI to match candidates with job requirements"""
    candidates_summary = json.dumps(candidates, indent=2)
    
    prompt = f"""
You are an expert recruitment consultant. Analyze the following candidates and job requirements to find the best matches.

JOB REQUIREMENT:
- Position: {job_req.position}
- Industry: {job_req.industry}
- Required Skills: {', '.join(job_req.skills)}

CANDIDATES:
{candidates_summary}

Task: Return the top 5 best matching candidates based on:
1. Skill match with required skills
2. Desired position alignment
3. Years of experience
4. Overall fit for the job

Return ONLY a valid JSON array with exactly this structure (no markdown, no extra text):
[
  {{"candidate_id": "C001", "name": "Name", "match_score": 95, "reason": "Brief reason"}}
]

Ensure match_score is between 0-100. Return maximum 5 candidates.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a recruitment AI assistant. Return ONLY valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        result_text = response.choices[0].message.content.strip()
        
        # Clean up markdown if present
        if result_text.startswith("```"):
            result_text = result_text.split("```")[1]
            if result_text.startswith("json"):
                result_text = result_text[4:]
        result_text = result_text.strip()
        
        matches_data = json.loads(result_text)
        
        # Convert to MatchingResult objects
        return [MatchingResult(**match) for match in matches_data]
    
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse AI response: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"OpenAI API error: {str(e)}"
        )


@app.post("/match", response_model=MatchingResponse)
async def match_candidates(job_req: JobRequirement) -> MatchingResponse:
    """
    Match candidates with job requirements using AI.
    
    Args:
        job_req: Job requirement with position, industry, and required skills
    
    Returns:
        MatchingResponse with top matching candidates
    """
    candidates = load_candidates()
    matches = get_ai_matches(job_req, candidates)
    
    return MatchingResponse(job_requirement=job_req, matches=matches)


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "NexusAI Matching Engine"}


@app.get("/candidates")
async def get_all_candidates():
    """Get all available candidates"""
    candidates = load_candidates()
    return {"total": len(candidates), "candidates": candidates}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
