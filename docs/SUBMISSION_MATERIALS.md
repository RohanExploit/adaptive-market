# 📝 AdaptiveMarket — HackwithHyderabad 3.0 Submission Kit

Everything you need to submit your project to the hackathon portal, Devpost, Dev.to/Medium, Reddit, and LinkedIn/X.

- **GitHub Repository:** [https://github.com/RohanExploit/adaptive-market](https://github.com/RohanExploit/adaptive-market)
- **Demo Video (1080p WebM):** `docs/demo/demo-recording.webm` (Inside repository)

---

## 1. Devpost / Submission Portal Fields

### Project Name
**AdaptiveMarket — The Self-Evolving Competitive Intelligence & Strategy Agent**

### Elevator Pitch / Tagline (1 sentence)
An autonomous, memory-first Competitive Intelligence CSO powered by Vectorize Hindsight that dynamically rewrites sales battlecards, recalibrates pricing packaging, and re-ranks engineering backlogs as competitor moves accumulate.

### Problem Statement Match
Directly tackles the **Competitive Intelligence Agent** track under Product & Strategy in the HackwithHyderabad 3.0 problem statement:
> *"Monitors and remembers competitor moves: pricing changes, feature launches, messaging shifts, hiring patterns. Builds an evolving picture of the competitive landscape. Competitive intelligence is only useful if it is cumulative. An agent that remembers six months of competitor activity spots patterns that a weekly check never would."*

### What it does
Existing market intelligence tools (and prior hackathon bots like CorpIntel AI) generate passive one-time PDF summaries. When a competitor drops prices, a stateless bot panics and recommends slashing prices. 

**AdaptiveMarket uses Vectorize Hindsight biomimetic memory to "change itself":**
1. **Retains & Consolidates Memory:** Ingests competitor pricing shifts, outages, hiring patterns, and lost deals into Hindsight memory banks (`adaptive-market-prod`), synthesizing background observations over time.
2. **TEMPR 4-Way Retrieval:** Uses Hindsight's patent-pending TEMPR engine (fusing Semantic Vector Search, BM25 Keyword Search, Knowledge Graph, and Temporal Recency Decay) to query historical competitor moves.
3. **Autonomous Sales Battlecards:** Real-time objection scripts that detect when a competitor's price cut caused service outages or support churn, anchoring sales reps on 99.99% enterprise SLA guarantees instead of discounting.
4. **Self-Calibrating Pricing:** Recalls that competitor promotional flash sales are temporary and creates targeted annual packaging ("Starter Annual" at $39/mo) while preserving 85% gross margins.
5. **Dynamic Roadmap Priority Re-Ranking:** When lost enterprise deals cite lack of compliance, the agent autonomously re-ranks engineering backlogs, elevating SOC2 Automation from P2 to P0.

### Tech Stack
- **Memory Engine:** Vectorize Hindsight Cloud API (5-layer biomimetic memory bank, TEMPR retrieval, Reflect API)
- **LLM Reasoning:** Groq LPU (`openai/gpt-oss-120b` MoE & `openai/gpt-oss-20b`)
- **Backend:** FastAPI (Python 3.11), Pydantic v2, HTTPX, Uvicorn
- **Frontend Dashboard:** Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons

---

## 2. Technical Article (Dev.to / Medium)
> **Title:** Why Stateless AI Agents Fail at Competitive Strategy (And How Biomimetic Memory Fixes It)  
> *(Note: "hackathon" is intentionally excluded from the title as required by the contest rules)*

### Article Body:

If you ask a standard LLM agent how to react when a competitor slashes their SaaS subscription by 30%, it will almost invariably give you disastrous advice: **"Match the price cut immediately to prevent churn."**

This is the fatal flaw of stateless AI in business strategy. A single prompt-response loop possesses zero temporal context. It doesn't know that the competitor ran the exact same promotional stunt six months ago and quietly rolled it back 60 days later after incinerating gross margins. It doesn't know that the surge in free users crashed their infrastructure and caused four major service outages.

Competitive intelligence is only valuable when it is **cumulative**.

### The Solution: 5-Layer Biomimetic Memory with Vectorize Hindsight
To solve this, we built **AdaptiveMarket**, an autonomous Chief Strategy Officer agent powered by [Vectorize Hindsight](https://github.com/vectorize-io/hindsight).

Instead of treating market signals as transient tokens in a chat window, AdaptiveMarket routes signals through a 5-layer biomimetic memory bank:
1. **World Facts:** Objective market events extracted from competitor landing pages and status monitors (e.g., *"Competitor A dropped pricing from $49 to $34 in August 2026; suffered 4 outages dropping uptime to 99.1%"*).
2. **Experience Logs:** Direct internal deal outcomes (e.g., *"Lost 3 enterprise deals to Competitor B because Competitor B has SOC2"*).
3. **Consolidated Observations:** As facts accumulate, Hindsight continuously consolidates them in the background into higher-level behavioral deductions (e.g., *"Competitor A is sacrificing service quality for market share"*).
4. **Mental Models:** Persistent, pinned strategic directives that update automatically when new evidence arrives.
5. **TEMPR 4-Way Neural Retrieval:** Fusing semantic embeddings, BM25 keywords, knowledge graph links, and temporal recency decay into a unified 0.94 confidence score.

### How the Agent "Changes Itself"
When market signals are ingested, AdaptiveMarket runs a reflection loop that mutates three operational parameters of the business:

1. **Self-Adapting Sales Battlecards:** When a prospect asks, *"Why shouldn't we choose Competitor A for $34/mo?"*, the agent's battlecard does not compete on features. It arms the rep with:
   > *"I understand Competitor A's lower price is attractive, but can you quantify what a single outage costs your company? We guarantee 99.99% uptime with 24/7 Slack support and an ROI value-matrix—unlike Competitor A, whose price cut triggered four major outages and week-long support ticket backlogs."*

2. **Self-Calibrating Pricing:** Instead of an 85% margin-destroying price war, the agent synthesizes a "Starter Annual" tier at $39/mo with higher limits and strict SLA terms.

3. **Dynamic Roadmap Priority Re-Ranking:** Tracking lost enterprise deals automatically boosts "SOC2 Type II Automation" from a stagnant P2 feature to a **P0 mission-critical sprint priority**.

Check out the full open-source implementation and 1080p interactive demo:  
👉 **GitHub Repo:** [https://github.com/RohanExploit/adaptive-market](https://github.com/RohanExploit/adaptive-market)

---

## 3. Social Media Posts

### LinkedIn / X (Twitter) Post
> Most AI agents fail at competitive intelligence for a simple reason: **they are stateless**.
>
> If Competitor X cuts prices by 30%, a stateless LLM panics and tells you to slash your own prices by 35%. It doesn't remember that Competitor X did the same promo 6 months ago, ran into infrastructure outages, and quietly raised prices 60 days later.
>
> For HackwithHyderabad 3.0, we built **AdaptiveMarket**—the first self-evolving Chief Strategy Officer agent powered by @vectorize_io Hindsight and @GroqInc.
>
> 🧠 **What it does differently:**
> 1. Ingests competitor pricing, outages, and lost deal notes into a biomimetic memory bank.
> 2. Uses TEMPR 4-way retrieval (semantic + BM25 + temporal recency) to recall competitor patterns.
> 3. Autonomously mutates its sales battlecards, locks in an enterprise SLA defense, and re-ranks product backlog features (SOC2 → P0).
>
> Watch the strategy morph on screen:
> 🔗 Repo: https://github.com/RohanExploit/adaptive-market
>
> #AIAgents #VectorizeHindsight #Groq #CompetitiveIntelligence #BuildInPublic #OpenSource

*(Add to comments: Powered by the incredible team at https://github.com/vectorize-io/hindsight)*

---

## 4. 60-Second Video Voiceover Script (for `docs/demo/demo-recording.webm`)

- **0:00 - 0:15 (Act 1: Stateless Baseline):**  
  *"This is AdaptiveMarket. In Act 1, Competitor A slashes prices by 30%. Notice what a stateless AI does: it panics. It recommends matching the price cut at $32/mo, destroying 40% of our gross margin. Why? Because without memory, it has zero temporal context."*

- **0:15 - 0:35 (Act 2: Ingesting 3 Months of Memory):**  
  *"Now watch Act 2. We ingest 3 months of competitor signals into Vectorize Hindsight: Competitor A suffered 4 outages, prospects left due to week-long ticket delays, and Competitor B rolled back a similar discount 60 days later. Hindsight consolidates these raw facts into 12 strategic observations."*

- **0:35 - 1:00 (Act 3: The Evolved CSO Agent):**  
  *"Now we trigger Act 3. Look at the Strategy Morph Console—it completely rewrote itself! Instead of discounting, it anchors on a 99.99% SLA guarantee and a $39/mo Starter Annual tier. And in the Roadmap tab, lost enterprise deals automatically boosted SOC2 compliance from P2 to P0. This is the power of memory-first competitive strategy with Vectorize Hindsight."*
