# Composio Integration Guide for CurriculumOS

## Overview

This guide explains how to integrate Composio with CurriculumOS to extend agent capabilities with external tools, APIs, and workflow automation.

---

## What is Composio?

**Composio** is an agent tooling platform that provides:
- 150+ pre-built tool integrations (GitHub, Slack, Gmail, Calendar, etc.)
- Function calling capabilities for AI agents
- Workflow automation and triggers
- Managed authentication and OAuth flows
- Production-grade API orchestration

---

## Architecture Integration

### Current Stack
```
Frontend (Next.js 15) → Backend (FastAPI) → DeepSeek API
                              ↓
                        ROSTR Framework
                        (PAL + RAG DAL + NPAO + Hub)
```

### With Composio
```
Frontend (Next.js 15) → Backend (FastAPI) → DeepSeek API
                              ↓                    ↓
                        ROSTR Framework ←→ Composio Tools
                        (PAL + RAG DAL          (150+ integrations)
                         + NPAO + Hub)
```

---

## Installation

### Step 1: Install Composio SDK

#### Backend (Python)
```bash
cd backend
pip install composio-core composio-openai
# Or add to requirements.txt:
echo "composio-core>=0.5.0" >> requirements.txt
echo "composio-openai>=0.5.0" >> requirements.txt
pip install -r requirements.txt
```

#### Frontend (Optional - for client-side auth)
```bash
cd frontend
npm install composio-core
```

### Step 2: Set Up Composio Account

1. Sign up at [https://app.composio.dev](https://app.composio.dev)
2. Get your API key from Settings → API Keys
3. Add to environment variables:

```bash
# .env (backend)
COMPOSIO_API_KEY=your_composio_api_key_here
DEEPSEEK_API_KEY=your_deepseek_key_here
```

---

## Configuration

### Backend Integration

#### Create Composio Client Module

**File:** `backend/src/curriculum_agent/composio_client.py`

```python
"""
Composio client for CurriculumOS agent tooling.
Provides access to 150+ integrations for research, automation, and workflow management.
"""

import os
from typing import List, Dict, Any, Optional
from composio_openai import ComposioToolSet, App, Action
from dotenv import load_load_dotenv()

class CurriculumComposioClient:
    """
    Composio integration client for CurriculumOS.
    Extends ROSTR agents with external tool capabilities.
    """
    
    def __init__(self, api_key: Optional[str] = None):
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
```

---

## FastAPI Integration

### Update API Routes

**File:** `backend/src/main.py`

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from curriculum_agent.composio_client import get_composio_client
from curriculum_agent.pal import PALCompiler
from curriculum_agent.research import ResearchEngine

app = FastAPI()

# ... existing routes ...

class ConnectAppRequest(BaseModel):
    app_name: str
    entity_id: str

class ExecuteActionRequest(BaseModel):
    action_name: str
    params: Dict[str, Any]
    entity_id: Optional[str] = None

@app.post("/api/v1/composio/connect")
async def connect_composio_app(request: ConnectAppRequest):
    """
    Generate OAuth URL for user to connect an external app.
    """
    try:
        composio = get_composio_client()
        from composio_openai import App
        
        app_enum = getattr(App, request.app_name.upper())
        connection_url = composio.connect_account(
            app=app_enum,
            entity_id=request.entity_id
        )
        
        return {
            "success": True,
            "connection_url": connection_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/composio/connections/{entity_id}")
async def get_connected_apps(entity_id: str):
    """
    Get all apps connected by a user.
    """
    try:
        composio = get_composio_client()
        connections = composio.get_connected_accounts(entity_id)
        return {
            "success": True,
            "connections": connections
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/composio/execute")
async def execute_composio_action(request: ExecuteActionRequest):
    """
    Execute a Composio action.
    """
    try:
        composio = get_composio_client()
        from composio_openai import Action
        
        action_enum = getattr(Action, request.action_name.upper())
        result = composio.execute_action(
            action=action_enum,
            params=request.params,
            entity_id=request.entity_id
        )
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Enhanced curriculum generation with Composio tools
@app.post("/api/v1/generate-enhanced")
async def generate_curriculum_enhanced(
    query: str,
    entity_id: Optional[str] = None,
    save_to_notion: bool = False,
    notify_slack: bool = False
):
    """
    Generate curriculum with optional Composio integrations.
    """
    try:
        composio = get_composio_client()
        
        # Step 1: Enhanced research using SerpAPI
        serp_results = composio.research_topic_with_serp(query, num_results=20)
        
        # Step 2: Generate curriculum (existing logic)
        # ... your existing curriculum generation code ...
        curriculum_data = {"title": query, "modules": [...]}
        
        # Step 3: Optional integrations
        integrations_result = {}
        
        if save_to_notion and entity_id:
            notion_result = composio.save_curriculum_to_notion(
                curriculum_data=curriculum_data,
                entity_id=entity_id
            )
            integrations_result["notion"] = notion_result
        
        if notify_slack and entity_id:
            slack_result = composio.notify_slack_on_completion(
                channel="#curricula",
                curriculum_title=query,
                entity_id=entity_id
            )
            integrations_result["slack"] = slack_result
        
        return {
            "success": True,
            "curriculum": curriculum_data,
            "enhanced_sources": serp_results.get("data", []),
            "integrations": integrations_result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## Frontend Integration

### Create Composio Connection Component

**File:** `frontend/src/components/app/ComposioConnect.tsx`

```tsx
"use client";

import { useState } from "react";
import { Check, ExternalLink, Loader2 } from "lucide-react";

const AVAILABLE_APPS = [
  { id: "notion", name: "Notion", icon: "📝", description: "Save curricula to Notion" },
  { id: "slack", name: "Slack", icon: "💬", description: "Get completion notifications" },
  { id: "github", name: "GitHub", icon: "⚡", description: "Track knowledge gaps as issues" },
  { id: "googlesheets", name: "Google Sheets", icon: "📊", description: "Export curriculum data" },
];

export function ComposioConnect({ entityId }: { entityId: string }) {
  const [connections, setConnections] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);

  const connectApp = async (appName: string) => {
    setLoading(appName);
    try {
      const response = await fetch("/api/v1/composio/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app_name: appName, entity_id: entityId })
      });

      const data = await response.json();
      
      if (data.success) {
        // Open OAuth window
        const authWindow = window.open(data.connection_url, "_blank", "width=600,height=700");
        
        // Poll for connection completion
        const pollInterval = setInterval(async () => {
          const statusResponse = await fetch(`/api/v1/composio/connections/${entityId}`);
          const statusData = await statusResponse.json();
          
          const connected = statusData.connections?.some(
            (conn: any) => conn.appName.toLowerCase() === appName.toLowerCase() && conn.status === "ACTIVE"
          );
          
          if (connected) {
            clearInterval(pollInterval);
            setConnections(prev => new Set([...prev, appName]));
            authWindow?.close();
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to connect app:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Connected Apps</h3>
        <p className="text-sm text-slate-600 mb-6">
          Connect external tools to enhance your curriculum workflows
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {AVAILABLE_APPS.map((app) => {
          const isConnected = connections.has(app.id);
          const isLoading = loading === app.id;

          return (
            <button
              key={app.id}
              onClick={() => !isConnected && connectApp(app.id)}
              disabled={isConnected || isLoading}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isConnected
                  ? "border-green-500 bg-green-50"
                  : "border-slate-200 hover:border-blue-500 hover:bg-blue-50"
              } ${isLoading ? "opacity-50 cursor-wait" : ""}`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{app.icon}</span>
                {isConnected && <Check className="w-5 h-5 text-green-600" />}
                {isLoading && <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />}
              </div>
              <div className="font-semibold text-slate-900">{app.name}</div>
              <div className="text-xs text-slate-600 mt-1">{app.description}</div>
              
              {!isConnected && !isLoading && (
                <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 font-medium">
                  Connect <ExternalLink className="w-3 h-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

---

## Vercel Deployment Configuration

### Environment Variables

Add to Vercel project settings:

```bash
# Vercel Dashboard → Settings → Environment Variables

COMPOSIO_API_KEY=your_composio_api_key
DEEPSEEK_API_KEY=your_deepseek_key
NOTION_PARENT_PAGE_ID=optional_notion_page_id
```

### Vercel Configuration

**File:** `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "backend/src/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/v1/(.*)",
      "dest": "backend/src/main.py"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ],
  "env": {
    "COMPOSIO_API_KEY": "@composio_api_key",
    "DEEPSEEK_API_KEY": "@deepseek_api_key"
  }
}
```

---

## Usage Examples

### Example 1: Enhanced Research with SerpAPI

```python
# In your research agent
from curriculum_agent.composio_client import get_composio_client

composio = get_composio_client()

# Search for Python learning resources
results = composio.research_topic_with_serp(
    query="best Python tutorials for beginners 2024",
    num_results=20
)

# Filter and rank results using RAG DAL credibility scoring
for result in results["data"]:
    url = result["link"]
    title = result["title"]
    # Process with your existing pipeline
```

### Example 2: Save Curriculum to Notion

```python
# After curriculum generation
curriculum = {
    "title": "Machine Learning Fundamentals",
    "modules": [...],
    "markdown_content": "# ML Curriculum\n\n..."
}

result = composio.save_curriculum_to_notion(
    curriculum_data=curriculum,
    entity_id=user_id
)

if result["success"]:
    notion_url = result["data"]["url"]
    print(f"Saved to Notion: {notion_url}")
```

### Example 3: Slack Notifications

```python
# When curriculum completes
composio.notify_slack_on_completion(
    channel="#curricula",
    curriculum_title="Introduction to React",
    entity_id=user_id
)
```

---

## Testing

### Local Testing

```bash
# Start backend with Composio
cd backend
uvicorn src.main:app --reload --port 8000

# In another terminal, test endpoints
curl -X POST http://localhost:8000/api/v1/composio/connect \
  -H "Content-Type: application/json" \
  -d '{"app_name": "notion", "entity_id": "test_user_123"}'
```

### Integration Tests

**File:** `backend/tests/test_composio_integration.py`

```python
import pytest
from curriculum_agent.composio_client import CurriculumComposioClient

def test_composio_client_initialization():
    client = CurriculumComposioClient()
    assert client.api_key is not None

def test_get_researcher_tools():
    client = CurriculumComposioClient()
    tools = client.get_tools_for_agent("researcher")
    assert len(tools) > 0

def test_serp_search():
    client = CurriculumComposioClient()
    result = client.research_topic_with_serp("machine learning", num_results=5)
    assert result["success"] == True
    assert "data" in result
```

---

## Security Considerations

1. **API Key Management**
   - Store in Vercel environment variables (never commit to repo)
   - Use separate keys for development and production
   - Rotate keys regularly

2. **Entity ID (User) Isolation**
   - Always pass entity_id to scope actions per user
   - Validate entity_id matches authenticated user
   - Implement rate limiting per entity

3. **OAuth Redirect Validation**
   - Whitelist allowed redirect URLs
   - Verify state parameter in OAuth callbacks
   - Implement CSRF protection

4. **Tool Access Control**
   - Restrict tools by user tier (Starter/Growth/Pro)
   - Audit tool usage for billing
   - Implement usage quotas

---

## Cost Optimization

### Composio Pricing Awareness

```python
# Track API calls for cost monitoring
class ComposioUsageTracker:
    def __init__(self):
        self.usage_log = []
    
    def log_action(self, entity_id: str, action: str, tokens_used: int):
        self.usage_log.append({
            "entity_id": entity_id,
            "action": action,
            "tokens": tokens_used,
            "timestamp": datetime.now()
        })
    
    def get_entity_usage(self, entity_id: str) -> Dict[str, Any]:
        entity_logs = [log for log in self.usage_log if log["entity_id"] == entity_id]
        return {
            "total_calls": len(entity_logs),
            "total_tokens": sum(log["tokens"] for log in entity_logs)
        }
```

---

## Troubleshooting

### Common Issues

**Issue: "COMPOSIO_API_KEY not set"**
```bash
# Solution: Set environment variable
export COMPOSIO_API_KEY=your_key_here
# Or add to .env file
echo "COMPOSIO_API_KEY=your_key" >> .env
```

**Issue: OAuth redirect not working**
```bash
# Solution: Check redirect URI in Composio dashboard matches your domain
# Development: http://localhost:3000/api/auth/callback
# Production: https://your-domain.vercel.app/api/auth/callback
```

**Issue: Tool execution timeout**
```python
# Solution: Increase timeout in client
result = composio.execute_action(
    action=action,
    params=params,
    timeout=30  # seconds
)
```

---

## Next Steps

1. ✅ Install Composio SDK
2. ✅ Create Composio client module
3. ✅ Add FastAPI endpoints
4. ✅ Build frontend connection UI
5. ✅ Configure Vercel environment variables
6. ⬜ Test OAuth flows
7. ⬜ Deploy to Vercel staging
8. ⬜ Production deployment

---

## Resources

- **Composio Docs:** https://docs.composio.dev
- **Composio Dashboard:** https://app.composio.dev
- **Composio GitHub:** https://github.com/composiohq/composio
- **Vercel Docs:** https://vercel.com/docs

---

**Status:** 📖 Documentation Complete | Ready for Implementation

**Next Action:** Install Composio SDK and create `composio_client.py` module
