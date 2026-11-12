# Module 3 — Edge Functions, Stripe Checkout & Webhooks

When your Lovable application requires server-side secrets (like Stripe secret keys or AI model API keys), you invoke Supabase Edge Functions or Next.js route handlers.

### Lesson 3.1 — Stripe Checkout Integration

- Client initiates checkout request with selected `price_id`.
- Edge Function creates a Stripe Checkout Session with `client_reference_id = user.id`.
- Webhook endpoint listens for `checkout.session.completed`, verifies the signature, and updates user entitlements in the database.
- Idempotency guards prevent duplicate provisioning.
