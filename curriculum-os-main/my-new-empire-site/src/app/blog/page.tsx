import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Daily Vibe</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Your daily AI learning companion. Watch the featured video and read curated articles.
          </p>
          
          <!-- Daily Vibe Video Section -->
          <div className="mb-16 bg-card border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Today's Daily Vibe</h2>
            <div className="aspect-w-16 aspect-h-9 bg-secondary rounded-xl overflow-hidden">
              <!-- Placeholder for video embed - will be enhanced with actual video -->
              <div className="flex items-center justify-center h-full bg-muted">
                <p className="text-muted-foreground">
                  Video: Daily Vibe AI News & Learning\n
                  (Embedded player coming soon)
                </p>
              </div>
            </div>
          </div>
          
          <!-- Featured Article Section -->
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Featured Article</h2>
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                "The Future of AI-Powered Learning: How ROSTR is Revolutionizing Education"
              </h3>
              <p className="text-muted-foreground mb-4">
                Discover how artificial intelligence is transforming the way we learn, with personalized curricula that adapt to your skill level, goals, and learning pace.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-primary hover:underline">
                Read Article <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          
          <!-- Recent Articles Grid -->
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Article Cards */}
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">AI Coding Tools That Actually Work in 2024</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  A practical comparison of the most effective AI-assisted development tools available today.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline">
                  Read more <ArrowRight className="size-3" />
                </Link>
              </div>
              
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">Learning Path Design: From Beginner to Expert</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  How to structure your learning journey for maximum retention and skill acquisition.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline">
                  Read more <ArrowRight className="size-3" />
                </Link>
              </div>
              
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">The Rise of Agent-Based AI Systems</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Understanding multi-agent architectures and their applications in education and productivity.
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline">
                  Read more <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
          
          <!-- CTA Section -->
          <div className="text-center pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-4">Never Miss an Update</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to get the Daily Vibe video and curated articles delivered to your inbox every morning.
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium transition-colors hover:bg-primary/90">
              Stay Connected <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
