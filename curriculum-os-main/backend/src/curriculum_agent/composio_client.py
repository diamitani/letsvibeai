"""
Composio client for CurriculumOS agent tooling.
Provides access to 150+ integrations for research, automation, and workflow management.
"""

import os
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

# Composio imports will be available after pip install
try:
    from composio_openai import ComposioToolSet, App, Action
    COMPOSIO_AVAILABLE = True
except ImportError:
    COMPOSIO_AVAILABLE = False
    print("Warning: Composio SDK not installed. Run: pip install composio-core composio-openai")


class CurriculumComposioClient:
    """
    Composio integration client for CurriculumOS.
    Extends ROSTR agents with external tool capabilities.
    """

    def __init__(self, api_key: Optional[str] = None):
        if not COMPOSIO_AVAILABLE:
            raise ImportError("Composio SDK not installed. Install with: pip install composio-core composio-openai")

        self.api_key = api_key or os.getenv("COMPOSIO_API_KEY")
        if not self.api_key:
            raise ValueError("COMPOSIO_API_KEY environment variable not set")

        self.toolset = ComposioToolSet(api_key=self.api_key)
        self._connected_accounts = {}

    def get_tools_for_agent(self, agent_type: str) -> List[Dict[str, Any]]:
        """
        Get relevant Composio tools based on agent type.

        Args:
            agent_type: ROSTR agent type (researcher, builder, deployer, etc.)

        Returns:
            List of tool definitions for the agent
        """
        tool_mapping = {
            "researcher": [
                App.SERPAPI,          # Web search
                App.GITHUB,           # Code repository search
                App.NOTION,           # Knowledge base
                App.GOOGLESHEETS,     # Data storage
            ],
            "builder": [
                App.GITHUB,           # Version control
                App.SLACK,            # Team notifications
                App.LINEAR,           # Task management
            ],
            "deployer": [
                App.GITHUB,           # CI/CD triggers
                App.SLACK,            # Deploy notifications
                App.PAGERDUTY,        # Incident management
            ],
            "gap_filler": [
                App.SERPAPI,          # Content research
                App.GOOGLESHEETS,     # Data lookup
            ]
        }

        apps = tool_mapping.get(agent_type, [])
        return self.toolset.get_actions(apps=apps)

    def execute_action(
        self,
        action: Action,
        params: Dict[str, Any],
        entity_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Execute a Composio action with given parameters.

        Args:
            action: Composio action enum
            params: Action parameters
            entity_id: Optional entity/user ID for multi-tenant usage

        Returns:
            Action execution result
        """
        try:
            result = self.toolset.execute_action(
                action=action,
                params=params,
                entity_id=entity_id
            )
            return {
                "success": True,
                "data": result,
                "error": None
            }
        except Exception as e:
            return {
                "success": False,
                "data": None,
                "error": str(e)
            }

    def connect_account(self, app: App, entity_id: str) -> str:
        """
        Generate OAuth connection URL for a user to connect their account.

        Args:
            app: Composio app to connect
            entity_id: User/entity identifier

        Returns:
            OAuth connection URL
        """
        connection_request = self.toolset.initiate_connection(
            app=app,
            entity_id=entity_id
        )
        return connection_request.redirectUrl

    def get_connected_accounts(self, entity_id: str) -> List[Dict[str, Any]]:
        """
        Get all connected accounts for a user.

        Args:
            entity_id: User identifier

        Returns:
            List of connected accounts with status
        """
        return self.toolset.get_entity(entity_id).get_connections()

    # Curriculum-specific workflows

    def research_topic_with_serp(self, query: str, num_results: int = 10) -> Dict[str, Any]:
        """
        Use SerpAPI to research a learning topic.

        Args:
            query: Search query
            num_results: Number of results to fetch

        Returns:
            Search results with source URLs
        """
        return self.execute_action(
            action=Action.SERPAPI_SEARCH,
            params={
                "query": query,
                "num": num_results,
                "engine": "google"
            }
        )

    def save_curriculum_to_notion(
        self,
        curriculum_data: Dict[str, Any],
        entity_id: str
    ) -> Dict[str, Any]:
        """
        Save generated curriculum to Notion workspace.

        Args:
            curriculum_data: Curriculum structure
            entity_id: User ID

        Returns:
            Notion page creation result
        """
        return self.execute_action(
            action=Action.NOTION_CREATE_PAGE,
            params={
                "parent_page_id": os.getenv("NOTION_PARENT_PAGE_ID"),
                "title": curriculum_data.get("title", "Untitled Curriculum"),
                "content": curriculum_data.get("markdown_content", "")
            },
            entity_id=entity_id
        )

    def notify_slack_on_completion(
        self,
        channel: str,
        curriculum_title: str,
        entity_id: str
    ) -> Dict[str, Any]:
        """
        Send Slack notification when curriculum generation completes.

        Args:
            channel: Slack channel ID or name
            curriculum_title: Title of generated curriculum
            entity_id: User ID

        Returns:
            Slack message send result
        """
        return self.execute_action(
            action=Action.SLACK_SEND_MESSAGE,
            params={
                "channel": channel,
                "text": f"✅ Curriculum completed: *{curriculum_title}*",
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": f"Your curriculum *{curriculum_title}* has been generated successfully!"
                        }
                    }
                ]
            },
            entity_id=entity_id
        )

    def create_github_issue_for_gap(
        self,
        repo_owner: str,
        repo_name: str,
        gap_description: str,
        entity_id: str
    ) -> Dict[str, Any]:
        """
        Create GitHub issue to track curriculum knowledge gaps.

        Args:
            repo_owner: GitHub repository owner
            repo_name: Repository name
            gap_description: Description of knowledge gap
            entity_id: User ID

        Returns:
            GitHub issue creation result
        """
        return self.execute_action(
            action=Action.GITHUB_CREATE_ISSUE,
            params={
                "owner": repo_owner,
                "repo": repo_name,
                "title": f"Knowledge Gap: {gap_description[:50]}...",
                "body": gap_description,
                "labels": ["curriculum", "gap-fill", "auto-generated"]
            },
            entity_id=entity_id
        )


# Global client instance
_composio_client: Optional[CurriculumComposioClient] = None

def get_composio_client() -> CurriculumComposioClient:
    """Get or create singleton Composio client."""
    global _composio_client
    if _composio_client is None:
        _composio_client = CurriculumComposioClient()
    return _composio_client


def is_composio_available() -> bool:
    """Check if Composio SDK is available."""
    return COMPOSIO_AVAILABLE
