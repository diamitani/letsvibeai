// Vercel serverless: POST /api/subscribe  { email, source }
// Env: RESEND_API_KEY + RESEND_AUDIENCE_ID (or swap for ConvertKit/Beehiiv)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, source } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });
  const key = process.env.RESEND_API_KEY, aud = process.env.RESEND_AUDIENCE_ID;
  if (!key || !aud) { console.log('subscribe (no provider configured):', email, source); return res.status(200).json({ ok: true }); }
  const r = await fetch(`https://api.resend.com/audiences/${aud}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, unsubscribed: false })
  });
  if (!r.ok) return res.status(502).json({ error: 'Provider error' });
  return res.status(200).json({ ok: true });
}
