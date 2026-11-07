# 🧠 AdaptiveMarket — The Self-Evolving Competitive Strategy Agent
> **Autonomous, Memory-First Competitive Intelligence & Strategy Engine powered by [Vectorize Hindsight](https://github.com/vectorize-io/hindsight) and [Groq LPU](https://groq.com/) for HackwithHyderabad 3.0.**

[![GitHub License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Memory Engine](https://img.shields.io/badge/Memory-Vectorize%20Hindsight-00E599)](https://hindsight.vectorize.io)
[![Reasoning](https://img.shields.io/badge/LLM-Groq%20LPU%20(120B%20MoE)-F55036)](https://groq.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20Python%203.11-009688)](https://fastapi.tiangolo.com)

---

## 🎯 Direct Match with HackwithHyderabad 3.0 Problem Statement

The [HackwithHyderabad 3.0 Problem Statement](https://docs.google.com/document/d/1A4ezag02em823ZzYF34DiUVHUNLWI5ztm70QvWidWoQ/edit?usp=drivesdk&ouid=109048695587118270487) explicitly tasks participants with building a **Competitive Intelligence Agent** under Product & Strategy:

> *"Monitors and remembers competitor moves: pricing changes, feature launches, messaging shifts, hiring patterns. Builds an evolving picture of the competitive landscape. Competitive intelligence is only useful if it is cumulative. An agent that remembers six months of competitor activity spots patterns that a weekly check never would."*

While previous projects (like [CorpIntel AI](https://devpost.com/software/forgehacks-mini-project)) generate static, stateless one-time research reports, **AdaptiveMarket uses [Vectorize Hindsight](https://hindsight.vectorize.io/) to autonomously "change itself"**: dynamically rewriting sales objection battlecards, recalibrating pricing packaging tiers, and re-ranking the internal product backlog from P2 to P0 in real-time as competitor moves accumulate.

---

## 📸 Executive Visual Tour & Live Demo Screenshots

### 1. Executive Overview & Autonomous Strategy Evolution
![Executive Overview](docs/demo/3-adapted-overview.png)
*Left: Stateless reaction panicking with a 35% margin-destroying price cut. Right: Hindsight-evolved strategy anchoring on 99.99% SLA, $39 Starter Annual packaging, and P0 SOC2 compliance.*

---

### 2. Live AI Sales Battlecard & Objection Script
![Sales Battlecards](docs/demo/4-battlecards.png)
*Hyper-personalized objection handling powered by Groq (`openai/gpt-oss-120b`) citing Competitor A's 4 major outages and week-long support ticket delays, complete with 1-click script copying and Hindsight reflection.*

---

### 3. Head-to-Head Pricing & Packaging Matrix
![Pricing Matrix](docs/demo/5-pricing-matrix.png)
*Head-to-head benchmarking across SLA, Support, Compliance, and Moats, backed by the "85% Gross Margin Rule".*

---

### 4. Dynamic Product Roadmap Priority Re-Ranking
![Roadmap Prioritizer](docs/demo/6-roadmap.png)
*Autonomous backlog mutation: boosts "SOC2 Type II Automation" from P2 to P0 upon recalling lost enterprise deals to Competitor B.*

---

### 5. Hindsight 5-Layer Biomimetic Memory Inspector & TEMPR Engine
![Memory Bank Inspector](docs/demo/7-memory-bank.png)
*Direct visibility into World Facts, Consolidated Observations, Active Mental Models, and live TEMPR 4-way neural retrieval score bars.*

---

### 6. Real-Time Market Signals Live Ingestion Feed
![Market Signals Feed](docs/demo/8-signals-feed.png)
*Multi-channel signal timeline (Pricing, Status Page, Lost Deals, G2) with interactive live ingestion form.*

---

## ⚡ The 60-Second Judge Demo Flow

| Act | Scenario | Stateless Baseline (Zero Memory) | AdaptiveMarket + Hindsight (Cumulative Memory) |
| :--- | :--- | :--- | :--- |
| **Act 1** | **Competitor A slashes price 30%** | Panics: Recommends discounting list price by 35% ($49 → $32/mo), destroying 40% gross margin. | `recall()` returns 0 memories; agent reveals cold-start vulnerabilities. |
| **Act 2** | **Ingest 3-Mo Market Signals** | Stateless bots discard past events. | `client.retain()` writes 6 events into `adaptive-market-prod` bank and executes memory consolidation into 12 synthesized observations. |
| **Act 3** | **Prospect asks: "Why not Comp A?"** | Offers generic feature comparison table. | **Agent autonomously morphs:** Recalls Competitor A's 4 outages (99.1% uptime drop) and customer churn; recalibrates packaging with a $39/mo Starter Annual tier (99.99% SLA); boosts SOC2 to P0. |

---

## 🏗️ Technical Architecture & Pipeline

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js 15 App Dashboard                        │
│   (Overview · Battlecards · Pricing Matrix · Roadmap · Memory Bank)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ /api proxy (FastAPI :8000)
┌───────────────────────────────────▼────────────────────────────────────┐
│                  Autonomous Orchestration Pipeline                     │
│                                                                        │
│  [AGT-01] Signal Watcher ──► Multi-channel scraping (Pricing, Outages) │
│                                                                        │
│  [AGT-02] Hindsight Bank ──► 5-Layer Biomimetic Storage & Consolidation│
│                              (World Facts, Experiences, Observations)  │
│                                                                        │
│  [AGT-03] TEMPR Retriever──► 4-Way Neural Fusion Retrieval             │
│                              (Semantic + BM25 + Temporal + Re-ranker)  │
│                                                                        │
│  [AGT-04] Strategy Mutator─► Groq LPU (gpt-oss-120b) Structured Morph  │
│                              (Battlecard Rewrite, Pricing, Roadmap P0) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────┐                       ┌─────────────────────┐
│   Vectorize Hindsight   │                       │      Groq LPU       │
│  Cloud / Self-Hosted    │                       │  openai/gpt-oss-120b│
│  (Bank: adaptive-market)│                       │  openai/gpt-oss-20b │
└─────────────────────────┘                       └─────────────────────┘
```

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- Node.js 20+
- Python 3.10+
- Vectorize Hindsight API Key ([hindsight.vectorize.io](https://hindsight.vectorize.io))
- Groq API Key ([console.groq.com](https://console.groq.com))

### 1. Clone & Setup Environment
```bash
git clone https://github.com/RohanExploit/adaptive-market.git
cd adaptive-market

cp .env.example .env
# Edit .env with your keys:
# HINDSIGHT_API_KEY=hsk_...
# GROQ_API_KEY=gsk_...
```

### 2. Launch Backend (FastAPI)
```bash
python -m venv .venv
# Windows:
.\.venv\Scripts\activate
# Linux/macOS:
# source .venv/bin/activate

pip install -r backend/requirements.txt
uvicorn backend.main:app --port 8000
```

### 3. Launch Frontend (Next.js 15)
```bash
cd frontend
npm install
npm run dev
# Dashboard opens on http://localhost:3000
```

### 4. Automated Demo Capture (Optional)
To re-run the automated 1080p Playwright recording across all 6 tabs:
```bash
cd scripts
npm install
node record_demo.mjs
# Outputs video & screenshots into docs/demo/
```

Or run via Docker:
```bash
docker compose up
```

---

## 📊 Core API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/bootstrap` | `POST` | Bootstraps Hindsight bank mission, skepticism disposition, and mental model. |
| `/api/signals/ingest` | `POST` | Ingests a raw competitor move and triggers immediate memory consolidation. |
| `/api/signals/seed` | `POST` | Seeds the 3-month demo dataset (Competitor A & B moves). |
| `/api/signals/list` | `GET` | Returns all active and retained competitor signals. |
| `/api/competitors/benchmark` | `GET` | Returns head-to-head comparison metrics (AdaptiveMarket vs A vs B). |
| `/api/strategy/morph` | `POST` | Runs TEMPR recall + Groq reflection to mutate strategy parameters. |
| `/api/memory/inspector` | `GET` | Returns live World Facts, Observations, and Mental Models. |

---

## 🏆 Built for HackwithHyderabad 3.0
- **Developer:** Rohan Gaikwad ([@RohanExploit](https://github.com/RohanExploit))
- **Powered by:** [Vectorize Hindsight](https://github.com/vectorize-io/hindsight) & [Groq](https://groq.com)
- **License:** MIT
