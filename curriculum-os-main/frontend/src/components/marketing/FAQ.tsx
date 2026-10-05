"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does setup take?",
    answer: "Under 5 minutes. Clone the repo, run `./start.sh`, and open `http://localhost:3002`. No complex configuration required. If you have a DeepSeek API key, add it via `export DEEPSEEK_API_KEY=\"sk-...\"` for LLM-powered features. Without it, the system runs in simulated mode with structured default curricula."
  },
  {
    question: "What makes CurriculumOS different from other AI learning tools?",
    answer: "CurriculumOS is built on the ROSTR framework — a production-grade multi-agent architecture with: PAL (Prompt Abstraction Layer) for intent compilation, RAG DAL with 3-tier credibility scoring, NPAO with 5D phase classification + 4D priority allocation, and Persistent State for knowledge compounding. Most tools use single-shot LLM calls. CurriculumOS orchestrates specialized agents with phase-aware routing and credibility-weighted knowledge retrieval."
  },
  {
    question: "Is my curriculum data secure?",
    answer: "Yes. CurriculumOS runs locally on your machine or private Vercel deployment. Your learning goals, research queries, and generated curricula never leave your infrastructure unless you explicitly integrate external APIs (like DeepSeek). The ROSTR Hub state management uses file-based storage with namespace isolation — no external data sharing by default."
  },
  {
    question: "Can I test it before committing?",
    answer: "Absolutely. CurriculumOS works in simulated mode without any API keys. Clone the repo and run `./start.sh` to test the full pipeline with structured default curricula. When you're ready for LLM-powered features, add a DeepSeek API key. We also offer a 14-day free trial for Growth and Pro plans."
  },
  {
    question: "What integrations are available?",
    answer: "Currently integrated: DeepSeek API (LLM backend), Vercel (frontend hosting), and GitHub (version control). Coming soon: Composio (agent tooling), Notion/Google Docs (curriculum export), Slack (team notifications), and Zapier (workflow automation). The ROSTR framework is extensible — you can build custom agents and integrations using the PAL compilation pipeline."
  },
  {
    question: "Can I customize the curriculum generation logic?",
    answer: "Yes. CurriculumOS is fully open-source (MIT license). You can modify agent behaviors in `backend/src/curriculum_agent/`, adjust PAL compilation rules, change RAG DAL credibility tiers and weights, customize NPAO priority scoring formulas, and add new phases to the 5D taxonomy. For enterprise users, we offer custom agent development and dedicated ROSTR framework training."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about CurriculumOS
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-5 text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            Contact our team →
          </a>
        </div>
      </div>
    </section>
  );
}
