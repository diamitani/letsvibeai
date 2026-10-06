import React, { useState } from 'react';
import { Search, Star, Sparkles, ExternalLink, ShoppingBag, Check, ArrowUpRight } from 'lucide-react';
import { MARKETPLACE_ITEMS } from '../../data/mockData';
import { MarketplaceItem } from '../../types';

interface MarketplaceViewProps {
  onSelectCheckout: (item: MarketplaceItem) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onSelectCheckout }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItemPreview, setActiveItemPreview] = useState<MarketplaceItem | null>(null);
  const [installedItems] = useState<string[]>([]);

  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleInstall = (item: MarketplaceItem) => {
    if (installedItems.includes(item.id)) return;
    onSelectCheckout(item);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8F3EC] text-left">
      {/* Marketplace Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[#FA5929] text-xs font-bold mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FA5929]" />
          <span>Vetted Architecture & Agent Templates</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#281010] mb-4">
          The Vibe Coding <span className="text-[#FA5929]">Marketplace</span>
        </h1>
        <p className="text-base sm:text-lg text-[#706B67] font-normal">
          Production-grade Next.js 15 starters, SignalWire voice agents, ROSTR v2 harnesses, and
          design systems. Fork, deploy, and scale with institutional confidence.
        </p>

        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-8 p-4 bg-white rounded-3xl border border-[#EAE3D9] shadow-xs">
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#281010] font-mono">120+</div>
            <div className="text-[11px] text-[#706B67] font-medium">Vetted Starters</div>
          </div>
          <div className="border-x border-[#EAE3D9]">
            <div className="text-xl sm:text-2xl font-black text-[#FA5929] font-mono">48.2k</div>
            <div className="text-[11px] text-[#706B67] font-medium">Active Forks</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#281010] font-mono">100%</div>
            <div className="text-[11px] text-[#706B67] font-medium">Type-Safe</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Catalog' },
            { id: 'templates', label: 'Full SaaS Starters' },
            { id: 'agents', label: 'AI Agent Harnesses' },
            { id: 'skills', label: 'Design Skills' },
            { id: 'prompts', label: '11-Doc Prompts' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#281010] text-white shadow-sm'
                  : 'bg-white hover:bg-[#FBE1CE] text-[#281010] border border-[#EAE3D9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#706B67] absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search templates, tags, stacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#EAE3D9] rounded-full text-xs text-[#281010] placeholder-[#706B67] focus:outline-none focus:border-[#FA5929] transition-all shadow-2xs font-sans"
          />
        </div>
      </div>

      {/* Marketplace Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isInstalled = installedItems.includes(item.id);
          return (
            <div
              key={item.id}
              className="group bg-white border border-[#EAE3D9] hover:border-[#FA5929]/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md relative"
            >
              <div>
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-[#FBE1CE] border border-[#FCAA91]/60 text-[11px] font-mono font-bold text-[#FA5929]">
                    {item.badge || item.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-[#FEBF03] text-xs font-mono font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.rating}</span>
                    <span className="text-[#706B67] text-[10px]">({item.downloads})</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#281010] group-hover:text-[#FA5929] transition-colors mb-2 font-display">
                  {item.title}
                </h3>
                <p className="text-xs text-[#706B67] line-clamp-3 mb-4 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-[#F8F3EC] border border-[#EAE3D9] text-[10px] font-mono text-[#706B67]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Price & Actions */}
              <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#706B67] uppercase tracking-wider font-mono font-semibold">License</div>
                  <div className="text-base font-black text-[#281010] font-mono">
                    ${item.price} <span className="text-[11px] font-normal text-[#706B67]">one-time</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveItemPreview(item)}
                    className="p-2 rounded-full bg-[#F8F3EC] hover:bg-[#FBE1CE] text-[#281010] border border-[#EAE3D9] transition-colors"
                    title="Live Preview"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleInstall(item)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FA5929] hover:bg-[#E0491B] active:scale-[0.98] text-white font-bold text-xs transition-all shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-white" />
                    <span>{isInstalled ? 'Installed' : 'Deploy'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Detail / Preview Modal */}
      {activeItemPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#281010]/60 backdrop-blur-sm">
          <div className="bg-white border border-[#EAE3D9] rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-[#FA5929] font-bold uppercase tracking-wider">
                  {activeItemPreview.category}
                </span>
                <h3 className="text-xl font-bold font-display text-[#281010] mt-1">{activeItemPreview.title}</h3>
                <p className="text-xs text-[#706B67] mt-1 font-medium">Authored by {activeItemPreview.author}</p>
              </div>
              <button
                onClick={() => setActiveItemPreview(null)}
                className="p-2 text-[#706B67] hover:text-[#281010] rounded-full bg-[#F8F3EC]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#706B67] leading-relaxed mb-6">
              {activeItemPreview.description}
            </p>

            <div className="p-5 bg-[#F8F3EC] rounded-3xl border border-[#EAE3D9] mb-6 space-y-2">
              <div className="text-xs font-bold text-[#281010]">Included In Deliverable:</div>
              <ul className="text-xs text-[#706B67] space-y-1.5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FA5929]" />
                  <span>Full source code with TypeScript & clean architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FA5929]" />
                  <span>Pre-configured Vercel AI SDK runtime + Tool Handlers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FA5929]" />
                  <span>One-click Vercel Deploy button & Supabase schema SQL</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EAE3D9]">
              <div className="text-lg font-black text-[#281010] font-mono">
                ${activeItemPreview.price}{' '}
                <span className="text-xs text-[#706B67] font-normal">Commercial License</span>
              </div>
              <button
                onClick={() => {
                  const item = activeItemPreview;
                  setActiveItemPreview(null);
                  onSelectCheckout(item);
                }}
                className="px-6 py-2.5 bg-[#FA5929] hover:bg-[#E0491B] text-white font-bold text-xs rounded-full shadow-md active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Proceed to Stripe Checkout</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
