# AdaptiveMarket

A self-evolving competitive-intelligence agent. It uses [Vectorize Hindsight](https://github.com/vectorize-io/hindsight) memory to rewrite its sales battlecard, pricing guidance and roadmap priorities as competitor signals accumulate, instead of reacting statelessly to each move.

## Demo (60 seconds)
1. **Stateless baseline:** a 30% competitor price cut makes the agent panic-discount (0 memories recalled).
2. **Ingest history:** 3 months of competitor signals are retained and consolidated into observations.
3. **Adapted:** the same question now yields an SLA/support-focused battlecard, a hold-price "Starter Annual" tier and a re-ranked roadmap (SOC2 → P0), with TEMPR scores shown.

## Architecture
```
frontend (Next.js 15)  ->  /api proxy  ->  backend (FastAPI)
                                             ├─ memory/  Hindsight retain · recall (TEMPR) · reflect · bootstrap
                                             ├─ agents/  Groq resilient client + strategy mutation
                                             └─ band_integration/  Band AI room handler (stub)
```
If Hindsight is unreachable, the backend falls back to an in-process store (`memory_source: local-fallback`) so the demo never hard-fails.

## Structure
```
backend/   FastAPI app, memory service, agents
frontend/  Next.js split-screen dashboard
docs/      PRD.md, TRD.md
```

## Run
```bash
cp .env.example .env            # add HINDSIGHT_API_KEY / GROQ_API_KEY
python -m venv .venv && .venv/Scripts/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --port 8000
cd frontend && npm install && npm run dev   # http://localhost:3000
```
Or `docker compose up`.

## API
| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/bootstrap` | POST | Create bank, missions, mental model; optional reset |
| `/api/signals/ingest` | POST | Retain one competitor signal |
| `/api/signals/seed` | POST | Load the 3-month demo history |
| `/api/strategy/morph` | POST | Stateless vs memory-adapted strategy |
| `/api/memory/inspector` | GET | World / experience / observation / mental-model view |

## Status
Hindsight retain/recall are wired to the REST API; the Band handler is a stub; the Groq key is optional (used only to polish the objection script).
