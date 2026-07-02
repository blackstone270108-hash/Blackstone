import React, { useState } from 'react';
import { Check, ArrowUpRight, DollarSign, Calculator } from 'lucide-react';
import { Lead } from '../types';

interface PricingSectionProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
}

export default function PricingSection({ onAddLead }: PricingSectionProps) {
  // Packages definitions
  const packages = [
    {
      name: 'Starter Growth',
      price: '₹1,30,000',
      period: 'month',
      desc: 'Perfect for local businesses and early-stage startups seeking to establish an organic search presence.',
      features: [
        'Dedicated On-Page & Technical SEO',
        '2 Expert Content Marketing Articles / mo',
        'Basic Social Media Scheduling',
        'Monthly PDF Traffic Report',
        'Email Support (24hr response)'
      ]
    },
    {
      name: 'Professional Scale',
      price: '₹2,50,000',
      period: 'month',
      desc: 'Our most popular tier. Designed for rapidly scaling SaaS, fintech, and e-commerce brands looking to expand market share.',
      features: [
        'Full Technical & On-page SEO',
        'Google Ads & Meta Ads Funnel Setup',
        '4 Expert Blog / Content Articles / mo',
        'Dedicated Strategist Communication',
        'Access to Live Client Portal Dashboard',
        'Bi-weekly Strategy Call & Growth Audits'
      ],
      popular: true
    },
    {
      name: 'Enterprise Domination',
      price: '₹4,50,000',
      period: 'month',
      desc: 'A complete marketing department in your court. Best for established brands aiming to dominate organic search and paid channels.',
      features: [
        'All SEO & Paid PPC Funnel Management',
        'Premium Headless React Website (Free Setup)',
        '8 Expert Content Articles & Digital PR pitches / mo',
        'Multi-variant Landing Page A/B Testing',
        '24/7 Slack Portal & dedicated Lead Account Manager',
        'Weekly Video Performance Reviews'
      ]
    }
  ];

  // Custom Quote Builder State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customBudget, setCustomBudget] = useState<string>('₹3,50,000 - ₹7,50,000');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleCustomQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onAddLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      budget: customBudget,
      servicesNeeded: selectedServices.length > 0 ? selectedServices : ['Custom Strategic Services'],
      message: formData.message || `Custom proposal requested via pricing builder. Selected budget: ${customBudget}`
    });

    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    setSelectedServices([]);
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 animate-fade-in" id="pricing-page">
      {/* Header */}
      <div className="text-left max-w-2xl space-y-3" id="pricing-header">
        <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">Predictable, Clear Packages</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-900 tracking-tight">Transparent Retainer Tiers</h1>
        <p className="text-base text-brand-500">
          No hidden fees or percentage-only traps. Select a package that matches your current pipeline velocity or build your own custom campaign.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="pricing-packages-grid">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`bg-white rounded-2xl border p-8 text-left flex flex-col justify-between relative transition-all ${
              pkg.popular
                ? 'border-brand-900 ring-2 ring-brand-900 shadow-md'
                : 'border-brand-200 hover:border-brand-400 shadow-sm'
            }`}
            id={`pricing-package-card-${pkg.name.toLowerCase().replace(' ', '-')}`}
          >
            {pkg.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-900 text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                Most Popular Partner Choice
              </span>
            )}

            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-brand-900">{pkg.name}</h3>
                <p className="text-xs text-brand-400">{pkg.desc}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-1.5">
                <span className="font-display font-extrabold text-4xl text-brand-900">{pkg.price}</span>
                <span className="text-xs text-brand-500 font-medium">/ {pkg.period}</span>
              </div>

              {/* Features list */}
              <ul className="space-y-3 border-t border-brand-100 pt-6">
                {pkg.features.map((feat) => (
                  <li key={feat} className="text-xs text-brand-600 flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                const element = document.getElementById('custom-quote-builder');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full mt-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-center transition-colors ${
                pkg.popular
                  ? 'bg-brand-900 text-white hover:bg-blackstone-dark'
                  : 'bg-brand-50 text-brand-900 hover:bg-brand-100 border border-brand-200'
              }`}
              id={`pkg-select-btn-${pkg.name.toLowerCase().replace(' ', '-')}`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* Custom Quote Builder Section */}
      <section
        className="bg-brand-900 text-white rounded-2xl p-8 lg:p-12 border border-blackstone-gold/20 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12"
        id="custom-quote-builder"
      >
        {/* Left column: Builder selectors (7 cols) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-blackstone-gold text-xs font-mono">
              <Calculator className="w-3.5 h-3.5 text-blackstone-gold" />
              <span>Interactive Quote Architect</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl">Architect a Custom Growth Campaign</h2>
            <p className="text-sm text-brand-200 leading-relaxed">
              Select the exact capabilities your scale-up requires. We will construct a custom proposal and reach out with a direct pipeline analysis.
            </p>
          </div>

          {/* Services Checklist */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-blackstone-gold">1. Services Needed</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['SEO Strategy', 'PPC Management', 'Social Media SMM', 'Content Marketing', 'React Web Development', 'Brand Strategy', 'Email Marketing'].map((service) => {
                const isChecked = selectedServices.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`flex items-center space-x-3 p-4 rounded-xl border text-left transition-all ${
                      isChecked
                        ? 'bg-white text-brand-900 border-white font-bold'
                        : 'bg-white/5 border-white/15 text-brand-200 hover:bg-white/10'
                    }`}
                    id={`custom-service-chk-${service.toLowerCase().replace(' ', '-')}`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-brand-900 border-brand-900 text-white' : 'border-white/40'}`}>
                      {isChecked && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-xs">{service}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Selector */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-blackstone-gold">2. Intended Monthly Budget Range</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['<₹1,50,000', '₹1,50,000 - ₹3,50,000', '₹3,50,000 - ₹7,50,000', '₹7,50,000+'].map((budget) => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => setCustomBudget(budget)}
                  className={`py-3 px-4 rounded-lg text-xs font-semibold text-center border transition-all ${
                    customBudget === budget
                      ? 'bg-blackstone-gold text-brand-900 border-blackstone-gold'
                      : 'bg-white/5 border-white/15 text-brand-200 hover:bg-white/10'
                  }`}
                  id={`custom-budget-opt-${budget.replace(/[^a-zA-Z0-9]/g, '')}`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Lead Info form (5 cols) */}
        <div className="lg:col-span-5 bg-white text-brand-900 p-8 rounded-xl border border-brand-200 shadow-lg text-left">
          <h3 className="font-display font-bold text-lg text-brand-900 mb-6 pb-2 border-b border-brand-100">3. Contact & Business Details</h3>
          {submitted ? (
            <div className="py-12 text-center space-y-4" id="custom-quote-success-banner">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-xl">Proposal Submitted!</h4>
              <p className="text-xs text-brand-500 max-w-xs mx-auto leading-relaxed">
                Thank you. We have recorded your custom campaign request. Our analytics team will review your requirements and reach out within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCustomQuoteSubmit} className="space-y-4" id="custom-quote-form">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                  id="custom-quote-name-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="custom-quote-email-input"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="555-019-3211"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="custom-quote-phone-input"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Company Name</label>
                <input
                  type="text"
                  placeholder="SwiftCart Co."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                  id="custom-quote-company-input"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Growth Objectives / Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Redesign site, scale organic signups, optimize Meta spend CPA..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900 resize-none"
                  id="custom-quote-message-input"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-900 hover:bg-blackstone-dark text-white text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center space-x-2 transition-colors"
                id="custom-quote-submit-btn"
              >
                <span>Request Custom Blueprint</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
