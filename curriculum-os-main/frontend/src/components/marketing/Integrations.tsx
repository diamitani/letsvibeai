"use client";

import { Check, Clock } from "lucide-react";

const integrations = [
  {
    name: "DeepSeek API",
    description: "LLM-powered search, taxonomy building, and gap-filling content generation",
    status: "active",
    logo: "🧠"
  },
  {
    name: "Vercel",
    description: "One-click frontend deployment with Next.js 15 optimization",
    status: "active",
    logo: "▲"
  },
  {
    name: "GitHub",
    description: "Version-controlled ROSTR framework with 27 test cases",
    status: "active",
    logo: "⚡"
  },
  {
    name: "Composio",
    description: "Agent tooling integration for extended capabilities and workflow automation",
    status: "coming-soon",
    logo: "🔧"
  },
  {
    name: "FastAPI",
    description: "Python backend with /research, /index, /generate endpoints",
    status: "active",
    logo: "⚙️"
  },
  {
    name: "Tailwind CSS",
    description: "Modern, responsive UI with chat interface and curriculum display components",
    status: "active",
    logo: "🎨"
  }
];

export function Integrations() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4">
            Integrations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Works with the tools{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              you already use
            </span>
          </h2>
          <p className="text-xl text-slate-400">
            Extensible architecture with support for custom integrations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {integration.status === "active" ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-xs font-medium text-green-400">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span className="text-xs font-medium text-orange-400">Soon</span>
                  </div>
                )}
              </div>

              {/* Logo */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {integration.logo}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white mb-2">
                {integration.name}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">
                {integration.description}
              </p>

              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Need a custom integration?
          </p>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:underline"
          >
            View API documentation →
          </a>
        </div>
      </div>
    </section>
  );
}
