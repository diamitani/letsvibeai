"use client";

import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { Hero } from "@/components/marketing/Hero";
import { Solutions } from "@/components/marketing/Solutions";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Integrations } from "@/components/marketing/Integrations";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";
import { CTA } from "@/components/marketing/CTA";

export default function LandingPage() {
  return (
    <>
      <MarketingHeader />

      <main>
        <Hero />
        <Solutions />
        <Features />
        <HowItWorks />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <MarketingFooter />
    </>
  );
}
