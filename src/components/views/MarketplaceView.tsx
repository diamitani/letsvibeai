import React, { useState } from 'react';
import { Search, Star, Sparkles, ExternalLink, ShoppingBag, Check, ArrowUpRight, ArrowRight } from 'lucide-react';
import { MARKETPLACE_ITEMS } from '../../data/mockData';
import { MarketplaceItem } from '../../types';

interface MarketplaceViewProps {
  onSelectCheckout: (item: MarketplaceItem) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onSelectCheckout }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC] text-left min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#EAE3D9]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-3 shadow-xs">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Commercial Templates & Starters</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#281010] font-heading">
            Vibe Coding <span className="text-[#FA5929]">Marketplace</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#706B67] mt-1 max-w-xl">
            Production-ready React 19 starters, voice agents, and design systems for one-click deployment.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-[#706B67] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search templates & tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#EAE3D9] text-xs text-[#281010] focus:outline-none focus:border-[#FA5929] shadow-2xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 flex-wrap bg-[#EDE7DE] p-1.5 rounded-full border border-[#EAE3D9] mb-8">
        {[
          { id: 'all', label: 'All Catalog' },
          { id: 'templates', label: 'Full SaaS Starters' },
          { id: 'agents', label: 'AI Agent Harnesses' },
          { id: 'skills', label: 'Design Skills' },
          { id: 'prompts', label: 'Instruction Packs' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#281010] text-white shadow-xs'
                : 'text-[#706B67] hover:text-[#281010] hover:bg-white/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-xs flex flex-col justify-between hover:border-[#FA5929] hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FBE1CE] text-[#FA5929]">
                  {item.badge}
                </span>
                <span className="text-sm font-black font-mono text-[#281010]">
                  ${item.price}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#281010] font-heading mb-1.5">{item.title}</h3>
              <p className="text-xs text-[#706B67] leading-relaxed mb-4">{item.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F8F3EC] text-[#706B67]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between">
              <button
                onClick={() => onSelectCheckout(item)}
                className="w-full py-2.5 rounded-full bg-[#FA5929] hover:bg-[#E0491B] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Deploy Starter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
