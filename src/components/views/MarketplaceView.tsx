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
  const [installedItems, setInstalledItems] = useState<string[]>([]);

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
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Marketplace Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F7FB] border border-slate-200 text-[#071B3A] text-xs font-semibold mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#2F80ED]" />
          <span>Vetted Architecture & Agent Templates</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#10213F] mb-4">
          The Vibe Coding <span className="text-[#2F80ED]">Marketplace</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-normal">
          Production-grade Next.js 15 starters, SignalWire voice agents, ROSTR v2 harnesses, and
          design systems. Fork, deploy, and scale with institutional confidence.
        </p>

        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-8 p-4 bg-[#F4F7FB] rounded-2xl border border-slate-200">
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#10213F] font-mono">120+</div>
            <div className="text-[11px] text-slate-500 font-medium">Vetted Starters</div>
          </div>
          <div className="border-x border-slate-200">
            <div className="text-xl sm:text-2xl font-black text-[#2F80ED] font-mono">48.2k</div>
            <div className="text-[11px] text-slate-500 font-medium">Active Forks</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#34D399] font-mono">100%</div>
            <div className="text-[11px] text-slate-500 font-medium">Type-Safe</div>
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#071B3A] text-white shadow-sm'
                  : 'bg-[#F4F7FB] hover:bg-slate-200/60 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search templates, tags, stacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F4F7FB] border border-slate-200 rounded-full text-xs text-[#10213F] placeholder-slate-400 focus:outline-none focus:border-[#2F80ED] focus:bg-white transition-all"
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
              className="group bg-white hover:bg-[#F4F7FB] border border-slate-200 hover:border-blue-300 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md relative"
            >
              <div>
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/60 text-[11px] font-mono font-semibold text-[#2F80ED]">
                    {item.badge || item.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-mono font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.rating}</span>
                    <span className="text-slate-400 text-[10px]">({item.downloads})</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#10213F] group-hover:text-[#2F80ED] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Price & Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono font-semibold">License</div>
                  <div className="text-base font-extrabold text-[#10213F] font-mono">
                    ${item.price} <span className="text-[11px] font-normal text-slate-500">one-time</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveItemPreview(item)}
                    className="p-2 rounded-xl bg-[#F4F7FB] hover:bg-slate-200/70 text-slate-600 hover:text-[#10213F] border border-slate-200 transition-colors"
                    title="Live Preview"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleInstall(item)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#071B3A] hover:bg-[#10213F] active:scale-[0.98] text-white font-bold text-xs transition-all shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#34D399]" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-[#2F80ED] font-bold uppercase tracking-wider">
                  {activeItemPreview.category}
                </span>
                <h3 className="text-xl font-bold text-[#10213F] mt-1">{activeItemPreview.title}</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Authored by {activeItemPreview.author}</p>
              </div>
              <button
                onClick={() => setActiveItemPreview(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {activeItemPreview.description}
            </p>

            <div className="p-4 bg-[#F4F7FB] rounded-2xl border border-slate-200 mb-6 space-y-2">
              <div className="text-xs font-bold text-[#10213F]">Included In Deliverable:</div>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Full source code with TypeScript & clean architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Pre-configured Vercel AI SDK runtime + Tool Handlers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>One-click Vercel Deploy button & Supabase schema SQL</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-lg font-black text-[#10213F] font-mono">
                ${activeItemPreview.price}{' '}
                <span className="text-xs text-slate-400 font-normal">Commercial License</span>
              </div>
              <button
                onClick={() => {
                  const item = activeItemPreview;
                  setActiveItemPreview(null);
                  onSelectCheckout(item);
                }}
                className="px-5 py-2.5 bg-[#071B3A] hover:bg-[#10213F] text-white font-bold text-xs rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Proceed to Stripe Checkout</span>
                <ArrowUpRight className="w-4 h-4 text-[#34D399]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
