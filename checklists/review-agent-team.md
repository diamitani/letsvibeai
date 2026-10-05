# Review agent team

Run each reviewer as its own agent with this prompt:

```
You are the [Reviewer] reviewer. Read /docs and the codebase. Check every item in your row below, report pass/fail with file and line, and propose fixes. Do not change code until I approve.
```

| Reviewer | Checks |
| --- | --- |
| UI | Visual consistency with design specs and brand guidelines |
| UX | User funnel: time to first value, time to buy, dead ends, empty states |
| Design system | Tokens and components reused, not reinvented |
| Front end | Responsive layouts, performance, accessibility |
| Back end | API routes, error handling, secrets in env vars only |
| Database | Schema, indexes, row-level security on every table |
| Security | Auth flows, webhooks verified, rate limits, dependency audit |
| QA | Every user story from the PRD tested; console free of errors |
| Scale | Will it hold at 1, 1,000 and 1,000,000 users? What breaks first? |
