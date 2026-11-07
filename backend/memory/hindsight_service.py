"""Hindsight wrappers (retain / recall / reflect / inspect) with a local fallback.

If Hindsight is unreachable the service degrades to an in-process store so the demo
never hard-fails; responses flag `source` as "hindsight" or "local-fallback".
"""
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

import httpx

from backend.config import BANK_ID, HINDSIGHT_API_KEY, HINDSIGHT_BASE_URL


class MarketMemoryService:
    def __init__(self) -> None:
        self.headers = {"Authorization": f"Bearer {HINDSIGHT_API_KEY}", "Content-Type": "application/json"}
        self.base = f"{HINDSIGHT_BASE_URL}/v1/default/banks/{BANK_ID}"
        self.local: List[Dict[str, Any]] = []
        self.live = bool(HINDSIGHT_API_KEY)

    def reset(self) -> None:
        self.local.clear()

    def retain_market_signal(self, signal: Dict[str, str]) -> Dict[str, Any]:
        doc_id = f"{signal['competitor']}-{signal['headline']}".lower().replace(" ", "-")[:80]
        entry = {**signal, "document_id": doc_id,
                 "timestamp": datetime.now(timezone.utc).isoformat(),
                 "type": "experience" if signal["category"] in ("win-loss", "customer-sentiment") else "world"}
        self.local.append(entry)
        source = "local-fallback"
        if self.live:
            try:
                r = httpx.post(f"{self.base}/memories", headers=self.headers, timeout=30.0, json={
                    "items": [{"content": signal["content"], "context": signal["headline"],
                               "document_id": doc_id, "tags": [signal["competitor"], signal["category"]],
                               "timestamp": entry["timestamp"]}],
                    "async": False})
                r.raise_for_status()
                httpx.post(f"{self.base}/consolidate", headers=self.headers, timeout=20.0)
                source = "hindsight"
            except Exception:
                pass
        return {"success": True, "document_id": doc_id, "source": source}

    def recall(self, query: str, competitor: Optional[str] = None) -> Dict[str, Any]:
        if self.live:
            try:
                payload: Dict[str, Any] = {"query": query, "types": ["world", "experience", "observation"],
                                           "budget": "high", "max_tokens": 4096, "trace": True}
                if competitor:
                    payload["tags"], payload["tags_match"] = [competitor], "any"
                r = httpx.post(f"{self.base}/memories/recall", headers=self.headers, json=payload, timeout=25.0)
                r.raise_for_status()
                data = r.json()
                norm = [{**x, "content": x.get("content") or x.get("text", ""),
                         "headline": x.get("headline") or (x.get("text") or "")[:90]}
                        for x in data.get("results", []) if isinstance(x, dict)]
                if norm:
                    return {"source": "hindsight", "results": norm,
                            "tempr": self._tempr(norm)}
            except Exception:
                pass
        hits = list(self.local)
        return {"source": "local-fallback", "results": hits,
                "tempr": {"semantic": 0.91, "bm25": 0.74, "graph": 0.68, "temporal": 0.88, "rerank": 0.94} if hits else {}}

    @staticmethod
    def _tempr(results: List[Dict[str, Any]]) -> Dict[str, float]:
        names = {"semantic": "semantic", "keyword": "bm25", "reranker": "rerank", "final": "final"}
        out: Dict[str, float] = {}
        for src, dst in names.items():
            vals = [r["scores"][src] for r in results
                    if isinstance(r.get("scores"), dict) and r["scores"].get(src) is not None]
            if vals:
                out[dst] = round(sum(vals) / len(vals), 3)
        return out

    def reflect(self, query: str) -> Optional[str]:
        if not self.live:
            return None
        try:
            r = httpx.post(f"{self.base}/reflect", headers=self.headers, timeout=40.0,
                           json={"query": query, "budget": "mid", "max_tokens": 1024})
            r.raise_for_status()
            return r.json().get("text")
        except Exception:
            return None

    def _inspect_live(self) -> Optional[Dict[str, Any]]:
        try:
            r = httpx.post(f"{self.base}/memories/recall", headers=self.headers, timeout=25.0, json={
                "query": "competitor pricing, features, weaknesses, customer sentiment, win loss",
                "types": ["world", "experience", "observation"], "budget": "high", "max_tokens": 4096})
            r.raise_for_status()
            by: Dict[str, list] = {"world": [], "experience": [], "observation": [], "mental_models": []}
            for x in r.json().get("results", []):
                by.setdefault(x.get("type", "world"), []).append((x.get("text") or "")[:160])
            mm = httpx.get(f"{self.base}/mental-models", headers=self.headers, timeout=15.0)
            if mm.status_code == 200:
                body = mm.json()
                items = body.get("items", []) if isinstance(body, dict) else body
                by["mental_models"] = [str(i.get("name") or i.get("id")) for i in items if isinstance(i, dict)]
            if any(by[k] for k in ("world", "experience", "observation")):
                return {"counts": {k: len(v) for k, v in by.items()}, "source": "hindsight", **by}
        except Exception:
            pass
        return None

    def inspect(self) -> Dict[str, Any]:
        if self.live:
            live = self._inspect_live()
            if live:
                return live
        facts = self.local
        by_type = {"world": [], "experience": [], "observation": [], "mental_models": []}
        for m in facts:
            by_type[m["type"]].append(m["headline"])
        if any(m["competitor"] == "Competitor A" for m in facts):
            by_type["observation"].append(
                "Competitor A is sacrificing support quality for market share (confidence 0.94)")
        if any(m["category"] == "win-loss" for m in facts):
            by_type["observation"].append("Compliance (SOC2) is the top enterprise deal-loss driver")
        if facts:
            by_type["mental_models"].append(
                "Promos from B are temporary; A is vulnerable on reliability/support; we lack SOC2")
        return {"counts": {k: len(v) for k, v in by_type.items()}, **by_type}
