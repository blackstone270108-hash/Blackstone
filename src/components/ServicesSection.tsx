import React, { useState } from 'react';
import { Search, MousePointerClick, Share2, FileText, Code, CheckCircle, HelpCircle, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface ServicesSectionProps {
  setCurrentView: (view: string) => void;
}

export default function ServicesSection({ setCurrentView }: ServicesSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);

  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  // Helper to render icon based on string name
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className={className} />;
      case 'MousePointerClick':
        return <MousePointerClick className={className} />;
      case 'Share2':
        return <Share2 className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'Code':
        return <Code className={className} />;
      default:
        return <Search className={className} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" id="services-page">
      {/* Title Header */}
      <div className="text-left max-w-2xl space-y-3" id="services-header">
        <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">Elite Performance Suite</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-900 tracking-tight">Our Marketing Solutions</h1>
        <p className="text-base text-brand-500">
          We engineer organic traffic dominance and conversion-focused paid advertising channels. Choose a service below to view our detailed methodology.
        </p>
      </div>

      {/* Main Interactive Dual-Pane Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="services-interactive-grid">
        {/* Left Side: Service Tabs */}
        <div className="lg:col-span-4 space-y-3" id="services-sidebar">
          {SERVICES.map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`w-full text-left p-6 rounded-xl border transition-all flex items-start space-x-4 ${
                  isSelected
                    ? 'bg-brand-900 text-white border-brand-900 shadow-md'
                    : 'bg-white text-brand-900 border-brand-200 hover:border-brand-400 hover:bg-brand-50/50'
                }`}
                id={`service-tab-${service.id}`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/15 text-blackstone-gold' : 'bg-brand-50 text-brand-900'}`}>
                  {renderIcon(service.icon, 'w-6 h-6')}
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base">{service.name}</h3>
                  <p className={`text-xs ${isSelected ? 'text-brand-200' : 'text-brand-500'} line-clamp-1`}>
                    {service.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Service Detail Presentation */}
        <div className="lg:col-span-8 bg-white border border-brand-200 rounded-2xl p-8 lg:p-10 shadow-sm space-y-8 text-left" id="service-detail-panel">
          {/* Header */}
          <div className="border-b border-brand-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <span className="text-[10px] tracking-widest text-blackstone-gold font-mono uppercase font-semibold">Core Capability</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-900">{selectedService.name}</h2>
            </div>
            <div className="bg-brand-50 px-4 py-2 rounded-md border border-brand-200 text-brand-900 font-mono text-xs font-semibold">
              {selectedService.pricing}
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-blackstone-gold">Overview</h3>
            <p className="text-sm text-brand-500 leading-relaxed">{selectedService.longDesc}</p>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-blackstone-gold">Key Client Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedService.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 bg-brand-50/50 p-4 rounded-lg border border-brand-100">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-brand-600 leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Timeline */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-blackstone-gold">Our Execution Process</h3>
            <div className="space-y-3">
              {selectedService.process.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-brand-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium text-brand-800">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-4 border-t border-brand-100 pt-6">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-blackstone-gold flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-blackstone-gold" />
              <span>Service FAQs</span>
            </h3>
            <div className="space-y-4">
              {selectedService.faq.map((item, idx) => (
                <div key={idx} className="space-y-1 bg-brand-50/30 p-4 rounded-lg border border-brand-200">
                  <h4 className="font-display font-semibold text-sm text-brand-900">Q: {item.q}</h4>
                  <p className="text-xs text-brand-500 leading-relaxed">A: {item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-brand-900 text-white rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-display font-bold text-base text-white">Let's audit your {selectedService.name.split(' (')[0]} setup</h4>
              <p className="text-xs text-brand-200">Discuss custom strategy, performance targets, and KPIs.</p>
            </div>
            <button
              onClick={() => setCurrentView('contact')}
              className="px-6 py-3 bg-blackstone-gold hover:bg-blackstone-gold/90 text-brand-900 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
              id="service-pricing-cta-btn"
            >
              <span>Request Quote</span>
              <ArrowUpRight className="w-4 h-4 text-brand-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
