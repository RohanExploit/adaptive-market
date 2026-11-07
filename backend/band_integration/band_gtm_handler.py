"""Band AI room handler stub: exposes @adaptive-market in a GTM room.

Wire to band-sdk with BAND_API_KEY / BAND_ROOM_ID; the handler maps a room message to a strategy morph.
"""
from backend.agents import strategy
from backend.memory.hindsight_service import MarketMemoryService


def handle_room_message(memory: MarketMemoryService, competitor: str, text: str) -> dict:
    recalled = [r for r in memory.recall(text, competitor).get("results", []) if "content" in r]
    return strategy.adapted(competitor, text, recalled)
