import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";

const tiers = [
  { name: "Free", price: "$0", period: "forever", features: ["3 curricula per month", "Basic resource search", "Standard lesson plans", "Web access"], cta: "Get Started", plan: "free", featured: false },
  { name: "Pro", price: "$19", period: "/month", features: ["Unlimited curricula", "Advanced AI research", "Custom content generation", "Save & track progress", "Priority support", "Export to PDF/Markdown"], cta: "Start Pro", plan: "pro", featured: true },
  { name: "Team", price: "$49", period: "/month", features: ["Everything in Pro", "Team dashboards", "Shared curricula", "Admin controls", "API access", "SSO"], cta: "Contact Sales", plan: "team", featured: false },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-muted-foreground">Start free. Upgrade when you need more.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((t) => (
            <div key={t.name} className={`bg-card border rounded-2xl p-8 relative ${t.featured ? "border-primary shadow-lg shadow-primary/10" : "border-border"}`}>
              {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>}
              <h3 className="font-semibold text-lg mb-1">{t.name}</h3>
              <div className="mb-6"><span className="text-4xl font-bold">{t.price}</span><span className="text-muted-foreground">{t.period}</span></div>
              <ul className="space-y-3 mb-8">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm"><CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />{f}</li>
                ))}
              </ul>
              {t.plan === "free" ? (
                <Link href="/signup" className={`block text-center py-2.5 rounded-xl font-medium text-sm transition-colors border border-border hover:bg-secondary/50`}>{t.cta}</Link>
              ) : (
                <StripeCheckoutButton plan={t.plan} label={t.cta} variant={t.featured ? "primary" : "outline"} />
              )}
            </div>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
