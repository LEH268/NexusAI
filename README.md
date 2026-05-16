<div align="center">
  <img src="app/favicon.ico" alt="NexusAI Logo" width="120" height="120" />
  <h1>🚀 NexusAI</h1>
  <p><b>Next-Generation HR Talent Matching & Analytics Ecosystem</b></p>

  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-16.2.6-black?style=flat&logo=next.js" alt="Next.js Badge" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19.2.4-blue?style=flat&logo=react" alt="React Badge" />
  </a>
  <a href="https://aistudio.google.com/">
    <img src="https://img.shields.io/badge/AI-Gemini_2.5_Flash-orange?style=flat&logo=google" alt="Gemini Badge" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind-v4.0-38B2AC?style=flat&logo=tailwind-css" alt="Tailwind Badge" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript" alt="TypeScript Badge" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License Badge" />
</div>

<br />

# 🚀 NexusAI

> **AI-Powered Talent Intelligence & HR Matching Ecosystem**

NexusAI is a next-generation AI-driven recruitment intelligence platform built for modern HR teams, startups, accelerators, and enterprise ecosystems. Powered by **Google Gemini 2.5 Flash** and engineered using **Next.js 16**, NexusAI delivers ultra-fast talent evaluation, intelligent candidate-job matching, and executive-level recruitment insights in real time.

The platform transforms traditional HR workflows into a scalable, intelligent ecosystem capable of automating talent discovery, profile analysis, and strategic hiring recommendations.

---

# 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🧠 How NexusAI Works](#-how-nexusai-works)
- [🚀 Getting Started](#-getting-started)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone the Repository](#2-clone-the-repository)
  - [3. Install Dependencies](#3-install-dependencies)
  - [4. Configure Environment Variables](#4-configure-environment-variables)
  - [5. Run the Development Server](#5-run-the-development-server)
- [📡 API Reference](#-api-reference)
- [🎨 UI & Design Philosophy](#-ui--design-philosophy)
- [🔒 Security & Scalability](#-security--scalability)

---

# ✨ Key Features

## 🧠 AI-Powered Talent Intelligence
Leverages the powerful `@google/genai` SDK with **Gemini 2.5 Flash** to generate precise, context-aware executive summaries and recruitment insights within milliseconds.

---

## ⚡ Intelligent Candidate Matching
Analyzes candidate profiles against job requirements including:

- Technical skills
- Experience level
- Role compatibility
- Location preferences
- Work mode alignment
- Leadership potential
- Strategic fit

---

## 📊 Executive-Level Recruitment Insights
Automatically generates concise, high-impact summaries for recruiters and hiring managers, helping organizations make faster and more informed hiring decisions.

---

## 🎨 Modern Enterprise UI
Built using:

- **Tailwind CSS v4**
- **shadcn-ui**
- **Framer Motion**

The interface delivers a clean, modern, fluid, enterprise-grade user experience.

---

## ⚙️ High-Performance Architecture
Powered by:

- **Next.js 16 App Router**
- **React 19**
- **Server-side API Routes**
- **Strict TypeScript**

Optimized for scalability, maintainability, and production deployment.

---

## 🛡️ Enterprise Reliability
100% TypeScript-based architecture with modular components and clean API separation to ensure long-term maintainability and robust developer experience.

---

# 🛠️ Tech Stack

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Framework** | Next.js | v16.2.6 |
| **Frontend** | React | v19.2.4 |
| **Language** | TypeScript | v5.x |
| **AI Engine** | Google Gemini 2.5 Flash | v2.3.0 |
| **Styling** | Tailwind CSS | v4.x |
| **UI Components** | shadcn-ui | v0.9.5 |
| **Animation Engine** | Framer Motion | v12.38.0 |
| **Icons** | Lucide React | v1.16.0 |

---

# 🧠 How NexusAI Works

NexusAI transforms raw candidate information into intelligent hiring insights through a streamlined AI pipeline.

## Workflow Overview

1. Recruiter inputs candidate profile information
2. Job requirements are provided as matching targets
3. NexusAI processes both datasets using Gemini AI
4. AI evaluates compatibility and strategic alignment
5. Executive summaries and match scores are generated instantly

---

## AI Evaluation Factors

The AI engine evaluates:

- Technical competency
- Role alignment
- Industry relevance
- Leadership indicators
- Skill overlap
- Experience depth
- Hiring risk assessment
- Strategic organizational fit

---

# 🚀 Getting Started

Follow the instructions below to set up NexusAI locally.

---

## 1. Prerequisites

Ensure the following are installed:

- **Node.js v20+**
- **npm**, **yarn**, **pnpm**, or **bun**

Recommended:
- VS Code
- Git
- Modern Chromium-based browser

---

## 2. Clone the Repository

```bash
git clone https://github.com/LEH268/NexusAI.git
cd NexusAI
```

---

## 3. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

---

## 4. Configure Environment Variables

NexusAI requires a Google Gemini API Key.

### Step 1 — Generate API Key

Visit:

https://aistudio.google.com/

Create a new API key and copy it.

---

### Step 2 — Create `.env.local`

Inside the project root:

```bash
touch .env.local
```

---

### Step 3 — Add Your API Key

```env
# Google Gemini API Configuration
GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

---

## 5. Run the Development Server

```bash
npm run dev
```

Expected output:

```bash
▲ Next.js 16.2.6
- Local: http://localhost:3000

✓ Ready in 1250ms
```

Open your browser:

```text
http://localhost:3000
```

---

# 📡 API Reference

NexusAI exposes internal API routes for AI communication.

---

## POST `/api/gemini-summary`

Generates AI-powered executive summaries for candidate-job matching.

---

## Headers

```http
Content-Type: application/json
```

---

## Request Body Example

```json
{
  "candidateName": "Alex Chen",
  "score": 95,
  "role": "Senior Frontend Engineer",
  "skills": [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS"
  ],
  "experience": 5,
  "location": "Remote",
  "matchTarget": {
    "position": "Frontend Tech Lead",
    "company": "Nexus Corp",
    "requireSkills": "React, Architecture, Mentorship",
    "minimumExperience": 4,
    "region": "Remote",
    "workMode": "Full-time"
  }
}
```

---

## Success Response Example

```json
{
  "summary": "Alex Chen brings 5 years of robust React and Next.js expertise, perfectly aligning with Nexus Corp's requirement for a remote Frontend Tech Lead. His 95% match score indicates strong architectural capabilities that will immediately elevate your engineering foundation."
}
```

---

# 🎨 UI & Design Philosophy

NexusAI is designed with a modern enterprise-first philosophy.

### Core Design Principles

- Minimalist Interface
- High Readability
- Fast Interaction
- AI-Centric UX
- Smooth Animations
- Responsive Layouts
- Clean Component Architecture

---

## Animation System

Powered by **Framer Motion** for:

- Page transitions
- Card hover interactions
- Dynamic loading states
- Smooth UI feedback

---

# 🔒 Security & Scalability

NexusAI follows scalable architecture practices suitable for modern SaaS applications.

### Security Features

- Environment-based API key management
- Secure server-side API routing
- Type-safe request validation
- Modular backend architecture

---

### Scalability Features

- App Router architecture
- Component modularization
- AI service abstraction
- Optimized rendering pipeline

---
