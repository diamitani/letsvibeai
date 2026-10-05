---
artifact_type: architecture
project_id: my-new-empire-site
version: v0.1.0-draft
status: draft
owner: eng
reviewers: []
well_architected_review: pending
---

# System Architecture

## 1. Logical Layers
- **Edge**: [CDN/WAF]
- **Experience**: Next.js App Router
- **Data**: Postgres
- **Providers**: Stripe, Supabase Auth

## 2. Default Reference Topology
- Vercel (Hosting)
- Supabase (DB + Auth)
- Stripe (Payments)

## 3. Failure Modes
- [Failure 1: Detection -> Response]
