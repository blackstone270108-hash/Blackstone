import React from 'react';
import { ArrowUpRight, TrendingUp, Award, Users, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS, PORTFOLIO_ITEMS } from '../data';

interface HeroProps {
  setCurrentView: (view: string) => void;
}

export default function Hero({ setCurrentView }: HeroProps) {
  const logos = ['Stripe', 'Helix Logistics', 'SwiftCart', 'AuraPay', 'Zenith Ventures', 'Supabase'];

  return (
    <div className="space-y-24 pb-20" id="homepage-container">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-12 md:pt-24 lg:pt-32" id="hero-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left z-10" id="hero-content">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-blackstone-gold/10 text-brand-900 px-3 py-1.5 rounded-full border border-blackstone-gold/20"
              >
                <TrendingUp className="w-4 h-4 text-blackstone-gold" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">Elite Growth Partners</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]"
              >
                Predictable Growth. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2d1a6] to-blackstone-gold italic font-serif font-normal">
                  Unrivaled Performance.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-brand-500 max-w-xl leading-relaxed"
              >
                We build hyper-scalable paid search/social funnels and rank you #1 organically on search engines. Zero guesswork. Only transparent, audited revenue pipelines.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
              >
                <button
                  onClick={() => setCurrentView('contact')}
                  className="px-8 py-4 bg-blackstone-gold hover:bg-blackstone-gold/90 text-brand-900 font-bold rounded-lg flex items-center justify-center space-x-2 transition-all shadow-md group"
                  id="hero-request-proposal-btn"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button
                  onClick={() => setCurrentView('services')}
                  className="px-8 py-4 bg-brand-100 hover:bg-brand-200/50 text-white border border-brand-200 font-semibold rounded-lg flex items-center justify-center transition-all"
                  id="hero-explore-services-btn"
                >
                  <span>Explore Services</span>
                </button>
              </motion.div>

              {/* Key Highlights */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-6 pt-6 border-t border-brand-200"
              >
                <div>
                  <span className="block font-display font-bold text-2xl text-brand-900">4.8x</span>
                  <span className="text-xs text-brand-500">Average ROAS</span>
                </div>
                <div>
                  <span className="block font-display font-bold text-2xl text-brand-900">+245%</span>
                  <span className="text-xs text-brand-500">Organic SGE Traffic</span>
                </div>
                <div>
                  <span className="block font-display font-bold text-2xl text-brand-900">$12M+</span>
                  <span className="text-xs text-brand-500">Client Revenue Sourced</span>
                </div>
              </motion.div>
            </div>

            {/* Right Abstract Visual */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end" id="hero-graphics">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-sm aspect-square bg-gradient-to-br from-brand-900 to-blackstone-dark rounded-2xl p-8 flex flex-col justify-between text-white shadow-2xl border border-white/10"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest text-blackstone-gold font-mono uppercase">Blackstone Analytics</span>
                    <h3 className="font-display font-bold text-xl">Conversion Index</h3>
                  </div>
                  <div className="p-2 bg-white/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blackstone-gold" />
                  </div>
                </div>

                <div className="my-auto py-6 space-y-4">
                  <div className="flex justify-between items-end border-b border-white/10 pb-2">
                    <span className="text-xs text-brand-200">Customer Lifetime Value</span>
                    <span className="font-mono text-sm text-green-400 font-semibold">+312%</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-2">
                    <span className="text-xs text-brand-200">Cost Per Acquisition</span>
                    <span className="font-mono text-sm text-green-400 font-semibold">-42%</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-brand-200">Search Presence Index</span>
                    <span className="font-mono text-sm text-green-400 font-semibold">Rank #1</span>
                  </div>
                </div>

                <div className="text-xs text-brand-200/60 font-mono flex justify-between">
                  <span>SYSTEM ACTIVE</span>
                  <span>UTC/2026</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="bg-brand-50 py-8 border-y border-brand-200" id="client-logos-ticker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center font-mono text-[10px] uppercase tracking-widest text-brand-500 font-semibold mb-6">
            Trusted by fast-growing digital scale-ups and industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
            {logos.map((logo, index) => (
              <span key={index} className="font-display font-bold text-lg text-brand-900 tracking-tight">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="services-overview">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">Comprehensive Capabilities</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900">How We Scale Your Revenue</h2>
          <p className="text-sm text-brand-500">
            We focus strictly on the services that create predictable, compounding revenue and enterprise value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SEO card */}
          <div className="bg-white p-8 rounded-xl border border-brand-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 bg-brand-900 rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">1</div>
            <h3 className="font-display font-bold text-lg text-brand-900">High-Intent Organic SEO</h3>
            <p className="text-xs text-brand-500 leading-relaxed">
              Dominate competitive terms, capture long-tail user intents, and establish unbreakable ranking authority.
            </p>
            <button onClick={() => setCurrentView('services')} className="text-xs font-bold text-brand-900 flex items-center space-x-1 hover:text-blackstone-gold transition-colors">
              <span>View Process</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PPC card */}
          <div className="bg-white p-8 rounded-xl border border-brand-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 bg-brand-900 rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">2</div>
            <h3 className="font-display font-bold text-lg text-brand-900">ROI-Centered Paid Media</h3>
            <p className="text-xs text-brand-500 leading-relaxed">
              Deploy optimized paid search, social, and display funnels that consistently generate sub-CPA target acquisitions.
            </p>
            <button onClick={() => setCurrentView('services')} className="text-xs font-bold text-brand-900 flex items-center space-x-1 hover:text-blackstone-gold transition-colors">
              <span>View Channels</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* WebDev card */}
          <div className="bg-white p-8 rounded-xl border border-brand-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 bg-brand-900 rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">3</div>
            <h3 className="font-display font-bold text-lg text-brand-900">High-Speed Headless WebDev</h3>
            <p className="text-xs text-brand-500 leading-relaxed">
              Launch lightning-fast, secure, fully search-optimized custom React sites built to capture leads immediately.
            </p>
            <button onClick={() => setCurrentView('services')} className="text-xs font-bold text-brand-900 flex items-center space-x-1 hover:text-blackstone-gold transition-colors">
              <span>View Tech Stack</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-brand-900 text-white py-20 border-y border-blackstone-gold/20" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">The Blackstone Standard</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl">Why Top-Tier Brands Retain Our Services</h2>
            <p className="text-sm text-brand-200 leading-relaxed">
              We operate as an extension of your board. We don't report vanity "clicks" or "impressions" — we track qualified customer acquisitions, pipeline value, and direct cashflow ROI.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blackstone-gold" />
                <h4 className="font-display font-bold text-base">Client Portal Access</h4>
              </div>
              <p className="text-xs text-brand-200 leading-relaxed">
                Track live deliverables, read weekly audits, view invoices, and message your dedicated strategist in real-time.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blackstone-gold" />
                <h4 className="font-display font-bold text-base">E-E-A-T Content Purity</h4>
              </div>
              <p className="text-xs text-brand-200 leading-relaxed">
                Expert copywriters and industry experts author every guide to satisfy Google SGE\'s strict experience guidelines.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blackstone-gold" />
                <h4 className="font-display font-bold text-base">In-House Technical Engineering</h4>
              </div>
              <p className="text-xs text-brand-200 leading-relaxed">
                No slow template builders. We code custom, blazingly fast headless React and Next.js digital systems.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blackstone-gold" />
                <h4 className="font-display font-bold text-base">Performance-Guaranteed Testing</h4>
              </div>
              <p className="text-xs text-brand-200 leading-relaxed">
                Continuous weekly A/B ad creative and landing-page multivariate tests to maintain downward pressure on CPAs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="portfolio-preview-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2 text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">Featured Audits</span>
            <h2 className="font-display font-extrabold text-3xl">Recent Success Stories</h2>
          </div>
          <button
            onClick={() => setCurrentView('portfolio')}
            className="px-6 py-3 border border-brand-300 hover:border-brand-900 rounded-lg text-sm font-semibold text-brand-900 transition-colors flex items-center space-x-2"
          >
            <span>View All Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_ITEMS.slice(0, 2).map((item) => (
            <div key={item.id} className="group bg-white rounded-xl border border-brand-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-brand-900 text-white font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded font-semibold">
                  {item.category}
                </span>
              </div>
              <div className="p-6 text-left space-y-4">
                <h3 className="font-display font-bold text-xl text-brand-900">{item.title}</h3>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blackstone-gold font-bold block">Key Audit Metrics</span>
                  <div className="flex flex-wrap gap-2">
                    {item.results.map((res, i) => (
                      <span key={i} className="bg-brand-50 text-brand-900 border border-brand-200 text-xs px-2.5 py-1 rounded-full font-medium">
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel/Grid Section */}
      <section className="bg-brand-50 py-16 border-y border-brand-200" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">True Partnership</span>
            <h2 className="font-display font-extrabold text-3xl">What Growth Directors Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div key={test.id} className="bg-white p-8 rounded-xl border border-brand-200 shadow-sm flex flex-col justify-between text-left space-y-6">
                <p className="text-sm text-brand-500 italic leading-relaxed">
                  "{test.text}"
                </p>
                <div className="flex items-center space-x-3 border-t border-brand-100 pt-4">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-brand-200"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-900">{test.name}</h4>
                    <span className="text-xs text-brand-500">{test.role}, {test.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="footer-cta-banner">
        <div className="bg-gradient-to-r from-brand-900 to-blackstone-dark rounded-2xl p-12 text-center space-y-6 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">Ready for a Technical Marketing Audit?</h2>
            <p className="text-brand-200 max-w-lg mx-auto text-sm leading-relaxed">
              We will conduct a comprehensive keyword gap, technical site performance, and paid advertising leak audit. Completely free.
            </p>
            <button
              onClick={() => setCurrentView('contact')}
              className="px-8 py-4 bg-blackstone-gold hover:bg-blackstone-gold/90 text-brand-900 font-bold rounded-lg inline-flex items-center space-x-2 transition-all"
              id="cta-bottom-request-proposal"
            >
              <span>Get Your Free Growth Audit</span>
              <ArrowUpRight className="w-4 h-4 text-brand-900" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
