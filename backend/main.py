from typing import Any, Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.agents import strategy
from backend.agents.signal_extractor import extract_signal_from_raw_text
from backend.band_integration.band_gtm_handler import BandGtmHandler
from backend.memory.hindsight_service import MarketMemoryService
from backend.memory.seed_competitor_data import SEED_SIGNALS

app = FastAPI(
    title="AdaptiveMarket API",
    description="Autonomous, memory-first Competitive Intelligence & Strategy Agent powered by Vectorize Hindsight and Groq",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory = MarketMemoryService()
band_handler = BandGtmHandler(memory)


# --- Request & Response Schemas ---

class Signal(BaseModel):
    source: str
    competitor: str
    headline: str
    content: str
    category: str


class RawSignalRequest(BaseModel):
    raw_text: str
    inferred_source: Optional[str] = "unstructured-input"


class MorphRequest(BaseModel):
    competitor: str = "Competitor A"
    scenario_prompt: str = "Why shouldn't we choose Competitor A?"
    use_memory: bool = True


class BootstrapRequest(BaseModel):
    reset_demo: bool = False


class BandChatRequest(BaseModel):
    sender: str = "GTM-User"
    message: str


# --- Endpoints ---

@app.get("/api/health")
def health():
    return {
        "ok": True,
        "hindsight_configured": memory.live,
        "bank_id": "adaptive-market-prod",
        "primary_llm": "openai/gpt-oss-120b",
        "fast_llm": "openai/gpt-oss-20b",
    }


@app.post("/api/bootstrap")
def bootstrap(req: BootstrapRequest):
    if req.reset_demo:
        memory.reset()
    status = "local-only"
    if memory.live:
        try:
            from backend.memory.bank_bootstrap import bootstrap_market_bank
            bootstrap_market_bank()
            status = "hindsight-bank-ready"
        except Exception as e:
            status = f"hindsight-unavailable: {type(e).__name__}"
    return {"status": status}


@app.post("/api/signals/ingest")
def ingest(signal: Signal):
    """Retains a structured competitor signal into Hindsight and triggers background consolidation."""
    return memory.retain_market_signal(signal.model_dump())


@app.post("/api/signals/extract-and-ingest")
def extract_and_ingest(req: RawSignalRequest):
    """Autonomous Signal Extraction Agent: parses raw unstructured text into structured intelligence,

    then retains and consolidates it in Vectorize Hindsight.
    """
    extracted = extract_signal_from_raw_text(req.raw_text)
    if req.inferred_source:
        extracted["source"] = req.inferred_source
    res = memory.retain_market_signal(extracted)
    return {
        "extracted_signal": extracted,
        "retention": res,
    }


@app.post("/api/signals/seed")
def seed():
    """Seeds the 3-month simulated competitor moves (pricing, outages, hiring, lost deals)."""
    return {"results": [memory.retain_market_signal(s) for s in SEED_SIGNALS]}


@app.get("/api/signals/list")
def list_signals():
    """Returns all active competitor signals."""
    return {
        "signals": memory.local if memory.local else SEED_SIGNALS,
        "is_seeded": len(memory.local) > 0,
        "total_signals": len(memory.local) if memory.local else len(SEED_SIGNALS),
    }


@app.get("/api/competitors/benchmark")
def competitor_benchmark():
    """Returns head-to-head benchmarking metrics across Our Stack vs Comp A vs Comp B."""
    return {
        "our_product": {
            "name": "AdaptiveMarket",
            "tier": "Enterprise Strategy Cloud",
            "price": "$49/mo (or $39/mo Starter Annual)",
            "uptime_sla": "99.99% Enterprise SLA Guarantee",
            "support": "Dedicated 24/7 Phone + Shared Slack Channel",
            "compliance": "SOC2 Automation (Accelerated P0)",
            "positioning": "Memory-First Self-Adapting Strategy Engine",
            "moat": "Vectorize Hindsight 5-Layer Biomimetic Memory",
        },
        "competitor_a": {
            "name": "Competitor A",
            "tier": "Self-Serve Commodity",
            "price": "$34/mo (Slashed 30% from $49) + Free Tier",
            "uptime_sla": "99.1% (4 major outages in 6 weeks)",
            "support": "Email ticket only (Week-long delays, high churn)",
            "compliance": "Basic GDPR Only",
            "positioning": "Lowest Price Leader",
            "moat": "None (racing to the bottom, degrading infrastructure)",
        },
        "competitor_b": {
            "name": "Competitor B",
            "tier": "Legacy Enterprise Suite",
            "price": "$69/mo (Raised after 60-day promo)",
            "uptime_sla": "99.9% Historical SLA",
            "support": "Business Hours Standard Support",
            "compliance": "SOC2 Type II + Native Slack Integration",
            "positioning": "Compliance-First Enterprise Standard",
            "moat": "Enterprise certifications & 10 EMEA sales reps",
        },
    }


@app.post("/api/strategy/morph")
def morph(req: MorphRequest):
    """Executes the autonomous strategy mutation loop:

    - Stateless mode: Zero memories, defaults to panic discounting.
    - Hindsight mode: TEMPR 4-way neural recall + Groq 120B reflection to morph battlecards, pricing, and roadmap.
    """
    if not req.use_memory:
        return {**strategy.stateless(req.competitor), "recalled": 0, "tempr": {}}

    recalled = memory.recall(req.scenario_prompt, req.competitor)
    results = [r for r in recalled.get("results", []) if "content" in r]
    wide = [
        r
        for r in memory.recall(
            "competitor pricing history, compliance and lost enterprise deals"
        ).get("results", [])
        if "content" in r
    ]

    out = strategy.adapted(req.competitor, req.scenario_prompt, results, wide)
    out["hindsight_reflection"] = memory.reflect(req.scenario_prompt) if results else None
    return {
        **out,
        "recalled": len(results),
        "tempr": recalled.get("tempr", {}),
        "memory_source": recalled.get("source"),
    }


@app.get("/api/memory/inspector")
def inspector(bank_id: Optional[str] = None):
    """Returns the live 5-layer biomimetic memory bank units, observations, and mental models."""
    return memory.inspect()


@app.post("/api/band/chat")
def band_chat(req: BandChatRequest):
    """Band AI Desktop & OpenClaw chat endpoint. Responds to @adaptive-market commands."""
    return band_handler.handle_message(req.sender, req.message)


@app.post("/api/band/webhook")
def band_webhook(payload: Dict[str, Any]):
    """Webhook listener for Band AI Room events."""
    sender = payload.get("sender", "Band-Peer")
    text = payload.get("text", payload.get("message", "/status"))
    return band_handler.handle_message(sender, text)
