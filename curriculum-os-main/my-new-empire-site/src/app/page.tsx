import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Daily Vibe</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Your daily dose of AI-powered learning. Curated articles, expert insights, and the Daily Vibe video—all in one place.
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            <Link href="/about" className="block w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors">Learn More About Us</Link>
            <Link href="/blog" className="block w-full border border-border text-foreground py-4 rounded-xl font-semibold text-lg hover:bg-secondary/50 transition-colors">Read Our Blog</Link>
            <Link href="/news" className="block w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors">Explore News</Link>
            <Link href="/signup" className="block w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors">Start Learning</Link>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
