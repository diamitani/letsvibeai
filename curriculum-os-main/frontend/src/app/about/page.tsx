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
              CurriculumOS was born from a simple observation: the internet has infinite learning resources, but finding the right ones — and sequencing them into an effective learning path — is still painfully manual.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We built an AI-powered curriculum architect that researches the best resources across the web, organizes them by credibility and difficulty, and generates personalized learning paths tailored to your goals, level, and available time.
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-4">Built on ROSTR</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Under the hood, CurriculumOS runs on the{" "}
              <a href="https://github.com/diamitani/curriculum-os" target="_blank" rel="noopener" className="text-primary hover:underline">ROSTR framework</a>{" "}
              — a production-grade multi-agent architecture with four specialized components:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li><strong className="text-foreground">PAL</strong> — Prompt Abstraction Layer that compiles natural language into structured agent manifests</li>
              <li><strong className="text-foreground">RAG DAL</strong> — Knowledge engine with three-tier source credibility scoring</li>
              <li><strong className="text-foreground">NPAO</strong> — Decision engine with 5D phase taxonomy and 4D priority scoring</li>
              <li><strong className="text-foreground">Hub</strong> — Agent operating system with persistent state and knowledge compounding</li>
            </ul>
            <h2 className="text-2xl font-bold mt-10 mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Make personalized, high-quality learning paths accessible to everyone. Whether you're learning to code, studying for a certification, or exploring a new field — your AI curriculum architect is ready.
            </p>
          </div>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
            Start Learning <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
