"use client";

import { useState, useEffect } from "react";
import { Check, ExternalLink, Loader2, AlertCircle } from "lucide-react";

const AVAILABLE_APPS = [
  {
    id: "notion",
    name: "Notion",
    icon: "📝",
    description: "Save curricula to Notion workspace",
    tier: "growth"
  },
  {
    id: "slack",
    name: "Slack",
    icon: "💬",
    description: "Get completion notifications",
    tier: "growth"
  },
  {
    id: "github",
    name: "GitHub",
    icon: "⚡",
    description: "Track knowledge gaps as issues",
    tier: "pro"
  },
  {
    id: "googlesheets",
    name: "Google Sheets",
    icon: "📊",
    description: "Export curriculum data",
    tier: "growth"
  },
  {
    id: "serpapi",
    name: "SerpAPI",
    icon: "🔍",
    description: "Enhanced web search for research",
    tier: "growth"
  },
  {
    id: "linear",
    name: "Linear",
    icon: "📋",
    description: "Create curriculum tasks",
    tier: "pro"
  },
];

interface ComposioConnectProps {
  entityId: string;
  userTier?: "starter" | "growth" | "pro";
}

export function ComposioConnect({ entityId, userTier = "starter" }: ComposioConnectProps) {
  const [connections, setConnections] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load existing connections on mount
  useEffect(() => {
    loadConnections();
  }, [entityId]);

  const loadConnections = async () => {
    try {
      const response = await fetch(`/api/v1/composio/connections/${entityId}`);
      const data = await response.json();

      if (data.success && data.connections) {
        const activeConnections = data.connections
          .filter((conn: any) => conn.status === "ACTIVE")
          .map((conn: any) => conn.appName.toLowerCase());
        setConnections(new Set(activeConnections));
      }
    } catch (err) {
      console.error("Failed to load connections:", err);
    }
  };

  const connectApp = async (appName: string) => {
    setLoading(appName);
    setError(null);

    try {
      const response = await fetch("/api/v1/composio/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app_name: appName, entity_id: entityId })
      });

      const data = await response.json();

      if (data.success && data.connection_url) {
        // Open OAuth window
        const authWindow = window.open(
          data.connection_url,
          "_blank",
          "width=600,height=700,left=200,top=100"
        );

        if (!authWindow) {
          setError("Please allow popups to connect apps");
          setLoading(null);
          return;
        }

        // Poll for connection completion
        const pollInterval = setInterval(async () => {
          try {
            const statusResponse = await fetch(`/api/v1/composio/connections/${entityId}`);
            const statusData = await statusResponse.json();

            const connected = statusData.connections?.some(
              (conn: any) =>
                conn.appName.toLowerCase() === appName.toLowerCase() &&
                conn.status === "ACTIVE"
            );

            if (connected) {
              clearInterval(pollInterval);
              setConnections(prev => new Set([...prev, appName]));
              setLoading(null);
              authWindow?.close();
            }
          } catch (err) {
            console.error("Polling error:", err);
          }
        }, 2000);

        // Stop polling after 2 minutes
        setTimeout(() => {
          clearInterval(pollInterval);
          if (loading === appName) {
            setLoading(null);
            setError("Connection timeout. Please try again.");
          }
        }, 120000);
      } else {
        setError(data.error || "Failed to initiate connection");
        setLoading(null);
      }
    } catch (err) {
      console.error("Failed to connect app:", err);
      setError("Network error. Please check your connection.");
      setLoading(null);
    }
  };

  const disconnectApp = async (appName: string) => {
    // TODO: Implement disconnect functionality
    console.log("Disconnect app:", appName);
  };

  const canUseApp = (app: typeof AVAILABLE_APPS[0]) => {
    const tierHierarchy = { starter: 0, growth: 1, pro: 2 };
    const userTierLevel = tierHierarchy[userTier];
    const appTierLevel = tierHierarchy[app.tier as keyof typeof tierHierarchy];
    return userTierLevel >= appTierLevel;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Connected Apps</h3>
        <p className="text-sm text-slate-600">
          Connect external tools to enhance your curriculum workflows
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AVAILABLE_APPS.map((app) => {
          const isConnected = connections.has(app.id);
          const isLoading = loading === app.id;
          const canUse = canUseApp(app);

          return (
            <div
              key={app.id}
              className={`relative p-6 rounded-xl border-2 transition-all ${
                isConnected
                  ? "border-green-500 bg-green-50"
                  : canUse
                  ? "border-slate-200 hover:border-blue-500 hover:bg-blue-50"
                  : "border-slate-200 bg-slate-50 opacity-60"
              } ${isLoading ? "opacity-50" : ""}`}
            >
              {/* Tier Badge */}
              {!canUse && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                    {app.tier.toUpperCase()}
                  </span>
                </div>
              )}

              {/* App Icon & Status */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{app.icon}</span>
                {isConnected && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="text-xs font-medium">Connected</span>
                  </div>
                )}
                {isLoading && <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />}
              </div>

              {/* App Info */}
              <div className="mb-4">
                <div className="font-semibold text-slate-900 mb-1">{app.name}</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {app.description}
                </div>
              </div>

              {/* Action Button */}
              {canUse ? (
                isConnected ? (
                  <button
                    onClick={() => disconnectApp(app.id)}
                    className="w-full px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Manage Connection
                  </button>
                ) : (
                  <button
                    onClick={() => connectApp(app.id)}
                    disabled={isLoading}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        Connect <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )
              ) : (
                <button
                  disabled
                  className="w-full px-4 py-2 text-sm font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded-lg cursor-not-allowed"
                >
                  Upgrade to {app.tier.charAt(0).toUpperCase() + app.tier.slice(1)}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Connected Apps</span>
          <span className="font-semibold text-slate-900">
            {connections.size} / {AVAILABLE_APPS.filter(app => canUseApp(app)).length}
          </span>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-xs text-slate-500 leading-relaxed">
        <p>
          <strong>Note:</strong> Connected apps require OAuth authentication. A popup window will open for you to authorize CurriculumOS to access your account. Make sure popups are enabled in your browser.
        </p>
      </div>
    </div>
  );
}
