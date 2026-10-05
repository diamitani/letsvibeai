"use client";

import { useState } from "react";

interface StripeButtonProps {
  plan: string;
  label: string;
  variant?: "primary" | "outline";
}

export function StripeCheckoutButton({ plan, label, variant = "outline" }: StripeButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.message) {
        alert(data.message);
      } else {
        alert(data.error || "Checkout failed. Please try again.");
      }
    } catch {
      alert("Could not reach checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`block w-full text-center py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50 ${
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border hover:bg-secondary/50"
      }`}
    >
      {loading ? "Redirecting..." : label}
    </button>
  );
}
