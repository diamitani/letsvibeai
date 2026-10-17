import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { RSSArticle } from "@/types/rss";
import Link from "next/link";

// Mock data - will be replaced with actual RSS feed data
const mockArticles: RSSArticle[] = [
  {
    id: "1",
    title: "OpenAI Announces New Reasoning Models",
    summary: "OpenAI has released new reasoning-focused models that demonstrate significant improvements in logical reasoning tasks.",
    link: "#",
    feedName: "TechCrunch AI",
    publishedAt: new Date().toISOString(),
    image: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Claude 3.5 Sonnet: The Latest AI Assistant Model",
    summary: "Anthropic's latest model iteration brings improved reasoning and coding capabilities.",
    link: "#",
    feedName: "The Verge",
    publishedAt: new Date().toISOString(),
    image: "/placeholder.svg"
  }
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">AI Daily News</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Daily curated AI news and articles from top sources across the web. 
          </p>
          
          {/* Featured Articles Section */}
          <h2 className="text-2xl font-bold mb-6">Today's Top Stories</h2>
          
          {/* Article Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {mockArticles.map((article) => (
              <div key={article.id} className="bg-card border rounded-2xl p-6 hover:border-primary transition-colors">
                <div className="mb-4">
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {article.feedName}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  <Link href={article.link} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{article.summary}</p>
                <div className="text-xs text-muted-foreground">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          
          {/* All Articles Section - Will be populated by RSS feed */}
          <div className="bg-card border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">All Articles ({mockArticles.length} shown)</h2>
            <p className="text-muted-foreground mb-6">
              Aggregated daily from 100+ AI-focused RSS feeds. Articles are AI-curated based on relevance and credibility.
            </p>
            
            {/* Pagination Controls */}
            <div className="flex justify-center gap-2 mt-8">
              <button className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:bg-secondary/80">1</button>
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">2</button>
              <button className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:bg-secondary/80">3</button>
            </div>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
