import json
from pathlib import Path
from datetime import datetime
from typing import Optional
from src.curriculum_agent.config import config


class KnowledgeBase:
    def __init__(self, base_path: Optional[Path] = None):
        self.base_path = base_path or config.KNOWLEDGE_BASE_PATH
        self.base_path.mkdir(parents=True, exist_ok=True)

    def store(self, namespace: str, entry: dict) -> str:
        ns_path = self.base_path / namespace
        ns_path.mkdir(parents=True, exist_ok=True)
        timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        path = ns_path / f"{timestamp}.json"
        entry["_stored_at"] = datetime.utcnow().isoformat()
        path.write_text(json.dumps(entry, indent=2))
        return str(path)

    def retrieve(self, namespace: str, max_entries: int = 10) -> list[dict]:
        ns_path = self.base_path / namespace
        if not ns_path.exists():
            return []
        entries = sorted(ns_path.glob("*.json"), reverse=True)
        results = []
        for p in entries[:max_entries]:
            try:
                results.append(json.loads(p.read_text()))
            except json.JSONDecodeError:
                continue
        return results

    def query(self, namespace: str, topic: str, max_results: int = 5) -> list[dict]:
        entries = self.retrieve(namespace, max_entries=50)
        matched = []
        for e in entries:
            content = json.dumps(e).lower()
            if topic.lower() in content:
                matched.append(e)
        return matched[:max_results]

    def clear(self, namespace: str) -> None:
        ns_path = self.base_path / namespace
        if ns_path.exists():
            for p in ns_path.glob("*.json"):
                p.unlink()
