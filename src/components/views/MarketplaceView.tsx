import React, { useState } from 'react';
import { Search, Filter, Star, Download, Sparkles, ExternalLink, ShoppingBag, Check, Shield, ArrowUpRight } from 'lucide-react';
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
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Marketplace Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vetted Architecture & Agent Templates</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          The Vibe Coding <span className="text-emerald-400">Marketplace</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-400">
          Production-grade Next.js 15 starters, SignalWire voice agents, ROSTR v2 harnesses, and
          design systems. Fork, deploy, and scale from 1 user to millions.
        </p>

        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-8 p-3 bg-zinc-900/60 rounded-2xl border border-zinc-800">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">120+</div>
            <div className="text-[11px] text-zinc-400">Vetted Starters</div>
          </div>
          <div className="border-x border-zinc-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">48.2k</div>
            <div className="text-[11px] text-zinc-400">Active Forks</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">100%</div>
            <div className="text-[11px] text-zinc-400">Type-Safe</div>
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
                  ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search templates, tags, stacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
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
              className="group bg-zinc-950/70 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-emerald-500/50 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-emerald-950/30 relative"
            >
              <div>
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                    {item.badge || item.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.rating}</span>
                    <span className="text-zinc-500 text-[10px]">({item.downloads})</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Price & Actions */}
              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">License</div>
                  <div className="text-base font-extrabold text-white font-mono">
                    ${item.price} <span className="text-[11px] font-normal text-zinc-400">one-time</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveItemPreview(item)}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                    title="Live Preview"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleInstall(item)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] text-black font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  {activeItemPreview.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{activeItemPreview.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">Authored by {activeItemPreview.author}</p>
              </div>
              <button
                onClick={() => setActiveItemPreview(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-900"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              {activeItemPreview.description}
            </p>

            <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 mb-6 space-y-2">
              <div className="text-xs font-bold text-zinc-200">Included In Deliverable:</div>
              <ul className="text-xs text-zinc-400 space-y-1.5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full source code with TypeScript & ESLint configurations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pre-configured Vercel AI SDK 4.0 runtime + Tool Handlers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>One-click Vercel Deploy button & Supabase schema SQL</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <div className="text-lg font-black text-white font-mono">
                ${activeItemPreview.price}{' '}
                <span className="text-xs text-zinc-500 font-normal">Commercial License</span>
              </div>
              <button
                onClick={() => {
                  const item = activeItemPreview;
                  setActiveItemPreview(null);
                  onSelectCheckout(item);
                }}
                className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Proceed to Stripe Checkout</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
