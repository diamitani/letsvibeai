# Module 1 — What is vibe coding?

Vibe coding is building software by describing what you want in plain language — typed or spoken — and letting AI agents write the code. The term was coined by AI researcher Andrej Karpathy in February 2025. You "vibe" with your ideas; the agent does the typing.

### Lesson 1.1 — From idea to software, in words

Traditional coding: you learn a language, then translate your idea into it line by line. Vibe coding: you describe the idea, the AI translates it, and you review and steer. Your job shifts from *typist* to *director*.

**Analogy:** you're the film director, not the camera operator. You don't need to know how the lens works, but you must know what the scene needs.

Vibe coding works when you know two principles. Skip either and you get apps that look right and break later.

### Lesson 1.2 — Principle 1: Direction beats guessing

AI models have absorbed an enormous amount of human knowledge, but getting the right piece out is a process. A model predicts the most likely next words. When your request is vague, it fills the gaps with plausible guesses — an invented library, a made-up setting, a confident wrong answer. This is called **hallucination**. It isn't lying on purpose; it's pattern-completion without enough facts.

When you give concrete, definite instructions — the goal, the tools, the constraints, examples, what "done" looks like — the model routes to the right answer far more reliably.

| Vague (invites guessing) | Directed (routes to the answer) |
| --- | --- |
| "Make me a login page." | "Build a sign-up and sign-in page using Supabase Auth with Google sign-in and email magic links, in Next.js with Tailwind. After sign-in, redirect to /dashboard. Show errors under the form." |
| "Add payments." | "Add Stripe Checkout for one monthly plan at $29. On success, mark the user as `pro` in the Supabase `profiles` table via a webhook." |

**Rule of thumb:** if a smart new hire would need to ask you a question, the AI needs that answer in the prompt.

### Lesson 1.3 — Principle 2: Every app has an architecture

Architecture is the set of parts that make software work, and how they connect. A house has a foundation, framing, plumbing, wiring and rooms. A web app has:

- **Front end** — what people see: the public website, the logged-in dashboard, and increasingly a chat interface for talking to AI agents.
- **Back end** — the code that runs behind the scenes and makes everything work.
- **Storage** — a "Google Drive" for your app's files (images, PDFs, uploads).
- **Database** — a super-powered spreadsheet that organizes your app's information (users, orders, messages).
- **Authentication (auth)** — sign-up and sign-in, so each member only sees their own stuff.
- **Payments, hosting, deployment, versioning, agents** — covered in Module 4.

If you skip the foundation, the AI will happily build rooms that collapse. Plan the architecture first; then every prompt has a place to land.

### Lesson 1.4 — The vibe coding method in one picture

1. **Describe** your idea in plain words (a brain dump is fine).
2. **Document** it — ask AI to turn it into planning docs (Module 8).
3. **Architect** it — map each building block to a tool (Modules 4–5).
4. **Build** one piece at a time with an agent (Module 9).
5. **Check** every piece against a checklist, then **ship** (Module 10).

**Prompt to copy:**

```
I want to build a web app. Here is my idea in my own words: [brain dump].
Before writing any code, ask me up to 10 questions that a product manager
and a software architect would need answered. Ask them one at a time.
```

**Exercise:** write your app idea in one paragraph: who it's for, the problem, what they do in the app, and how it makes money. Run the prompt above and save the Q&A — it becomes your first context file.

**Check yourself:**

1. Why does a vague prompt produce made-up answers?
2. Name five building blocks of a web app.
3. What's the difference between storage and a database?


---

[Course home](../README.md) · [Next →](./02-ai-fundamentals.md)
