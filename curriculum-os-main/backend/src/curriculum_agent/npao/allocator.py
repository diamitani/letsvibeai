class TaskAllocator:
    @staticmethod
    def allocate(task_type: str, available_agents: list[str]) -> str:
        agent_map = {
            "research": "research_engine",
            "index": "master_index_builder",
            "generate": "curriculum_generator",
            "assess": "gap_analyzer",
            "export": "format_serializer",
        }
        return agent_map.get(
            task_type, available_agents[0] if available_agents else "default"
        )
