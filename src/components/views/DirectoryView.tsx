import React, { useState } from 'react';
import { Search, Compass, CheckCircle2, ExternalLink, Mail, Send } from 'lucide-react';
import { DIRECTORY_LISTINGS } from '../../data/mockData';
import { DirectoryListing } from '../../types';

export const DirectoryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [contactFounder, setContactFounder] = useState<DirectoryListing | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
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
      setInquiryEmail('');
    }, 1800);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC] text-left min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>Alumni & Production Startups</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Built with <span className="text-[#FA5929]">LetsVibeAI</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#706B67] mt-1 max-w-xl">
            Discover verified SaaS products, agent harnesses, and voice platforms built by alumni.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-[#706B67] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search alumni & startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-2xs"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs flex flex-col justify-between hover:border-[#FA5929] hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929]">
                  {item.category}
                </span>
                <span className="text-xs font-mono font-bold text-[#34D399]">
                  {item.mrr}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#281010] font-heading mb-1.5">{item.name}</h3>
              <p className="text-xs text-[#706B67] leading-relaxed mb-4">{item.description}</p>

              <div className="text-xs text-[#706B67] mb-4">
                Founder: <strong className="text-[#281010]">{item.founder}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between text-xs font-mono">
              <a
                href={`https://${item.url}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#FA5929] hover:underline flex items-center gap-1 font-bold"
              >
                <span>{item.url}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setContactFounder(item)}
                className="px-3 py-1.5 rounded-full bg-[#F8F3EC] text-[#281010] hover:bg-[#EDE7DE] font-bold border border-[#EAE3D9]"
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
