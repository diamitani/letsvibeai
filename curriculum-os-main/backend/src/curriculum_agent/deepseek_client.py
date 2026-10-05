import json
from typing import Optional, Iterator
import requests
from src.curriculum_agent.config import config


class DeepSeekClient:
    """
    DeepSeek API client for LLM inference.
    Used by all agent modules for PAL compilation, research enhancement,
    curriculum generation, and RAG DAL analysis.
    """

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: Optional[str] = None,
        base_url: Optional[str] = None,
    ):
        self.api_key = api_key or config.DEEPSEEK_API_KEY
        self.model = model or config.DEEPSEEK_MODEL
        self.base_url = base_url or config.DEEPSEEK_BASE_URL

    def chat(
        self,
        prompt: str,
        system: Optional[str] = None,
        temperature: float = 0.3,
        max_tokens: int = 4096,
    ) -> str:
        messages = self._build_messages(prompt, system)
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }
        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers=self._headers(),
            json=payload,
            timeout=60,
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

    def chat_stream(
        self, prompt: str, system: Optional[str] = None, temperature: float = 0.3
    ) -> Iterator[str]:
        messages = self._build_messages(prompt, system)
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "stream": True,
        }
        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers=self._headers(),
            json=payload,
            stream=True,
            timeout=120,
        )
        response.raise_for_status()
        for line in response.iter_lines():
            if line:
                line = line.decode("utf-8")
                if line.startswith("data: "):
                    data = line[6:]
                    if data.strip() == "[DONE]":
                        break
                    try:
                        chunk = json.loads(data)
                        delta = chunk["choices"][0].get("delta", {}).get("content", "")
                        if delta:
                            yield delta
                    except (json.JSONDecodeError, KeyError):
                        continue

    def _build_messages(self, prompt: str, system: Optional[str] = None) -> list[dict]:
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        return messages

    def _headers(self) -> dict:
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    def verify(self) -> bool:
        try:
            response = self.chat("Reply with only the word: OK")
            return "ok" in response.strip().lower()
        except Exception:
            return False
