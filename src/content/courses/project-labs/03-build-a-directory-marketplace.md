---
title: Build a Directory/Marketplace
duration: ~8 hours
description: Build a multi-tenant platform.
---

## Prerequisites

- Labs 1 and 2 completed
- Module 6: Process Engineering
- Comfortable with databases and authentication

## Learning Objectives

- Build a multi-tenant platform
- Implement user-generated content
- Design search and filtering systems
- Handle file uploads and media
- Build admin/moderator features
- Apply process engineering to a complex project

## Build Steps

### Step 1: Define the Platform (30 min)

Choose your niche:
- **Directory:** Local services, AI tools, courses, events
- **Marketplace:** Digital products, freelance services, rental items

Define: Who lists? Who searches? What's the transaction model?

### Step 2: Database Schema (1 hour)

Design your schema:

```
users: id, email, name, role (user/admin), avatar
listings: id, title, description, price, category, images[], status, user_id, created_at
categories: id, name, slug, parent_id
reviews: id, rating, text, listing_id, user_id
```

Implement with Supabase or Convex.

### Step 3: Listing Management (1.5 hours)

- Create listing form with image upload
- Edit/delete listings
- Listing detail page
- User dashboard for managing listings
- Listing status workflow (draft → published → featured)

### Step 4: Search and Discovery (1.5 hours)

- Full-text search
- Category filtering
- Price range filter
- Location filter (if applicable)
- Sort by relevance, date, price, rating
- Pagination

### Step 5: User Profiles and Reviews (1 hour)

- Public profile pages
- Review and rating system
- Seller/member reputation
- Contact or inquiry system

### Step 6: Admin Features (1 hour)

- Admin dashboard
- Listing moderation (approve/reject)
- User management
- Basic analytics

### Step 7: Polish and Deploy (1 hour)

- Responsive design audit
- Performance optimization
- SEO basics (meta tags, sitemap)
- Accessibility check
- Production deploy

## Stretch Goals

- Payment processing for marketplace transactions
- Messaging system between users
- Saved searches and alerts
- Featured/boosted listings
- API for third-party access
- i18n support

## Assessment Criteria

| Criterion | Pass | Distinction |
|-----------|------|-------------|
| Listings | C/U/D with images | Bulk import, rich editor |
| Search | Text + category filter | Full-text + facet + geo |
| Auth | User accounts + roles | OAuth, admin dashboard |
| UX | Responsive, all states | Animations, empty states, onboarding |
| Code | Organized components | Custom hooks, typed APIs |
| Deployed | Live platform | Real listings, custom domain |
