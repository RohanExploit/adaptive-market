from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.agents import strategy
from backend.memory.hindsight_service import MarketMemoryService
from backend.memory.seed_competitor_data import SEED_SIGNALS

app = FastAPI(title="AdaptiveMarket")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
memory = MarketMemoryService()


class Signal(BaseModel):
    source: str
    competitor: str
    headline: str
    content: str
    category: str


class MorphRequest(BaseModel):
    competitor: str = "Competitor A"
    scenario_prompt: str = "Why shouldn't we choose Competitor A?"
    use_memory: bool = True


class BootstrapRequest(BaseModel):
    reset_demo: bool = False


@app.get("/api/health")
def health():
    return {"ok": True, "hindsight_configured": memory.live}


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
    return memory.retain_market_signal(signal.model_dump())


@app.post("/api/signals/seed")
def seed():
    return {"results": [memory.retain_market_signal(s) for s in SEED_SIGNALS]}


@app.post("/api/strategy/morph")
def morph(req: MorphRequest):
    if not req.use_memory:
        return {**strategy.stateless(req.competitor), "recalled": 0, "tempr": {}}
    recalled = memory.recall(req.scenario_prompt, req.competitor)
    results = [r for r in recalled.get("results", []) if "content" in r]
    wide = [r for r in memory.recall("competitor pricing history, compliance and lost enterprise deals").get("results", []) if "content" in r]
    out = strategy.adapted(req.competitor, req.scenario_prompt, results, wide)
    out["hindsight_reflection"] = memory.reflect(req.scenario_prompt) if results else None
    return {**out,
            "recalled": len(results), "tempr": recalled.get("tempr", {}),
            "memory_source": recalled.get("source")}


@app.get("/api/signals/list")
def list_signals():
    return {
        "signals": memory.local if memory.local else SEED_SIGNALS,
        "is_seeded": len(memory.local) > 0,
        "total_signals": len(memory.local) if memory.local else len(SEED_SIGNALS),
    }


@app.get("/api/competitors/benchmark")
def competitor_benchmark():
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


@app.get("/api/memory/inspector")
def inspector(bank_id: Optional[str] = None):
    return memory.inspect()
