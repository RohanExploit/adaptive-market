import httpx
from hindsight_client import Hindsight

from backend.config import BANK_ID, HINDSIGHT_API_KEY, HINDSIGHT_BASE_URL


def bootstrap_market_bank() -> None:
    client = Hindsight(base_url=HINDSIGHT_BASE_URL, api_key=HINDSIGHT_API_KEY, timeout=30.0)
    try:
        client.create_bank(
            bank_id=BANK_ID,
            name="AdaptiveMarket Competitive Intelligence & Strategy",
            mission=(
                "You are AdaptiveMarket, an autonomous Chief Strategy Officer. Track competitor "
                "launches, pricing, messaging, sentiment and win/loss patterns, and synthesize how "
                "our strategy should mutate."
            ),
            disposition={"skepticism": 4, "literalism": 3, "empathy": 3},
        )
    finally:
        client.close()

    headers = {"Authorization": f"Bearer {HINDSIGHT_API_KEY}", "Content-Type": "application/json"}
    base = f"{HINDSIGHT_BASE_URL}/v1/default/banks/{BANK_ID}"
    httpx.patch(f"{base}/config", headers=headers, timeout=15.0, json={
        "retain_mission": "Extract competitor names, exact pricing, features, dates, sentiment and win/loss reasons.",
        "observations_mission": "Distinguish temporary promos from permanent strategy shifts; find operational vulnerabilities.",
        "reflect_mission": "Ground advice in historical competitor moves; recommend battlecard, pricing and roadmap changes.",
        "retain_extraction_mode": "concise",
    })
    httpx.post(f"{base}/mental-models", headers=headers, timeout=15.0, json={
        "id": "competitive-landscape-mental-model",
        "name": "Live Competitive Landscape & GTM Strategy Directives",
        "source_query": "What are competitors' pricing, launches, weaknesses and our best positioning against each?",
        "refresh_after_consolidation": True,
    })
