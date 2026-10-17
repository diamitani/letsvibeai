import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About CurriculumOS</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              CurriculumOS is an AI-powered learning platform that helps you discover, organize, and master new skills. By researching the best online resources and structuring them into personalized learning paths, we make high-quality education accessible to everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our platform combines advanced AI research capabilities with a curated knowledge graph to surface the most relevant and credible learning materials. Whether you're a developer, designer, or lifelong learner, CurriculumOS adapts to your goals and pace.
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-4">Core Technology</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Built on the ROSTR framework, our system uses a multi-agent architecture to:
              <ul>
                <li><strong>PAL (Prompt Abstraction Layer)</strong> — Converts natural language into structured agent instructions</li>
                <li><strong>RAG DAL (Retrieval-Augmented Knowledge Engine)</strong> — Finds and synthesizes credible sources from the web</li>
                <li><strong>NPAO (Neural Priority Assessment Engine)</strong> — Evaluates resources by relevance, difficulty, and learning impact</li>
                <li><strong>Hub (Agent Operating System)</strong> — Manages persistent state and tracks your learning journey</li>
              </ul>
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-4">Why Choose CurriculumOS?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              - <strong>Personalized Learning Paths</strong> — Automatically sequenced based on your goals and expertise
              - <strong>Credible Sources Only</strong> — Verified by our three-tier credibility scoring system
              - <strong>AI-Powered Research</strong> — Instant discovery of the latest tutorials, courses, and projects
              - <strong>Adaptive Difficulty</strong> — Resources scale with your skill level
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium text-sm transition-colors border border-border hover:bg-secondary/50">Stay Connected</Link>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
