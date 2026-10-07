# Module 10 — Ship it: versioning, deployment, hosting and launch

Shipping is a habit, not an event: save every change with Git, let every push deploy a preview, promote to production only when the checklist passes, then put the app in front of customers with your go-to-market plan.

### Lesson 10.1 — Git versioning in five words

| Term | Meaning | Analogy |
| --- | --- | --- |
| Repository (repo) | Your project's folder plus its full history | A photo album of every version |
| Commit | A saved snapshot with a message | One photo with a caption |
| Branch | A parallel copy for trying something | A draft you can throw away |
| Pull request (PR) | A request to merge a branch, with review | Asking an editor to approve changes |
| Push / pull | Upload to / download from GitHub | Syncing to the cloud |

You rarely type Git commands yourself — ask the agent: *"Commit these changes with a clear message and push to a new branch called feature/pricing."* Rule: **commit after every working step.** If the agent breaks something, you can roll back in seconds.

### Lesson 10.2 — Deployment and hosting

1. Connect your GitHub repo to Vercel once.
2. Add environment variables (API keys) in Vercel's project settings — never in code.
3. Every push to a branch creates a **preview URL**; test there.
4. Merging to `main` deploys to **production**.
5. Connect your domain (e.g. GoDaddy or Cloudflare DNS pointing to Vercel).
6. If production breaks, use **instant rollback** to the last good deployment.

### Lesson 10.3 — Pre-launch checklist

- [ ] All PRD user stories pass on the production URL
- [ ] Sign-up, sign-in, sign-out and password reset work
- [ ] Stripe in live mode; test purchase, refund and cancel
- [ ] Stripe webhook verified and updating the database
- [ ] Row-level security on for every Supabase table
- [ ] No secrets in the repo; all keys in environment variables
- [ ] AI spend limits set in the AI Gateway or provider console
- [ ] Privacy policy, terms of service, cookie notice
- [ ] Analytics and error monitoring installed
- [ ] Mobile layout checked on a real phone
- [ ] Backups on for the database

### Lesson 10.4 — Launch with your go-to-market plan

Use document #11 from Module 8. A first launch needs only four things: one clear promise on the landing page, one pricing plan, one channel you'll show up on every day (LinkedIn, YouTube, X, a newsletter or communities), and a way to talk to your first 10 users personally. Ship, listen, improve weekly.

**Exercise:** deploy your capstone to a live URL, run the pre-launch checklist, and post a 60-second demo video on one channel.

**Check yourself:**

1. What's the difference between a preview and a production deployment?
2. Why commit after every working step?
3. Name three items on the pre-launch checklist that protect your users' data.


---

[← Previous](./09-build-process.md) · [Course home](../README.md) · [Capstone →](../capstone/README.md)
