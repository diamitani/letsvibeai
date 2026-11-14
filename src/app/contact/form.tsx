'use client';

import { useState } from 'react';

export function ContactForm({
  defaultTopic,
  email,
  endpoint,
}: {
  defaultTopic: string;
  email: string;
  endpoint: string;
}) {
  const [topic, setTopic] = useState(defaultTopic);
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${message}\n\n— ${name} <${from}>`;
    if (endpoint) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email: from, topic, message: body }),
      });
      setStatus(res.ok ? 'Sent. We’ll be in touch.' : 'Something went wrong. Email us directly instead.');
      return;
    }
    const mailto = `mailto:${email}?subject=${encodeURIComponent(topic || 'LetsVibeAI inquiry')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={submit} className="card space-y-4 p-6">
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Topic</span>
        <input className="input" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Live Build Night" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Your name</span>
        <input className="input" required value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Email</span>
        <input className="input" type="email" required value={from} onChange={(e) => setFrom(e.target.value)} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Message</span>
        <textarea className="input min-h-32" required value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <button type="submit" className="btn-primary">
        Send
      </button>
      {status && <p className="text-sm text-muted">{status}</p>}
    </form>
  );
}
