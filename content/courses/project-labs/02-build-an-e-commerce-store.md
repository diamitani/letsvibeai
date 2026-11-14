---
title: Build an E-Commerce Store
duration: ~6 hours
description: Build a multi-page store with product catalog.
---

## Prerequisites

- Lab 1 completed
- Module 5: Context Engineering
- Basic understanding of databases (Supabase helps)

## Learning Objectives

- Build a multi-page store with product catalog
- Implement cart and checkout flow
- Integrate payment processing
- Handle user authentication
- Manage product inventory via database

## Build Steps

### Step 1: Product Catalog (1 hour)

Prompt the scaffold:

```
Build an e-commerce store for [product category].
Features needed:
- Product listing page with grid view
- Product detail page with images, description, price
- Category filtering
- Search bar
- Sort by price/name/popularity

Use: [tool name], Tailwind CSS, [database if applicable]
```

### Step 2: Shopping Cart (1 hour)

Add cart functionality:

- Add to cart button
- Cart sidebar or page
- Quantity adjustment
- Remove items
- Price calculation (subtotal, tax, total)
- Cart persistence (local storage or database)

### Step 3: Checkout Flow (1.5 hours)

- Checkout page with address form
- Order summary
- Payment integration (Stripe test mode)
- Order confirmation page
- Email receipt notification (optional)

### Step 4: Authentication (1 hour)

- Sign up / log in
- User profile page
- Order history
- Address management

### Step 5: Polish and Deploy (1.5 hours)

- Loading states for all async operations
- Empty states (empty cart, no orders)
- Error states (payment failed, network error)
- Success states (order confirmed)
- Deploy to production

## Stretch Goals

- Product reviews and ratings
- Wishlist functionality
- Inventory management dashboard
- Discount codes
- Abandoned cart recovery
- Multi-currency support

## Assessment Criteria

| Criterion | Pass | Distinction |
|-----------|------|-------------|
| Catalog | 10+ products, filterable | 50+ products, faceted search |
| Cart | Add/remove, quantity, persist | Synced across devices |
| Checkout | Address + payment flow | Guest checkout + account |
| Auth | Sign up/log in | OAuth, password reset |
| Deployed | Live store | Real products, custom domain |
