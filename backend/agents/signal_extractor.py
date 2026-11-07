"""Autonomous Signal Extraction Agent: parses unstructured text into structured competitor events.

Uses Groq LPU (openai/gpt-oss-120b) to extract entities, categories, threat levels,
and dense factual intelligence from raw customer call transcripts, G2 reviews, or news.
"""
import json
import re
from typing import Any, Dict, Optional

from backend.agents.groq_resilient_client import ResilientGroqAgent

_groq = ResilientGroqAgent()


def _extract_json_block(text: str) -> Optional[Dict[str, Any]]:
    if not text:
        return None
    try:
        return json.loads(text.strip())
    except Exception:
        pass
    match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except Exception:
            pass
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        try:
            return json.loads(text[start : end + 1])
        except Exception:
            pass
    return None


def extract_signal_from_raw_text(raw_text: str) -> Dict[str, Any]:
    """Extracts structured competitor intelligence from unstructured text."""
    # Deterministic fallback heuristics
    comp = "Competitor A"
    cat = "customer-sentiment"
    lower = raw_text.lower()
    if "competitor b" in lower or "b hired" in lower or "soc2" in lower:
        comp = "Competitor B"
    elif "competitor c" in lower:
        comp = "Competitor C"

    if "price" in lower or "discount" in lower or "tier" in lower or "$" in lower:
        cat = "pricing"
    elif "outage" in lower or "down" in lower or "uptime" in lower or "crash" in lower:
        cat = "reliability"
    elif "lost" in lower or "deal" in lower or "procurement" in lower:
        cat = "win-loss"
    elif "hire" in lower or "sales rep" in lower or "expansion" in lower:
        cat = "hiring"

    fallback = {
        "competitor": comp,
        "category": cat,
        "headline": raw_text.strip()[:90],
        "content": raw_text.strip(),
        "source": "raw-feed",
        "threat_level": "medium",
        "extracted_entities": [comp],
    }

    if not _groq.enabled:
        return fallback

    prompt = (
        f"You are AdaptiveMarket Signal Extractor. Parse this raw competitor text into strictly valid JSON:\n\n"
        f"RAW TEXT:\n{raw_text}\n\n"
        f"Output JSON with exact keys:\n"
        f"- competitor: string (e.g. 'Competitor A', 'Competitor B')\n"
        f"- category: string (one of: 'pricing', 'reliability', 'customer-sentiment', 'hiring', 'win-loss')\n"
        f"- headline: string (concise 1-sentence headline summarizing the move)\n"
        f"- content: string (dense factual summary with numbers, dates, and quotes)\n"
        f"- source: string (e.g. 'sales-call', 'g2-review', 'status-page', 'press-release')\n"
        f"- threat_level: string ('high', 'medium', or 'low')\n"
        f"- extracted_entities: array of strings (key entities mentioned)\n"
    )

    try:
        resp = _groq.chat_with_tool_retry(
            [
                {"role": "system", "content": "You are a competitive intelligence data extraction engine. Return strictly valid JSON."},
                {"role": "user", "content": prompt},
            ],
            model=None,
        )
        parsed = _extract_json_block(resp.choices[0].message.content)
        if parsed and parsed.get("competitor") and parsed.get("headline"):
            return {
                "competitor": str(parsed.get("competitor", comp)),
                "category": str(parsed.get("category", cat)),
                "headline": str(parsed.get("headline", raw_text[:80])),
                "content": str(parsed.get("content", raw_text)),
                "source": str(parsed.get("source", "raw-feed")),
                "threat_level": str(parsed.get("threat_level", "medium")),
                "extracted_entities": list(parsed.get("extracted_entities", [comp])),
            }
    except Exception:
        pass

    return fallback
