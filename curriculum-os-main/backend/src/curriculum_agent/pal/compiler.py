import json
from typing import Optional
from src.curriculum_agent.models import PALIntent, LearnerProfile
from src.curriculum_agent.config import config


class PALCompiler:
    """
    PAL — Prompt Abstraction Layer

    Five-stage compilation pipeline:
    1. Intent Extraction - Parse raw input into structured intent
    2. Context Injection - Load learner context from state/session
    3. Semantic Enhancement - Expand ambiguous verbs, add precision
    4. Runtime Compilation - Generate curriculum manifest
    5. Output Routing - Route to correct execution layer
    """

    def __init__(self, deepseek_client=None):
        self.client = deepseek_client

    def compile(
        self, raw_input: str, learner_profile: Optional[LearnerProfile] = None
    ) -> dict:
        intent = self.extract_intent(raw_input)
        context = self.inject_context(intent, learner_profile)
        enhanced = self.enhance(intent, context)
        runtime = self.compile_runtime(enhanced)
        route = self.route(intent)
        return {
            "intent": intent,
            "context": context,
            "enhanced_instruction": enhanced,
            "runtime": runtime,
            "route": route,
        }

    def extract_intent(self, raw_input: str) -> PALIntent:
        prompt = f"""Analyze this learning request and extract structured intent as JSON.
Do not respond with anything other than the JSON object.

Input: "{raw_input}"

Extract:
- primary_intent: what the user wants to achieve (verb + object)
- domain: the learning domain (e.g. "machine learning", "web development", "data science")
- subject: the specific subject within the domain
- constraints: any explicit limits mentioned (time, depth, format preferences)
- desired_output: what success looks like
- ambiguity_score: 0.0 (crystal clear) to 1.0 (totally vague)

Return ONLY valid JSON with these exact keys."""
        if self.client:
            try:
                response = self.client.chat(prompt)
                data = json.loads(self._extract_json(response))
                return PALIntent(**data)
            except Exception:
                pass
        return PALIntent(
            primary_intent=f"Learn {raw_input}",
            domain="general",
            subject=raw_input,
            constraints=[],
            desired_output="personalized curriculum",
            ambiguity_score=0.5,
        )

    def inject_context(
        self, intent: PALIntent, learner_profile: Optional[LearnerProfile] = None
    ) -> dict:
        context = {
            "project": "CurriculumOS",
            "available_tools": ["deepseek_api", "web_search", "content_extraction"],
            "learner": None,
        }
        if learner_profile:
            context["learner"] = {
                "level": learner_profile.current_level.value,
                "goals": learner_profile.goals,
                "time_budget_hours": learner_profile.available_time_hours,
                "learning_style": learner_profile.learning_style.value,
                "preferred_formats": [
                    f.value for f in learner_profile.preferred_formats
                ],
                "language": learner_profile.language,
            }
        return context

    def enhance(self, intent: PALIntent, context: dict) -> str:
        prompt = f"""Enhance this learning intent into a precise curriculum generation instruction.

Intent: {intent.primary_intent}
Domain: {intent.domain}
Subject: {intent.subject}
Constraints: {", ".join(intent.constraints) or "none"}
Desired Output: {intent.desired_output}

Context:
{json.dumps(context, indent=2)}

Enhancement rules:
- Expand ambiguous verbs into specific learning actions
- Add missing precision: depth level, time allocation, format preferences
- Break compound goals into ordered sub-topics
- Add success criteria (what "done" looks like)
- Remove hedging and replace with directives

Return a single, detailed paragraph starting with "Generate a curriculum that:"
"""
        if self.client:
            try:
                response = self.client.chat(prompt)
                return response
            except Exception:
                pass
        return f"Generate a curriculum for {intent.subject} that covers all essential topics at an appropriate depth."

    def compile_runtime(self, enhanced_instruction: str) -> dict:
        return {
            "agent_type": "curriculum_generator",
            "tools_enabled": {
                "deepseek_api": True,
                "web_search": True,
                "file_system": "read_write",
            },
            "memory_mode": "project",
            "output_format": "curriculum_json",
            "verification_required": True,
        }

    def route(self, intent: PALIntent) -> str:
        if intent.ambiguity_score > 0.7:
            return "clarify"
        return "generate"

    def _extract_json(self, text: str) -> str:
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1:
            return text[start : end + 1]
        return text

    def generate_custom_content(
        self, topic: str, gap_description: str, learner_level: str
    ) -> str:
        prompt = f"""You are a master instructor. Generate a clear, engaging custom lesson on:

Topic: {topic}
Gap: {gap_description}
Learner Level: {learner_level}

Write in plain markdown. Include:
1. A clear explanation of the concept
2. A concrete example
3. Key takeaways (3-5 bullet points)
4. A practice exercise with solution

Keep it under 1500 words. Make it self-contained — assume the learner has no other resources on this topic."""
        if self.client:
            try:
                return self.client.chat(prompt)
            except Exception:
                pass
        return f"# Custom Lesson: {topic}\n\n*This lesson was generated by CurriculumOS PAL to fill a resource gap.*\n\n[{gap_description}]"
