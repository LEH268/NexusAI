# NexusAI Backend - FastAPI Matching Engine

AI-powered candidate matching service using OpenAI GPT-4 Turbo.

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file in the backend folder:

```bash
cp .env.example .env
```

Then add your OpenAI API key:

```
OPENAI_API_KEY=your_actual_api_key_here
```

### 3. Run the Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

### POST /match
Match candidates with job requirements using AI.

**Request Body:**
```json
{
  "position": "AI Engineer",
  "industry": "Fintech",
  "skills": ["Python", "Machine Learning"]
}
```

**Response:**
```json
{
  "job_requirement": {
    "position": "AI Engineer",
    "industry": "Fintech",
    "skills": ["Python", "Machine Learning"]
  },
  "matches": [
    {
      "candidate_id": "C001",
      "name": "Sarah Tan",
      "match_score": 95,
      "reason": "Excellent match with Python and Machine Learning skills"
    }
  ]
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "NexusAI Matching Engine"
}
```

### GET /candidates
Get all available candidates.

**Response:**
```json
{
  "total": 20,
  "candidates": [
    {
      "candidate_id": "C001",
      "name": "Sarah Tan",
      "current_role": "AI Engineer",
      "desired_position": "AI Engineer",
      "skills": ["Python", "Machine Learning", "FastAPI", "SQL"],
      "years_experience": 5,
      "region": "Malaysia",
      "work_mode": "Remote"
    }
  ]
}
```

## Testing with cURL

```bash
# Health check
curl http://localhost:8000/health

# Get all candidates
curl http://localhost:8000/candidates

# Match candidates
curl -X POST http://localhost:8000/match \
  -H "Content-Type: application/json" \
  -d '{
    "position": "AI Engineer",
    "industry": "Fintech",
    "skills": ["Python", "Machine Learning"]
  }'
```

## API Documentation

Interactive API documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Architecture

- **FastAPI**: Modern async web framework
- **Pydantic**: Data validation and serialization
- **OpenAI API**: GPT-4 Turbo for intelligent matching
- **CORS**: Enabled for frontend integration

## Data Sources

- Candidates: `../app/data/candidates.json` (20 candidates)

## Features

✅ AI-powered candidate matching  
✅ Skill-based evaluation  
✅ Industry-aware matching  
✅ Experience consideration  
✅ JSON response format  
✅ CORS enabled for frontend  
✅ Full API documentation  
