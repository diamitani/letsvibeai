import React, { useState } from 'react';
import { Search, Compass, CheckCircle2, DollarSign, ExternalLink, Mail, MessageSquare, Sparkles, Building2, Send } from 'lucide-react';
import { DIRECTORY_LISTINGS } from '../../data/mockData';
import { DirectoryListing } from '../../types';

export const DirectoryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [contactFounder, setContactFounder] = useState<DirectoryListing | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');

  const filteredListings = DIRECTORY_LISTINGS.filter((item) => {
    const matchesTag = selectedTag === 'all' || item.stack.includes(selectedTag);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.founder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setContactFounder(null);
      setInquiryMessage('');
      setInquiryEmail('');
    }, 1800);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Directory Hero */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>Vetted Vibe Coding Startups</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Built with <span className="text-cyan-400">LetsVibeAI</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-400">
          Discover verified startups, AI agents, and developer tools shipped by alumni and builders
          using the Vercel AI Suite & ROSTR v2 architectural framework.
        </p>

        {/* Global Directory Stats */}
        <div className="flex items-center justify-center gap-8 mt-6 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>500+ Shipped Products</span>
          </div>
          <div>•</div>
          <div>$1.2M+ Combined MRR</div>
          <div>•</div>
          <div>100% Vercel & Supabase Native</div>
        </div>
      </div>

      {/* Controls & Stack Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Stack filter tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {['all', 'Vercel AI SDK', 'SignalWire', 'Supabase', 'HyperFrames', 'Stripe'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              {tag === 'all' ? 'All Stacks' : tag}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search founders, startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-950/70 border border-zinc-800/80 hover:border-cyan-500/40 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-950/20 group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  {item.category}
                </span>
                {item.verified && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-400">{item.mrr}</span>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Founder Credential */}
              <div className="flex items-center gap-2 p-2.5 bg-zinc-900/60 rounded-xl border border-zinc-800/80 mb-4">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-black font-bold text-xs">
                  {item.founder.charAt(0)}
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-zinc-200">{item.founder}</div>
                  <div className="text-[10px] text-zinc-500">Founder & Engineer</div>
                </div>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {item.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
              <button
                onClick={() => setContactFounder(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Connect / CRM</span>
              </button>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Visit Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CRM Lead / Founder Contact Drawer Modal */}
      {contactFounder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Contact {contactFounder.name}</h3>
                <p className="text-xs text-zinc-400">Direct founder outreach & CRM lead intake</p>
              </div>
              <button
                onClick={() => setContactFounder(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-900"
              >
                ✕
              </button>
            </div>

            {inquirySent ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center space-y-2 text-emerald-300">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold">Inquiry Dispatched!</div>
                <p className="text-xs text-emerald-400/80">
                  Your message has been captured into {contactFounder.founder}&apos;s CRM pipeline.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="investor@fund.com or founder@partner.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Message / Partnership Pitch
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="We loved your architecture and would like to talk about partnering or investing..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Lead to CRM</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
