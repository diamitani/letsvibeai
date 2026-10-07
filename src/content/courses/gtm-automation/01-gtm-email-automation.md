---
title: GTM Email Automation with Make.com
duration: 1.5-2 hours
description: Understand GTM engineering as a practice — building AI and automation for sales and marketing.
---

## Learning Objectives

- Understand GTM engineering as a practice — building AI and automation for sales and marketing
- Build an automated email outreach pipeline with Make.com
- Implement proper email deliverability (SPF, DKIM, DMARC)
- Track outreach status in Google Sheets

---

## What Is GTM Engineering?

GTM (Go-to-Market) engineering is the practice of building AI-powered automations for sales and marketing. It represents a fundamental shift:

| Traditional | GTM Engineering |
|-------------|-----------------|
| Sales person uses tools | Sales person builds systems |
| Manual sequences | Automated workflows |
| Generic outreach | AI-personalized at scale |
| Separate tools | Connected pipelines |

---

## What You'll Build

A Make.com scenario that:

```
Google Sheet (leads)
    → Filter (not contacted yet)
    → Send personalized email (Resend)
    → Wait (3 seconds)
    → Update sheet with timestamp
```

### What You'll Need

- Google account with a leads sheet
- Resend account with a verified sending domain
- Make.com account (free tier: 1,000 operations/month)

---

## Step-by-Step

### Step 1: Set Up Your Leads Sheet

Create a Google Sheet named "Leads" with columns:

| Name | Email | Company | Email 1 Date |
|------|-------|---------|--------------|

Add rows of prospect data. Leave "Email 1 Date" blank for new leads.

### Step 2: Create the Make.com Scenario

1. **Google Sheets → Search Rows**
   - Connect your Google account
   - Select your spreadsheet and "Leads" sheet

2. **Filter**
   - Condition: Email column exists AND Email 1 Date does not exist
   - This ensures you only contact leads who haven't been emailed yet

3. **Resend → Send Email**
   - Connect your Resend account (add API key)
   - To: `{{email}}`
   - From: your verified sending domain
   - Subject: a template with personalization
   - Body: plain text (better deliverability than HTML)

4. **Tools → Sleep**
   - Duration: 3 seconds
   - Prevents email throttling and protects sender reputation

5. **Google Sheets → Update Row**
   - Map to the original row number
   - Find "Email 1 Date" column
   - Value: `{{now}}` (current timestamp)

### Step 3: Schedule the Scenario

- Set to run on a schedule (daily or hourly)
- Respect sending limits: start with 10-20 emails/day
- Gradually increase as your domain warms up

---

## Email Deliverability Essentials

| Setting | Purpose | How to Set Up |
|---------|---------|---------------|
| SPF | Authorizes which servers can send from your domain | TXT record in your DNS |
| DKIM | Cryptographically signs your emails | TXT record (provided by Resend) |
| DMARC | Tells receivers what to do with unauthenticated email | TXT record in your DNS |

**Best practice:** Use a subdomain for cold outreach (e.g., `mail.yourdomain.com`) to protect your primary domain's reputation.

---

## Extension Ideas

Once the basic pipeline works, add:

1. **Personalization** — Use an LLM module to generate personalized subject lines based on company info
2. **Multi-step sequences** — Add follow-up emails at 3-day, 7-day, and 14-day intervals
3. **Tracking** — Use Resend's webhooks to track opens and clicks
4. **LinkedIn enrichment** — Add a module to look up prospect LinkedIn profiles
5. **AI research** — Before sending, use Perplexity to research the company and generate a personalized reference

---

## Key Takeaways

- GTM engineering is a new skillset: building systems, not just using tools
- A simple email automation pipeline is achievable in under an hour with Make.com
- Email deliverability depends on proper DNS configuration (SPF, DKIM, DMARC)
- Start small, warm up your domain, then scale

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Emails going to spam | Missing SPF/DKIM | Configure DNS records |
| Make.com scenario errors | Row mapping wrong | Check column names match exactly |
| Rate limiting | Sending too fast | Increase sleep duration |
| No emails sent | Filter too strict | Check sheet column values |
