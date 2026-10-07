---
title: Personalized Email Outreach Engine
duration: 2-3 hours
description: Build an AI-powered outreach system that researches and personalizes every email.
---

## Learning Objectives

- Build an AI-powered outreach system that researches and personalizes every email
- Integrate multiple AI services (Perplexity + DeepSeek) into a single automation
- Understand the architecture of a research-driven cold email pipeline
- Implement deliverability best practices for cold outreach

---

## The Architecture

```
Google Sheet (leads)
    → Perplexity: Research prospect company
    → Perplexity: Research YOUR own products
    → DeepSeek: Draft personalized email
    → Resend: Send email
    → Google Sheet: Update status + timestamp
```

Cost to run: ~$5/month using free tiers and minimum credit purchases.

---

## Step-by-Step

### Step 1: Set Up Your Lead Sheet

Create a Google Sheet named "Leads" with these exact column headers:

| first_name | last_name | email | company_name | company_domain | prospect_linkedin | title | source | status | email_1_date | email_1_message_id | notes |
|------------|-----------|-------|--------------|----------------|-------------------|-------|--------|--------|-------------|-------------------|-------|

Leave `email_1_date` and `email_1_message_id` blank for new leads — these act as sentinel columns.

### Step 2: Configure Make.com Modules

**Module 1 — Google Sheets: Search Rows**
- Query: `email_1_date` is empty
- Limit: 5-10 leads per run (to manage API costs)
- Add an Iterator to process rows one by one

**Module 2 — Perplexity: Company Research**

Prompt template for Perplexity API:

```
Research the company: 
- Company: {{company_name}}
- Domain: {{company_domain}}  
- Prospect LinkedIn (if provided): {{prospect_linkedin}}

Deliver a concise, factual brief:
1) What they do
2) ICP and segments
3) Recent news (last 90 days)
4) Competitive context
5) Potential pain points related to [your industry]
```

Output: Save to a `company_research_summary` variable.

**Module 3 — Perplexity: Your Product Knowledge Snapshot**

Run a second research call so the writer model knows what you sell.

Inputs: your primary domain and product pages (or a brief about what your company does).

Prompt:

```
Analyze this product/service:
[your product description]

Deliver:
1) Key value propositions
2) Target customer profile
3) Features most relevant to [target industry]
4) Case study or success story snippets
```

Output: Save to a `product_snapshot` variable.

**Alternative:** If you don't want to use Perplexity twice, replace one call with:
- Gemini with web search enabled
- OpenAI with web search (browsing mode)
- Simple HTTP module to scrape the company homepage

**Module 4 — DeepSeek: Draft Personalized Email**

Combine the research outputs:

```
You are a sales email writer. Using the following research, write a short cold email body.

Company Research:
{{company_research_summary}}

Our Product:
{{product_snapshot}}

Prospect Name: {{first_name}} {{last_name}}
Prospect Title: {{title}}

Rules:
- No subject line — body only
- Max 150 words
- Reference something specific from the company research
- Clear, low-pressure call to action
- Professional but conversational tone
```

**Module 5 — Resend: Send Email**
- To: `{{email}}`
- From: your verified domain
- Subject: `{{first_name}}, quick question about [topic from research]`
- Body: DeepSeek output (plain text)

**Module 6 — Google Sheets: Update Row**
- Map to the original row
- Set `email_1_date` to `{{now}}`
- Set `email_1_message_id` to the Resend message ID

### Step 3: Schedule and Monitor

- Run as a scheduled scenario (once daily)
- Start at 5-10 emails/day, gradually increase
- Monitor open rates and adjust subject line patterns

---

## Alternative Providers

If Perplexity or DeepSeek aren't available:

| Step | Alternatives |
|------|-------------|
| Web Research | Gemini + web search, OpenAI browsing, Google Custom Search API |
| Email Writing | GPT-4, Claude, Gemini, any chat completion API |
| Sending | SendGrid, AWS SES, Postmark |

---

## Deliverability Considerations

Cold email is a high-risk channel. Protect your domain:

| Practice | Why |
|----------|-----|
| Use a subdomain | Isolates cold email reputation from primary domain |
| Warm up gradually | Start with 5/day, increase by 5 every 3 days |
| Monitor bounce rates | Keep under 2% — anything higher triggers spam filters |
| Personalize genuinely | Generic templates get flagged immediately |
| Include unsubscribe | Required by law (CAN-SPAM, GDPR) |

---

## Key Takeaways

- A personalized outreach engine can be built for ~$5/month using free tiers
- The three-step research-draft-send pipeline produces higher-quality outreach than batch-and-blast
- Two research calls (company + product) gives the writer everything it needs
- Plain text emails with genuine personalization outperform HTML templates
- Domain warming and deliverability are the hardest part — not the automation

---

## Extension Ideas

- Add Perplexity research on the specific prospect (not just company)
- Multi-step sequences: Day 1 email, Day 4 follow-up, Day 10 break-up
- A/B test subject lines across different lead segments
- Track replies via Gmail/Outlook webhook and auto-tag as "Replied"
- Add LinkedIn outreach as a parallel channel
