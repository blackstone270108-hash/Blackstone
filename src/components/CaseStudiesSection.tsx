import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';

export default function CaseStudiesSection() {
  const [activeStudyId, setActiveStudyId] = useState<string>(CASE_STUDIES[0].id);

  const activeStudy = CASE_STUDIES.find(cs => cs.id === activeStudyId) || CASE_STUDIES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" id="case-studies-page">
      {/* Header */}
      <div className="text-left max-w-2xl space-y-3" id="case-studies-header">
        <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">In-Depth Growth Blueprints</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-900 tracking-tight">Our Case Studies</h1>
        <p className="text-base text-brand-500">
          We analyze deep funnel bottlenecks, re-engineer digital assets, and optimize paid bids. Here is the step-by-step breakdown of how we achieved record returns for our clients.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="case-studies-selectors">
        {CASE_STUDIES.map((study) => (
          <button
            key={study.id}
            onClick={() => setActiveStudyId(study.id)}
            className={`text-left p-6 rounded-xl border transition-all ${
              activeStudyId === study.id
                ? 'bg-brand-900 text-white border-brand-900 shadow-md'
                : 'bg-white text-brand-900 border-brand-200 hover:border-brand-400'
            }`}
            id={`cs-tab-${study.id}`}
          >
            <span className="block text-[10px] tracking-widest text-blackstone-gold font-mono uppercase font-bold mb-1">
              {study.client} Case Study
            </span>
            <h3 className="font-display font-bold text-lg leading-snug">{study.title}</h3>
          </button>
        ))}
      </div>

      {/* Detailed Report Case Study Breakdown */}
      <div className="bg-white border border-brand-200 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 text-left" id="cs-detailed-report">
        {/* Left Side: Text breakdown (8 cols) */}
        <div className="lg:col-span-8 p-8 lg:p-12 space-y-8">
          <div className="space-y-1">
            <span className="text-xs text-blackstone-gold font-mono uppercase tracking-wider font-bold">Deep Dive Analysis</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-900">{activeStudy.title}</h2>
            <span className="text-xs text-brand-400 font-semibold block">Partner: {activeStudy.client}</span>
          </div>

          {/* Grid Blocks */}
          <div className="space-y-6">
            {/* Overview */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-blackstone-gold">1. Client Overview</h3>
              <p className="text-sm text-brand-500 leading-relaxed">{activeStudy.overview}</p>
            </div>

            {/* The Challenge */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-500">2. The Challenge (Problem)</h3>
              <p className="text-sm text-brand-500 leading-relaxed bg-red-50/30 p-4 border-l-4 border-red-500 rounded-r-lg">{activeStudy.problem}</p>
            </div>

            {/* Strategy */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-900">3. Growth Strategy</h3>
              <p className="text-sm text-brand-500 leading-relaxed">{activeStudy.strategy}</p>
            </div>

            {/* Execution */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-900">4. Tactical Execution</h3>
              <p className="text-sm text-brand-500 leading-relaxed border-l-4 border-brand-900 bg-brand-50/50 p-4 rounded-r-lg">{activeStudy.execution}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Performance Analytics & Audited Results (4 cols) */}
        <div className="lg:col-span-4 bg-brand-900 text-white p-8 lg:p-12 flex flex-col justify-between space-y-8 border-t lg:border-t-0 lg:border-l border-blackstone-gold/20">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
              <Sparkles className="w-5 h-5 text-blackstone-gold" />
              <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">Audited Performance</h3>
            </div>

            {/* Stats list */}
            <div className="space-y-6">
              {activeStudy.stats.map((stat, i) => (
                <div key={i} className="border-b border-white/10 pb-4 last:border-b-0">
                  <span className="block text-[10px] font-mono text-brand-300 uppercase tracking-widest">{stat.label}</span>
                  <span className="font-display font-extrabold text-3xl text-blackstone-gold block mt-1">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-white">Key Attributable Outcomes</h4>
            <ul className="space-y-2 text-xs text-brand-200">
              {activeStudy.results.map((res, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0"></span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
