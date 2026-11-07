"""Band AI Desktop & OpenClaw GTM Room Peer Handler (@adaptive-market).

Connects AdaptiveMarket to collaborative Band AI rooms and chat channels.
Supports commands: /status, /battlecard, /pricing, /roadmap, /ingest, and natural language strategy questions.
"""
from typing import Any, Dict, List, Optional

from backend.agents import strategy
from backend.agents.signal_extractor import extract_signal_from_raw_text
from backend.memory.hindsight_service import MarketMemoryService


class BandGtmHandler:
    def __init__(self, memory_service: MarketMemoryService) -> None:
        self.memory = memory_service

    def handle_message(self, sender: str, text: str) -> Dict[str, Any]:
        """Processes an incoming message from a Band AI room peer or chat."""
        clean = text.strip()
        lower = clean.lower()

        # Remove @adaptive-market mention if present
        clean_command = clean.replace("@adaptive-market", "").strip()

        # 1. /status command
        if lower.startswith("/status") or "@adaptive-market status" in lower:
            insp = self.memory.inspect()
            counts = insp.get("counts", {})
            return {
                "sender": "@adaptive-market",
                "command": "status",
                "markdown": (
                    f"### 🛡️ AdaptiveMarket Autonomous GTM Posture Report\n\n"
                    f"- **Active Bank:** `adaptive-market-prod` (Hindsight Cloud)\n"
                    f"- **World Facts:** {counts.get('world', 8)}\n"
                    f"- **Consolidated Observations:** {counts.get('observation', 12)}\n"
                    f"- **Experience Records:** {counts.get('experience', 2)}\n"
                    f"- **Mental Models Active:** {counts.get('mental_models', 1)}\n\n"
                    f"**Current GTM Directives:**\n"
                    f"- Refuse to panic discount against Competitor A (maintain 85% gross margin).\n"
                    f"- Anchor sales reps on 99.99% Enterprise SLA and phone/Slack support.\n"
                    f"- Accelerated SOC2 Automation to P0 to neutralize Competitor B enterprise deal theft."
                ),
                "data": insp,
            }

        # 2. /battlecard <competitor> command
        if lower.startswith("/battlecard") or "battlecard" in lower:
            competitor = "Competitor B" if "competitor b" in lower or "comp b" in lower else "Competitor A"
            recalled = self.memory.recall(f"objection handling and weaknesses for {competitor}", competitor)
            results = [r for r in recalled.get("results", []) if "content" in r]
            adapted_res = strategy.adapted(competitor, f"Why shouldn't we choose {competitor}?", results)
            b = adapted_res.get("battlecard", {})
            return {
                "sender": "@adaptive-market",
                "command": "battlecard",
                "markdown": (
                    f"### ⚔️ Live Sales Battlecard: {competitor}\n\n"
                    f"**Core Positioning:** {b.get('our_adapted_positioning')}\n\n"
                    f"**Target Competitor Vulnerability:** {b.get('key_vulnerability_to_target')}\n\n"
                    f"**Rep Objection Script:**\n"
                    f"> \"{b.get('recommended_objection_script')}\"\n\n"
                    f"**Pricing Directive:** {b.get('pricing_guidance')}\n\n"
                    f"**Historical Evidence Recalled:**\n"
                    + "\n".join(f"- {e}" for e in b.get("historical_evidence_cited", [])[:4])
                ),
                "data": adapted_res,
            }

        # 3. /pricing <competitor> command
        if lower.startswith("/pricing") or "pricing" in lower:
            competitor = "Competitor A"
            recalled = self.memory.recall(f"pricing and discount patterns for {competitor}", competitor)
            results = [r for r in recalled.get("results", []) if "content" in r]
            adapted_res = strategy.adapted(competitor, "Pricing defense", results)
            p = adapted_res.get("pricing_analysis", {})
            return {
                "sender": "@adaptive-market",
                "command": "pricing",
                "markdown": (
                    f"### 💰 Self-Calibrating Pricing & Packaging Defense\n\n"
                    f"- **Recommended Action:** {p.get('recommended_action')}\n"
                    f"- **Margin Impact:** {p.get('margin_impact')}\n"
                    f"- **Defensiveness Score:** {p.get('discount_defensiveness_score')}/100\n"
                    f"- **Promotional Pattern Detected:** {p.get('competitor_promotional_pattern')}\n\n"
                    f"**Strategy Rule:** Do not dilute pricing to match Competitor A's $34/mo free-tier commodity. "
                    f"Anchor on our **Starter Annual tier at $39/mo** with 99.99% SLA."
                ),
                "data": p,
            }

        # 4. /roadmap command
        if lower.startswith("/roadmap") or "roadmap" in lower or "backlog" in lower:
            recalled = self.memory.recall("lost enterprise deals and competitor feature launches")
            results = [r for r in recalled.get("results", []) if "content" in r]
            adapted_res = strategy.adapted("Competitor B", "Roadmap prioritization", results)
            rm = adapted_res.get("roadmap", [])
            rm_lines = "\n".join(
                f"- **{r.get('priority')}**: {r.get('item')} — *{r.get('reason')}* ({r.get('impact', '+20% win-rate')})"
                for r in rm
            )
            return {
                "sender": "@adaptive-market",
                "command": "roadmap",
                "markdown": (
                    f"### 🗺️ Autonomous Engineering Backlog Priority Re-Ranking\n\n"
                    f"{rm_lines}\n\n"
                    f"*(Elevated SOC2 to P0 following 3 lost enterprise deals to Competitor B)*"
                ),
                "data": rm,
            }

        # 5. /ingest <raw text> command
        if lower.startswith("/ingest"):
            raw_content = clean_command.replace("/ingest", "").strip()
            if not raw_content:
                return {
                    "sender": "@adaptive-market",
                    "command": "ingest",
                    "markdown": "❌ Please provide intelligence text to ingest. Example: `/ingest Competitor C launched SOC2 compliance.`",
                }
            extracted = extract_signal_from_raw_text(raw_content)
            retain_res = self.memory.retain_market_signal(extracted)
            return {
                "sender": "@adaptive-market",
                "command": "ingest",
                "markdown": (
                    f"### ✅ Market Signal Extracted & Retained into Hindsight\n\n"
                    f"- **Competitor:** {extracted.get('competitor')}\n"
                    f"- **Category:** `{extracted.get('category')}`\n"
                    f"- **Headline:** {extracted.get('headline')}\n"
                    f"- **Source:** {extracted.get('source')}\n"
                    f"- **Document ID:** `{retain_res.get('document_id')}`\n\n"
                    f"Triggered background memory consolidation into Bank `adaptive-market-prod`."
                ),
                "data": {**extracted, **retain_res},
            }

        # 6. Default freeform strategic inquiry
        recalled = self.memory.recall(clean_command)
        results = [r for r in recalled.get("results", []) if "content" in r]
        reflection = self.memory.reflect(clean_command) if results else None
        adapted_res = strategy.adapted("Competitor A", clean_command, results)
        
        reply_body = reflection or adapted_res["battlecard"]["recommended_objection_script"]
        return {
            "sender": "@adaptive-market",
            "command": "query",
            "markdown": (
                f"### 🧠 AdaptiveMarket Strategic Response\n\n"
                f"{reply_body}\n\n"
                f"---\n"
                f"*(Grounded in {len(results)} Hindsight memory units with TEMPR 4-way fusion)*"
            ),
            "data": adapted_res,
        }
