# GencyAI — Claude Mastery (free library)

Static one-page site + one Vercel serverless function for the optional email list.

```
index.html        # self-contained site
api/subscribe.js  # email signup → Resend audience
vercel.json
```

## Deploy
```bash
git init && git add . && git commit -m "GencyAI Claude Mastery"
gh repo create gencyai-claude-mastery --public --source=. --push
npx vercel --prod
```

## Env vars (optional — Vercel → Settings → Environment Variables)
- `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` — without them, signups are logged in Vercel function logs.

## Videos
Set each lesson's video URL (MP4, Mux, or YouTube embed) in the page's lesson list.
