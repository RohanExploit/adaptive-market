# Product Requirements Document (PRD): AdaptiveMarket — The Self-Evolving Competitive Intelligence & Strategy Agent

## 1. Executive Summary & Product Vision

**AdaptiveMarket** is an autonomous, memory-first Competitive Intelligence & Self-Adapting Strategy Agent designed for the [HackwithHyderabad 3.0 Problem Statament](https://docs.google.com/document/d/1A4ezag02em823ZzYF34DiUVHUNLWI5ztm70QvWidWoQ/edit?usp=drivesdk&ouid=109048695587118270487). While existing market research tools merely generate passive one-time PDF summaries of competitor moves, **AdaptiveMarket uses [Vectorize Hindsight](https://hindsight.vectorize.io/) ([vectorize-io/hindsight](https://github.com/vectorize-io/hindsight)) to autonomously "change itself"**: dynamically rewriting its sales battlecards, recalibrating pricing tiers, reframing marketing messaging, and re-ranking the product feature roadmap over time as competitors launch features or slash prices.

### Why This Concept Dominates HackwithHyderabad 3.0
1. **Direct Match with Problem Statement:** The [HackwithHyderabad 3.0 Problem Statament](https://docs.google.com/document/d/1A4ezag02em823ZzYF34DiUVHUNLWI5ztm70QvWidWoQ/edit?usp=drivesdk&ouid=109048695587118270487) explicitly highlights **Competitive Intelligence Agent** under Product & Strategy:
   > *"Monitors and remembers competitor moves: pricing changes, feature launches, messaging shifts, hiring patterns. Builds an evolving picture of the competitive landscape. Competitive intelligence is only useful if it is cumulative. An agent that remembers six months of competitor activity spots patterns that a weekly check never would."*
2. **True "Agent That Learns & Changes Itself":** The project doesn't just display a dashboard; it modifies the core operating parameters of the business agent. When Competitor X cuts prices by 30%, the agent doesn't panic-discount; it recalls previous discount cycles from Hindsight memory, reflects that Competitor X suffered customer churn due to poor support, and updates its sales pitch to double-down on enterprise SLA guarantees.
3. **High-Value B2B Problem:** Companies easily pay $200–$1,000/month for tools like Crayon, Klue, or AlphaSense. A self-adapting agent that converts competitor signals into immediate tactical action is an indisputable $50+/month enterprise product.

---

## 2. Devpost Winner Inspiration & Hindsight Integration Matrix

We analyzed real Devpost winning and featured hackathon projects in competitive research and pricing to identify what was missing and how Hindsight transforms them:

| Devpost Benchmark | Hackathon Track | Original Problem Solved | Stateless Limitation | How AdaptiveMarket + Hindsight Upgrades It |
| :--- | :--- | :--- | :--- | :--- |
| [CorpIntel AI](https://devpost.com/software/forgehacks-mini-project) | Multi-Agent Competitive Intelligence | Multi-agent research pipeline that scrapes competitors and generates evidence-backed reports ([CorpIntel AI](https://devpost.com/software/forgehacks-mini-project)). | Stateless & single-run: reports are generated in isolation; does not track competitor trajectory over time or adapt internal strategies ([CorpIntel AI](https://devpost.com/software/forgehacks-mini-project)). | Retains historical competitor events as `world` facts and uses [Hindsight Reflect API](https://hindsight.vectorize.io/developer/api/reflect) to synthesize evolving competitor behavioral patterns over time. |
| [GrowthSphere AI](https://devpost.com/software/growth-sphere-ai) | Autonomous Growth Operating System | 12-agent pipeline coordinating research, content, pricing, and sales ([GrowthSphere AI](https://devpost.com/software/growth-sphere-ai)). | Static inter-agent communication: passes validated outputs in a single chain without a cumulative memory bank of past campaign outcomes or competitor counter-moves ([GrowthSphere AI](https://devpost.com/software/growth-sphere-ai)). | Uses [Hindsight Memory Banks](https://hindsight.vectorize.io/developer/api/memory-banks) to maintain a living "Brand Strategy Mental Model" that automatically updates when market shifts occur. |
| [WorkPilot](https://devpost.com/software/workpilot-usr7t3) | Autonomous Competitive Intelligence Briefs | Executes task-based web research on Stripe, Adyen, and Paddle with human approval gates ([WorkPilot](https://devpost.com/software/workpilot-usr7t3)). | Each run restarts from scratch; does not remember what Stripe priced 3 months ago or how previous pricing updates impacted win rates ([WorkPilot](https://devpost.com/software/workpilot-usr7t3)). | Uses Hindsight TEMPR 4-way search ([Hindsight Recall API](https://hindsight.vectorize.io/developer/api/recall)) with temporal queries to compare historical competitor pricing with current positioning. |
| [Ayor.AI](https://devpost.com/software/ayor-ai) | Agentic Product Launch & Dynamic Pricing | Scrapes competitor benchmarks to generate landing pages and run dynamic pricing experiments ([Ayor.AI](https://devpost.com/software/ayor-ai)). | Dynamic pricing lacks context on competitor motives (e.g., promotional flash sales vs permanent tier restructuring) ([Ayor.AI](https://devpost.com/software/ayor-ai)). | Stores competitor history as `experience` facts so the agent learns competitor seasonality and avoids margin-destroying price wars. |

---

## 3. Alignment with HackwithHyderabad 3.0 Judging Criteria

| Judging Criterion | Weight | How AdaptiveMarket Nails It |
| :--- | :--- | :--- |
| **Innovation** | **30%** | Goes far beyond a generic "market research summarizer." The agent actively **mutates its own internal configuration** (sales prompts, pricing algorithms, product priority scorecards) in response to cumulative competitor signals. |
| **Use of Hindsight Memory** | **25%** | Memory is the absolute core: without Hindsight, the agent gives knee-jerk, one-shot reactions to every competitor move. With Hindsight, it utilizes `world` facts, `experience` logs, consolidated `observations`, and dynamic `mental-models` to execute strategic, measured adaptations. |
| **Technical Implementation** | **20%** | Built with FastAPI, Next.js 15, [Hindsight Python SDK](https://hindsight.vectorize.io/sdks/python) (`hindsight-client`), [Groq](https://groq.com/) (`openai/gpt-oss-120b` & `qwen/qwen3-32b`), and multi-agent coordination on [Band AI Desktop](https://docs.band.ai/band-desktop). |
| **User Experience** | **15%** | Dual-pane interface: Left pane shows the **Live Market Signal Feed & Strategy Morph Console**; Right pane shows the **Live Hindsight Memory Inspector** (displaying memory graphs, confidence scores, and TEMPR search metrics). |
| **Real-world Impact** | **10%** | Direct B2B enterprise application: Product Managers, Heads of Sales, and Founders can watch their GTM strategy autonomously adapt without weeks of manual competitive benchmarking. |

---

## 4. How the Agent "Changes Itself": 4 Autonomous Adaptation Engines

When new competitor intelligence is ingested into Hindsight (`retain`), the agent runs `reflect` across 4 operational modules:

1. **Self-Adapting Sales Battlecards (`/api/strategy/battlecard`):**
   * *Before Memory:* Gives generic objection handling ("Our product is reliable and easy to use").
   * *After Memory:* Recalls that Competitor A launched a free tier but their Reddit/G2 reviews complain about poor uptime and zero phone support. The battlecard autonomously re-anchors to *"Highlight 99.99% Enterprise SLA and dedicated Slack support when facing Competitor A"*.
2. **Self-Calibrating Pricing & Packaging (`/api/strategy/pricing`):**
   * *Before Memory:* Competitor B drops price to $29/mo; stateless bot recommends dropping price to $25/mo (racing to the bottom).
   * *After Memory:* Recalls that 6 months ago Competitor B did the same promo and raised prices 60 days later; reflects on our 85% gross margin requirement. The agent modifies its packaging to add a targeted "Starter Annual" tier at $39/mo with higher usage limits instead of slashing price.
3. **Dynamic Roadmap Priority Re-Ranking (`/api/strategy/roadmap`):**
   * *Before Memory:* Feature backlog is static based on initial guesses.
   * *After Memory:* Detects that Competitor C launched SOC2 compliance and native Slack integration, stealing 3 enterprise prospects in past retained lost-deal reviews. The agent autonomously re-ranks the internal feature backlog, boosting "SOC2 Automation" to P0.
4. **Adaptive Marketing & Homepage Positioning (`/api/strategy/positioning`):**
   * *Before Memory:* Static hero headline: "The Best Project Management Tool."
   * *After Memory:* As market crowding intensifies, reflects on competitor claims and rewrites hero copy and ad angles: "The Only Incident-Aware Project Management Platform with Real-Time SLA Guarantees."

---

## 5. Scripted 60-Second Judge Demo Flow

| Time Window | Demo Action | Screen Visualization | Hindsight Operations Executed |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:15 (Act 1: Cold Start / Stateless Baseline)** | Click **"Simulate Competitor Move 1: Stripe/Competitor A Slashes Price 30%"**. | Left pane shows the stateless recommendation: panic-discount our product by 35% and dilute margins. Sales pitch is generic feature comparison. | `recall()` returns 0 memories; agent defaults to ungrounded LLM advice ([Hindsight Recall API](https://hindsight.vectorize.io/developer/api/recall)). |
| **0:15 – 0:35 (Act 2: The Learning Phase / Cumulative Retention)** | Click **"Ingest 3-Month Competitor History & Market Feedback"**. | Feed ingests: (1) Competitor A suffered 4 major outages after price cut, (2) Prospect calls show churn from Competitor A due to unresponsiveness, (3) Competitor B hired 10 enterprise sales reps in EMEA. | Calls `client.retain()` ([Hindsight Retain API](https://hindsight.vectorize.io/developer/api/retain)), executes `POST .../consolidate` ([Memory Banks API](https://hindsight.vectorize.io/developer/api/memory-banks)), and synthesizes an `Observation`: *"Competitor A is sacrificing support quality for market share"*. |
| **0:35 – 1:00 (Act 3: The Evolved Self-Adapting Agent)** | Click **"Simulate Competitor Move 2: Prospect Asks 'Why Shouldn't We Choose Competitor A?'"**. | The agent's battlecard and pricing strategy **visibly morph on screen**! Instead of discounting, it presents an ROI value-matrix, targets Competitor A's support deficit, and outputs a refined pricing plan with 99.99% uptime guarantee. Right pane highlights the recalled `mental_model` and `observation` confidence score (0.94)! | Calls `recall()` (TEMPR 4-way fusion) ([Hindsight Recall API](https://hindsight.vectorize.io/developer/api/recall)) + `reflect()` with structured Pydantic schema ([Hindsight Reflect API](https://hindsight.vectorize.io/developer/api/reflect)). |

---

## 6. Submission Deliverables Checklist

- [x] **GitHub Repository:** Monorepo with FastAPI backend, Next.js 15 UI, Hindsight memory service, and Groq reasoning engine.
- [x] **Demo Video (2–5 min, 1080p):** Crisp narrative showing the agent evolving its strategy before vs. after competitor memory ingestion.
- [x] **Live Demo for Judges:** Interactive split-screen dashboard with one-click simulation buttons.
- [x] **Technical Article & Reddit Share:** Technical post on Medium/[Dev.to](http://dev.to) explaining biomimetic memory for market intelligence (no mention of "hackathon" in title) shared to `r/aiagents` and `r/aimemory` ([Hackathon Content Guide](https://drive.google.com/open?id=1Spy4cclvZtWFI_ynXLcSDGBSVqb_Zjp2M1ffXqWeOXU)).
- [x] **LinkedIn / X Post:** Andrej Karpathy-style insight on why stateless agents fail at competitive strategy, linking repo in post and [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) in comments ([Hackathon Content Guide](https://drive.google.com/open?id=1Spy4cclvZtWFI_ynXLcSDGBSVqb_Zjp2M1ffXqWeOXU)).
