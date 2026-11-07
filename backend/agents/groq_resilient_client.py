from typing import Any, Dict, List, Optional

from backend.config import GROQ_API_KEY, GROQ_FAST_MODEL, GROQ_PRIMARY_MODEL


class ResilientGroqAgent:
    """Groq client that retries 400 tool_use_failed errors, lowering temperature and swapping models."""

    def __init__(self) -> None:
        self.enabled = bool(GROQ_API_KEY)
        if self.enabled:
            from groq import Groq
            self.client = Groq(api_key=GROQ_API_KEY)

    def chat_with_tool_retry(self, messages: List[Dict[str, Any]], tools: Optional[list] = None,
                             model: Optional[str] = None, max_retries: int = 3) -> Any:
        target = model or GROQ_PRIMARY_MODEL
        temperature = 0.2
        for attempt in range(max_retries):
            try:
                kwargs: Dict[str, Any] = {"model": target, "messages": messages,
                                          "temperature": temperature, "max_completion_tokens": 4096}
                if tools:
                    kwargs["tools"], kwargs["tool_choice"] = tools, "auto"
                if "qwen3" in target:
                    kwargs["reasoning_effort"] = "none"
                return self.client.chat.completions.create(**kwargs)
            except Exception as err:
                body = str(err)
                if getattr(err, "status_code", None) == 400 and ("tool_use_failed" in body or "failed_generation" in body):
                    temperature = max(0.0, temperature - 0.1)
                    if attempt == 1:
                        messages = messages + [{"role": "system",
                                                "content": "Emit strictly valid RFC-8259 JSON for tool arguments."}]
                    if attempt == max_retries - 2:
                        target = GROQ_FAST_MODEL if target == GROQ_PRIMARY_MODEL else GROQ_PRIMARY_MODEL
                    continue
                raise
        raise RuntimeError("Groq tool call failed after maximum retries.")
