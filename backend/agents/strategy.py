"""Strategy mutation: battlecard + pricing + roadmap, stateless vs memory-grounded.

Memory-grounded strategy is derived deterministically from recalled facts (so the demo is
reproducible) and, when a Groq key is set, narrated by the LLM.
"""
from typing import Any, Dict, List

from backend.agents.groq_resilient_client import ResilientGroqAgent

BATTLECARD_SCHEMA = {
    "type": "object",
    "properties": {
        "competitor_name": {"type": "string"},
        "our_adapted_positioning": {"type": "string"},
        "key_vulnerability_to_target": {"type": "string"},
        "recommended_objection_script": {"type": "string"},
        "pricing_guidance": {"type": "string"},
        "historical_evidence_cited": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["competitor_name", "our_adapted_positioning", "key_vulnerability_to_target",
                 "recommended_objection_script", "pricing_guidance", "historical_evidence_cited"],
}

_groq = ResilientGroqAgent()


def stateless(competitor: str) -> Dict[str, Any]:
    return {
        "mode": "stateless",
        "battlecard": {"competitor_name": competitor,
                       "our_adapted_positioning": "Our product is reliable and easy to use.",
                       "key_vulnerability_to_target": "None identified",
                       "recommended_objection_script": "Compare features line by line.",
                       "pricing_guidance": "Match the price cut: discount by 35%.",
                       "historical_evidence_cited": []},
        "roadmap": [{"item": "Backlog unchanged", "priority": "P2"}],
        "confidence": 0.0,
    }


def adapted(competitor: str, scenario: str, recalled: List[Dict[str, Any]]) -> Dict[str, Any]:
    text = " ".join(m.get("content", "") for m in recalled).lower()
    evidence = [m["headline"] for m in recalled if "headline" in m]
    weak_support = "support" in text or "outage" in text
    soc2 = "soc2" in text
    temp_promo = "raised prices 60 days later" in text
    vuln = "Unreliable service (4 outages) and poor support" if weak_support else "Unknown"
    pricing = ("Do NOT match the cut. Competitor promos are temporary (B reversed within 60 days). "
               "Add a 'Starter Annual' tier at $39/mo with higher limits and a 99.99% uptime SLA."
               if temp_promo or weak_support else "Hold price; monitor.")
    card = {
        "competitor_name": competitor,
        "our_adapted_positioning": "The reliable, enterprise-grade choice with 99.99% SLA and dedicated support.",
        "key_vulnerability_to_target": vuln,
        "recommended_objection_script": (
            f"'{scenario}' -> Acknowledge their price, then ask: what does an outage cost you? "
            "We guarantee 99.99% uptime with phone + Slack support and an ROI value-matrix."),
        "pricing_guidance": pricing,
        "historical_evidence_cited": evidence,
    }
    roadmap = [{"item": "SOC2 Automation", "priority": "P0" if soc2 else "P2"},
               {"item": "Native Slack integration", "priority": "P1" if soc2 else "P2"},
               {"item": "SLA dashboard", "priority": "P1" if weak_support else "P3"}]
    if _groq.enabled and recalled:
        try:
            r = _groq.chat_with_tool_retry([
                {"role": "system", "content": "Sharpen this sales objection script in 2 sentences, keep facts."},
                {"role": "user", "content": card["recommended_objection_script"] + " Evidence: " + "; ".join(evidence)}],
                model=None)
            card["recommended_objection_script"] = r.choices[0].message.content.strip()
        except Exception:
            pass
    return {"mode": "hindsight", "battlecard": card, "roadmap": roadmap,
            "confidence": 0.94 if recalled else 0.0}
