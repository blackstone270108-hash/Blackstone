import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, TrendingUp } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data';
import { PortfolioItem } from '../types';

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'SEO', 'PPC', 'Social Media', 'Web Development'];

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" id="portfolio-page">
      {/* Header */}
      <div className="text-left max-w-2xl space-y-3" id="portfolio-header">
        <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">Client Portfolios & Proofs</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-900 tracking-tight">Our Proven Results</h1>
        <p className="text-base text-brand-500">
          We focus on building hyper-scalable revenue funnels. Explore our portfolio of technical search optimization, digital PR content, and high-converting paid ads.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brand-200 pb-4" id="portfolio-category-filters">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-brand-900 text-white'
                : 'bg-white text-brand-500 hover:text-brand-900 border border-brand-200 hover:bg-brand-50'
            }`}
            id={`portfolio-filter-${category.toLowerCase().replace(' ', '-')}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12" id="portfolio-gallery-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-brand-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between" id={`portfolio-card-${item.id}`}>
            {/* Visual Section */}
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-brand-900 text-white font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded font-semibold">
                {item.category}
              </span>
            </div>

            {/* Metrics and Reviews Section */}
            <div className="p-8 space-y-6 text-left flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest text-blackstone-gold font-mono uppercase font-bold">Client Audit & Result</span>
                  <h2 className="font-display font-extrabold text-2xl text-brand-900">{item.title}</h2>
                  <span className="text-xs text-brand-400 font-medium block">Strategic Client: {item.client}</span>
                </div>

                {/* Before & After comparison */}
                {item.beforeVal && item.afterVal && (
                  <div className="grid grid-cols-2 gap-4 bg-brand-50 p-4 rounded-xl border border-brand-200">
                    <div>
                      <span className="block text-[9px] font-mono text-brand-400 uppercase tracking-widest">Legacy Baseline</span>
                      <span className="font-display font-bold text-sm text-brand-700 line-through">{item.beforeVal}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-blackstone-gold uppercase tracking-widest">Audited Outcome</span>
                      <span className="font-display font-extrabold text-sm text-green-600 flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{item.afterVal}</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Achievements Bullet */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blackstone-gold font-bold block">Key Accomplishments</span>
                  <ul className="space-y-1">
                    {item.results.map((res, i) => (
                      <li key={i} className="text-xs text-brand-600 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blackstone-gold shrink-0"></span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Client review Quote block if exists */}
              {item.clientReview && (
                <div className="border-t border-brand-100 pt-6 space-y-3 bg-brand-50/20 -mx-8 -mb-8 p-8 mt-4">
                  <div className="flex items-center space-x-2 text-brand-900">
                    <MessageSquare className="w-4 h-4 text-blackstone-gold" />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Verified Client Endorsement</span>
                  </div>
                  <p className="text-xs text-brand-500 italic leading-relaxed">
                    "{item.clientReview}"
                  </p>
                  <span className="text-xs text-brand-900 font-display font-semibold block">
                    — {item.reviewerName}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
