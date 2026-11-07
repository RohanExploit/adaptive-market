# Technical Requirements Document (TRD): AdaptiveMarket Architecture & Implementation Spec for Antigravity

## 1. System Architecture & Tech Stack Overview

This TRD provides a complete, build-ready engineering specification for **Antigravity** to scaffold, implement, and run **AdaptiveMarket**—the self-evolving competitive strategy agent powered by [Vectorize Hindsight](https://hindsight.vectorize.io/) ([vectorize-io/hindsight](https://github.com/vectorize-io/hindsight)), [Groq](https://groq.com/), and [Band AI Desktop](https://www.band.ai/).

| Layer | Component | Package / Model | Purpose & Source Reference |
| :--- | :--- | :--- | :--- |
| **Agent Memory Engine** | [Hindsight Cloud](https://ui.hindsight.vectorize.io) or Docker (`ghcr.io/vectorize-io/hindsight:latest`) | `v1.1.0+` | 5-layer biomimetic memory (`world`, `experience`, `observation`, `mental-models`, `knowledge-pages`) ([Hindsight Installation](https://hindsight.vectorize.io/developer/installation)). |
| **Python SDK** | `hindsight-client` | Latest (`pip install hindsight-client -U`) | Manages memory banks, retains competitor signals, runs TEMPR recalls, and executes reflect loops ([Python Client Docs](https://hindsight.vectorize.io/sdks/python)). |
| **Primary LLM Engine** | [Groq](https://groq.com/) (`openai/gpt-oss-120b`) | 120B MoE (131K ctx, ~500+ TPS) | Executes deep strategic reflection, market trend synthesis, and structured JSON output ([Hindsight Models](https://hindsight.vectorize.io/developer/models), [Groq Changelog](https://console.groq.com/docs/changelog)). |
| **Fast Tool & Chat LLM** | [Groq](https://groq.com/) (`qwen/qwen3-32b`) | 32B Dense (128K ctx, ~491 TPS) | Powers interactive sales roleplay and rapid battlecard drafting with `reasoning_effort="none"` ([Groq Changelog](https://console.groq.com/docs/changelog)). |
| **Backend API** | FastAPI / Python 3.11+ | `fastapi`, `uvicorn`, `pydantic>=2.0`, `groq`, `httpx` | Handles competitor event ingestion, strategy mutation endpoints, and Hindsight synchronization. |
| **Frontend UI** | Next.js 15 (App Router), React 19, Tailwind CSS, Lucide | TypeScript | Split-screen interface: Live Market Signal & Strategy Morph Console (Left) + Real-time Hindsight Memory Inspector (Right). |
| **Multi-Agent / Desktop** | [Band AI Desktop](https://docs.band.ai/band-desktop) + [OpenClaw](https://opencode.ai/) | `band-sdk>=6.0.1`, `@vectorize-io/hindsight-openclaw` | Connects the strategy agent to Band AI collaborative rooms for GTM team alignment ([Band Integration Paths](https://docs.band.ai/integrations/sdks/overview), [OpenClaw Integration Docs](https://hindsight.vectorize.io/sdks/integrations/openclaw)). |

---

## 2. Target Repository Directory Structure

Instruct Antigravity to scaffold the following structure:

```text
adaptive-market/
├── .env.example
├── docker-compose.yml
├── README.md
├── backend/
│   ├── requirements.txt
│   ├── main.py                         # FastAPI routes and server setup
│   ├── config.py                       # Configuration & API keys
│   ├── memory/
│   │   ├── hindsight_service.py        # Retain, recall (TEMPR), reflect, consolidate wrappers
│   │   ├── bank_bootstrap.py           # Initializes bank mission, disposition, directives & mental models
│   │   └── seed_competitor_data.py     # 3-month simulated competitor moves (pricing, features, outages)
│   ├── agents/
│   │   ├── groq_resilient_client.py    # Groq client with 400 tool_use_failed retry & schema validation
│   │   ├── battlecard_mutator.py       # Re-synthesizes sales objection battlecards
│   │   ├── pricing_strategist.py       # Adjusts pricing tiers & discount thresholds based on history
│   │   └── roadmap_prioritizer.py      # Re-ranks product backlog based on competitor threats
│   └── band_integration/
│       └── band_gtm_handler.py         # Band AI room peer integration (@adaptive-market)
└── frontend/
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx                # Split-Screen Demo Dashboard
    │   │   └── api/                    # Next.js API proxy routes
    │   └── components/
    │       ├── SignalFeed.tsx          # Real-time competitor moves & simulator controls
    │       ├── StrategyMorphConsole.tsx # Displays shifting Battlecards, Pricing, and Roadmap
    │       ├── MemoryBankInspector.tsx # Real-time World/Experience/Observation/MentalModel viewer
    │       └── TemprVisualizer.tsx     # 4-way Semantic, BM25, Graph, Temporal & Reranker score cards
```

---

## 3. Environment Configuration & Hindsight Setup

### 3.1 `.env.example`
```ini
# Hindsight Setup (Cloud with promo code MEMHACK99 or local Docker)
HINDSIGHT_BASE_URL=https://api.hindsight.vectorize.io
HINDSIGHT_API_KEY=hsk_your_hindsight_api_key
HINDSIGHT_BANK_ID=adaptive-market-prod

# Groq LLM API
GROQ_API_KEY=gsk_your_groq_api_key
GROQ_PRIMARY_MODEL=openai/gpt-oss-120b
GROQ_FAST_MODEL=qwen/qwen3-32b

# Self-Hosted Docker Tuning (if running locally on port 8888)
HINDSIGHT_API_LLM_PROVIDER=groq
HINDSIGHT_API_LLM_MODEL=openai/gpt-oss-120b
HINDSIGHT_API_RETAIN_MAX_COMPLETION_TOKENS=32000
HINDSIGHT_API_WORKER_ID=adaptive-market-worker

# Band AI Desktop Room
BAND_API_KEY=band_your_key
BAND_ROOM_ID=gtm-war-room
```

### 3.2 Hindsight Memory Bank Bootstrap (`backend/memory/bank_bootstrap.py`)
```python
import os
import httpx
from hindsight_client import Hindsight

HINDSIGHT_BASE_URL = os.getenv("HINDSIGHT_BASE_URL", "https://api.hindsight.vectorize.io")
HINDSIGHT_API_KEY = os.getenv("HINDSIGHT_API_KEY", "")
BANK_ID = os.getenv("HINDSIGHT_BANK_ID", "adaptive-market-prod")

def bootstrap_market_bank():
    client = Hindsight(
        base_url=HINDSIGHT_BASE_URL,
        api_key=HINDSIGHT_API_KEY,
        timeout=30.0,
    )
    # 1. Create or update the Competitive Intelligence Bank
    client.create_bank(
        bank_id=BANK_ID,
        name="AdaptiveMarket Competitive Intelligence & Strategy",
        mission=(
            "You are AdaptiveMarket, an autonomous Chief Strategy Officer. "
            "Track competitor feature launches, pricing updates, marketing shifts, customer sentiment, "
            "and internal win/loss patterns. Synthesize how our business strategy should autonomously mutate."
        ),
        disposition={
            "skepticism": 4,   # High skepticism: treat competitor marketing claims with critical scrutiny
            "literalism": 3,   # Balanced literalism: connect high-level strategy with exact pricing figures
            "empathy": 3,      # Understand customer buying pain points and friction
        },
    )

    headers = {"Authorization": f"Bearer {HINDSIGHT_API_KEY}", "Content-Type": "application/json"}

    # 2. Configure Granular Extraction Missions
    httpx.patch(
        f"{HINDSIGHT_BASE_URL}/v1/default/banks/{BANK_ID}/config",
        headers=headers,
        json={
            "retain_mission": (
                "Extract competitor names, exact pricing tiers, feature capabilities, announced dates, "
                "customer sentiment/complaints, and observed win/loss deal reasons."
            ),
            "observations_mission": (
                "Synthesize competitor behavioral patterns over time: distinguish temporary promotional "
                "tactics from permanent strategy shifts, and identify competitor operational vulnerabilities."
            ),
            "reflect_mission": (
                "Always ground strategic advice in historical competitor moves. Recommend concrete tactical "
                "changes to sales battlecards, pricing models, and roadmap priorities."
            ),
            "retain_extraction_mode": "concise",
        },
        timeout=15.0,
    )

    # 3. Pinned Mental Model for Real-Time Strategy Evaluation
    httpx.post(
        f"{HINDSIGHT_BASE_URL}/v1/default/banks/{BANK_ID}/mental-models",
        headers=headers,
        json={
            "id": "competitive-landscape-mental-model",
            "name": "Live Competitive Landscape & GTM Strategy Directives",
            "source_query": (
                "What are our primary competitors' current pricing tiers, recent feature rollouts, "
                "known product weaknesses, and our optimal positioning strategy against each?"
            ),
            "refresh_after_consolidation": True,
        },
        timeout=15.0,
    )
    client.close()
```

---

## 4. Core Hindsight Operations (`backend/memory/hindsight_service.py`)

```python
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
import httpx
from hindsight_client import Hindsight
from backend.config import HINDSIGHT_BASE_URL, HINDSIGHT_API_KEY, BANK_ID

class MarketMemoryService:
    def __init__(self):
        self.client = Hindsight(
            base_url=HINDSIGHT_BASE_URL,
            api_key=HINDSIGHT_API_KEY,
            timeout=30.0,
        )
        self.headers = {
            "Authorization": f"Bearer {HINDSIGHT_API_KEY}",
            "Content-Type": "application/json",
        }

    def retain_market_signal(
        self,
        content: str,
        context: str,
        document_id: str,
        tags: List[str],
        metadata: Dict[str, str],
    ) -> Dict[str, Any]:
        """Ingests a competitor move (pricing change, feature launch, customer review, or lost deal)."""
        self.client.retain(
            bank_id=BANK_ID,
            content=content,
            context=context,
            timestamp=datetime.now(timezone.utc),
            document_id=document_id,
            metadata=metadata,
            tags=tags,
            retain_async=False,
        )
        # Trigger immediate consolidation so observations form instantly for the live demo
        httpx.post(
            f"{HINDSIGHT_BASE_URL}/v1/default/banks/{BANK_ID}/consolidate",
            headers=self.headers,
            timeout=20.0,
        )
        return {"success": True, "document_id": document_id}

    def recall_competitor_context(
        self,
        query: str,
        tags: Optional[List[str]] = None,
        budget: str = "high",
    ) -> Dict[str, Any]:
        """Executes 4-way TEMPR retrieval across competitor history with full trace for the UI."""
        payload: Dict[str, Any] = {
            "query": query,
            "types": ["world", "experience", "observation"],
            "prefer_observations": True,
            "budget": budget,
            "max_tokens": 4096,
            "include": {"chunks": True, "source_facts": True, "entities": True},
            "trace": True,
        }
        if tags:
            payload["tags"] = tags
            payload["tags_match"] = "any"

        r = httpx.post(
            f"{HINDSIGHT_BASE_URL}/v1/default/banks/{BANK_ID}/memories/recall",
            headers=self.headers,
            json=payload,
            timeout=25.0,
        )
        r.raise_for_status()
        return r.json()

    def reflect_adapted_strategy(
        self,
        query: str,
        context: str,
        response_schema: Dict[str, Any],
    ) -> Dict[str, Any]:
        """Runs Hindsight's autonomous reflection loop to mutate strategy with structured output."""
        payload = {
            "query": query,
            "context": context,
            "budget": "mid",
            "max_tokens": 4096,
            "response_schema": response_schema,
            "include": {"facts": True, "tool_calls": True},
        }
        r = httpx.post(
            f"{HINDSIGHT_BASE_URL}/v1/default/banks/{BANK_ID}/reflect",
            headers=self.headers,
            json=payload,
            timeout=30.0,
        )
        r.raise_for_status()
        return r.json()

    def inspect_memory_bank(self) -> Dict[str, Any]:
        """Fetches active memory units and mental models for the Live Memory Inspector UI."""
        memories = httpx.get(
            f"{HINDSIGHT_BASE_URL}/v1/default/banks/{BANK_ID}/memories/list",
            headers=self.headers,
            params={"state": "valid"},
            timeout=15.0,
        )
        models = httpx.get(
            f"{HINDSIGHT_BASE_URL}/v1/default/banks/{BANK_ID}/mental-models",
            headers=self.headers,
            params={"detail": "full"},
            timeout=15.0,
        )
        return {
            "memories": memories.json() if memories.status_code == 200 else [],
            "mental_models": models.json() if models.status_code == 200 else [],
        }
```

---

## 5. Groq Tool-Calling Engine with Retry Handling (`backend/agents/groq_resilient_client.py`)

Handles Groq HTTP `400 tool_use_failed` errors and prevents the known `openai/gpt-oss-120b` JSON constrainer conflict:

```python
import json
import os
from typing import Any, Callable, Dict, List, Optional
from groq import Groq

class ResilientGroqAgent:
    def __init__(self):
        self.client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
        self.primary_model = os.environ.get("GROQ_PRIMARY_MODEL", "openai/gpt-oss-120b")
        self.fast_model = os.environ.get("GROQ_FAST_MODEL", "qwen/qwen3-32b")

    def chat_with_tool_retry(
        self,
        messages: List[Dict[str, Any]],
        tools: Optional[List[Dict[str, Any]]] = None,
        model: Optional[str] = None,
        max_retries: int = 3,
    ) -> Any:
        target_model = model or self.primary_model
        temperature = 0.2

        for attempt in range(max_retries):
            try:
                kwargs: Dict[str, Any] = {
                    "model": target_model,
                    "messages": messages,
                    "temperature": temperature,
                    "max_completion_tokens": 4096,
                }
                if tools:
                    kwargs["tools"] = tools
                    kwargs["tool_choice"] = "auto"
                if "qwen3" in target_model:
                    kwargs["reasoning_effort"] = "none"

                return self.client.chat.completions.create(**kwargs)

            except Exception as err:
                status_code = getattr(err, "status_code", None)
                err_body = str(err)
                if status_code == 400 and ("tool_use_failed" in err_body or "failed_generation" in err_body):
                    temperature = max(0.0, temperature - 0.1)
                    if attempt == 1:
                        messages = messages + [
                            {
                                "role": "system",
                                "content": "CRITICAL: Emit strictly valid RFC-8259 JSON for all tool call arguments.",
                            }
                        ]
                    if attempt == max_retries - 2:
                        target_model = self.fast_model if target_model == self.primary_model else self.primary_model
                    continue
                raise
        raise RuntimeError("Groq tool call failed after maximum retries.")
```

---

## 6. Adaptation Strategy Modules

### 6.1 Self-Adapting Sales Battlecard Generator (`backend/agents/battlecard_mutator.py`)
Uses `reflect_adapted_strategy` with a Pydantic schema to generate hyper-personalized objection handling:
```python
BATTLECARD_SCHEMA = {
    "type": "object",
    "properties": {
        "competitor_name": {"type": "string"},
        "our_adapted_positioning": {"type": "string"},
        "key_vulnerability_to_target": {"type": "string"},
        "recommended_objection_script": {"type": "string"},
        "pricing_guidance": {"type": "string"},
        "historical_evidence_cited": {
            "type": "array",
            "items": {"type": "string"}
        }
    },
    "required": [
        "competitor_name", "our_adapted_positioning", "key_vulnerability_to_target",
        "recommended_objection_script", "pricing_guidance", "historical_evidence_cited"
    ]
}
```

---

## 7. FastAPI Endpoints & UI Contract (`backend/main.py`)

| Endpoint | Method | Payload / Params | Functionality |
| :--- | :--- | :--- | :--- |
| `/api/bootstrap` | `POST` | `{"reset_demo": bool}` | Bootstraps bank mission, directives, mental model, and seeds initial data. |
| `/api/signals/ingest` | `POST` | `{"source": str, "competitor": str, "headline": str, "content": str, "category": str}` | Retains a competitor signal and triggers observation consolidation. |
| `/api/strategy/morph` | `POST` | `{"competitor": str, "scenario_prompt": str, "use_memory": bool}` | Runs `reflect_adapted_strategy` to generate the mutated Battlecard, Pricing recommendation, and Roadmap priority. |
| `/api/memory/inspector` | `GET` | `?bank_id=adaptive-market-prod` | Returns live `world`, `experience`, `observation`, and `mental_model` units for the Right-Pane Inspector. |

---

## 8. Step-by-Step Antigravity Implementation Instructions

1. **Scaffold the Monorepo:** Create `adaptive-market/` following the layout in Section 2.
2. **Setup Backend:** Write `requirements.txt` (`fastapi`, `uvicorn`, `hindsight-client`, `groq`, `httpx`, `pydantic`), wire `bank_bootstrap.py`, `hindsight_service.py`, and `groq_resilient_client.py`.
3. **Seed 60-Second Demo Data:** In `seed_competitor_data.py`, seed Competitor A (aggressive discount -> infrastructure failures -> support churn) and Competitor B (stealing enterprise deals due to compliance features).
4. **Build Frontend:** Create Next.js 15 split-screen dashboard:
   * **Left Pane:** "Simulate Competitor Move" action bar, "Stateless vs. Hindsight" toggle, and morphing Battlecard/Pricing/Roadmap cards.
   * **Right Pane:** Live Hindsight Memory Bank Inspector showing World Facts, Experience Facts, Consolidated Observations, Mental Models, and TEMPR 4-way search score bars.
5. **Verify End-to-End:** Run `/api/bootstrap`, test stateless vs. memory-adapted strategy generation, and confirm TEMPR scores render live.