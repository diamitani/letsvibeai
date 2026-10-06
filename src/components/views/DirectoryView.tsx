import React, { useState } from 'react';
import { Search, Compass, CheckCircle2, ExternalLink, Mail, Send } from 'lucide-react';
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
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC] text-left">
      {/* Directory Hero */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-4 shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#FA5929]" />
          <span>Vetted Alumni & Startups</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#281010] mb-4">
          Built with <span className="text-[#FA5929]">LetsVibeAI</span>
        </h1>
        <p className="text-base sm:text-lg text-[#706B67] font-normal">
          Discover verified startups, AI agents, and tools built by alumni and teams
          using the Vercel AI Suite & ROSTR architectural framework.
        </p>

        {/* Global Directory Stats */}
        <div className="flex items-center justify-center gap-8 mt-6 text-xs text-[#706B67] font-mono font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FA5929] animate-pulse" />
            <span className="text-[#281010] font-bold">500+ Shipped Products</span>
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
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-[#281010] text-white shadow-sm'
                  : 'bg-white hover:bg-[#FBE1CE] text-[#281010] border border-[#EAE3D9]'
              }`}
            >
              {tag === 'all' ? 'All Stacks' : tag}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#706B67] absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search founders, startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#EAE3D9] rounded-full text-xs text-[#281010] placeholder-[#706B67] focus:outline-none focus:border-[#FA5929] transition-all shadow-2xs font-sans"
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#EAE3D9] hover:border-[#FA5929]/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono text-[#706B67] uppercase tracking-wider font-semibold">
                  {item.category}
                </span>
                {item.verified && (
                  <span className="flex items-center gap-1 text-[11px] text-[#FA5929] bg-[#FBE1CE] px-3 py-0.5 rounded-full border border-[#FCAA91]/60 font-mono font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#FA5929]" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-xl font-bold font-display text-[#281010] group-hover:text-[#FA5929] transition-colors">
                  {item.name}
                </h3>
                <span className="text-xs font-mono font-bold text-[#FA5929]">{item.mrr}</span>
              </div>

              <p className="text-xs text-[#706B67] line-clamp-3 mb-4 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Founder Credential */}
              <div className="flex items-center gap-2 p-3 bg-[#F8F3EC] rounded-2xl border border-[#EAE3D9] mb-4">
                <div className="w-7 h-7 rounded-full bg-[#281010] text-white flex items-center justify-center font-bold text-xs">
                  {item.founder.charAt(0)}
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-[#281010]">{item.founder}</div>
                  <div className="text-[10px] text-[#706B67]">Founder & Engineer</div>
                </div>
              </div>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {item.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-full bg-[#F8F3EC] border border-[#EAE3D9] text-[10px] font-mono text-[#706B67]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
              <button
                onClick={() => setContactFounder(item)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-[#281010] bg-[#F8F3EC] hover:bg-[#FBE1CE] rounded-full border border-[#EAE3D9] transition-colors font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-[#FA5929]" />
                <span>Connect / CRM</span>
              </button>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-bold text-[#FA5929] hover:text-[#E0491B] group-hover:translate-x-0.5 transition-transform"
              >
                <span>Visit App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CRM Lead / Founder Contact Drawer Modal */}
      {contactFounder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281010]/60 backdrop-blur-sm">
          <div className="bg-white border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-[#281010]">Contact {contactFounder.name}</h3>
                <p className="text-xs text-[#706B67]">Direct founder outreach & CRM intake</p>
              </div>
              <button
                onClick={() => setContactFounder(null)}
                className="p-2 text-[#706B67] hover:text-[#281010] rounded-full bg-[#F8F3EC]"
              >
                ✕
              </button>
            </div>

            {inquirySent ? (
              <div className="p-6 bg-[#FBE1CE] border border-[#FCAA91]/60 rounded-2xl text-center space-y-2 text-[#281010]">
                <CheckCircle2 className="w-8 h-8 text-[#FA5929] mx-auto" />
                <div className="text-sm font-bold">Inquiry Dispatched!</div>
                <p className="text-xs text-[#706B67]">
                  Your message has been captured into {contactFounder.founder}&apos;s CRM pipeline.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#281010] mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="investor@fund.com or founder@partner.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs text-[#281010] placeholder-[#706B67] focus:outline-none focus:border-[#FA5929]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#281010] mb-1">
                    Message / Partnership Pitch
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="We loved your architecture and would like to talk about partnering or investing..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-4 py-2 bg-[#F8F3EC] border border-[#EAE3D9] rounded-2xl text-xs text-[#281010] placeholder-[#706B67] focus:outline-none focus:border-[#FA5929] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#FA5929] hover:bg-[#E0491B] text-white font-bold text-xs rounded-full shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
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
