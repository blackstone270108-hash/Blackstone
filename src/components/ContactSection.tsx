import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, ArrowUpRight, Compass } from 'lucide-react';
import { Lead } from '../types';

interface ContactSectionProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
}

export default function ContactSection({ onAddLead }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '₹3,50,000 - ₹7,50,000',
    message: ''
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    'SEO Optimization',
    'PPC Advertising',
    'Social Media SMM',
    'Content Marketing',
    'Web Development',
    'Branding Strategy',
    'Email Marketing'
  ];

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onAddLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      budget: formData.budget,
      servicesNeeded: selectedServices.length > 0 ? selectedServices : ['General Strategic Consulting'],
      message: formData.message
    });

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      budget: '₹3,50,000 - ₹7,50,000',
      message: ''
    });
    setSelectedServices([]);
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in" id="contact-page">
      {/* Header */}
      <div className="text-left max-w-2xl space-y-3" id="contact-header">
        <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">Secure Your Consultation</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-900 tracking-tight">Begin Your Growth Journey</h1>
        <p className="text-base text-brand-500">
          Request a complete technical SEO and paid ads performance leak audit. Or discuss custom retainers and campaign plans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-form-row">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-brand-200 p-8 lg:p-10 shadow-sm text-left">
          {submitted ? (
            <div className="py-16 text-center space-y-4" id="contact-success-banner">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-display font-bold text-2xl text-brand-900">Audit Request Transmitted!</h2>
              <p className="text-sm text-brand-500 max-w-sm mx-auto leading-relaxed">
                Thank you. We have recorded your growth requirements. Our managing partners will conduct initial diagnostics and reach out via email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" id="lead-capture-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="contact-name-field"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@aurapay.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="contact-email-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="555-019-3291"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="contact-phone-field"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400">Company Name</label>
                  <input
                    type="text"
                    placeholder="AuraPay SaaS"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="contact-company-field"
                  />
                </div>
              </div>

              {/* Services Checklist */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Services Needed</label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((service) => {
                    const isChecked = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 text-xs rounded-full border transition-all ${
                          isChecked
                            ? 'bg-brand-900 text-white border-brand-900'
                            : 'bg-white text-brand-600 border-brand-200 hover:border-brand-400'
                        }`}
                        id={`contact-svc-btn-${service.toLowerCase().replace(' ', '-')}`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Planned Monthly Marketing Budget</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900 bg-white"
                  id="contact-budget-field"
                >
                  <option value="<₹1,50,000">Less than ₹1,50,000 / mo</option>
                  <option value="₹1,50,000 - ₹3,50,000">₹1,50,000 - ₹3,50,000 / mo</option>
                  <option value="₹3,50,000 - ₹7,50,000">₹3,50,000 - ₹7,50,000 / mo</option>
                  <option value="₹7,50,000+">₹7,50,000+ / mo</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400">Brief Overview of Goals / Context</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your organic conversions, average ad cost per acquisition, or search ranking bottlenecks..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900 resize-none"
                  id="contact-message-field"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-900 hover:bg-blackstone-dark text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                id="contact-submit-btn"
              >
                <span>Schedule Consultation & Audit</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact info & Mock Maps (5 cols) */}
        <div className="lg:col-span-5 space-y-8 text-left" id="contact-info-col">
          {/* Card info */}
          <div className="bg-brand-900 text-white rounded-2xl p-8 border border-blackstone-gold/20 space-y-6">
            <h3 className="font-display font-extrabold text-xl text-white">Direct Channels</h3>
            <p className="text-xs text-brand-200">
              Prefer to reach out directly? Our growth executives monitor these communication lines.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-lg text-blackstone-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-brand-300 uppercase tracking-widest">Call Our Office</span>
                  <span className="text-sm font-semibold block mt-0.5">+91 7982829840</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-lg text-blackstone-gold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-brand-300 uppercase tracking-widest">General Queries</span>
                  <span className="text-sm font-semibold block mt-0.5">blackstoneagency379@gmail.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-lg text-blackstone-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-brand-300 uppercase tracking-widest">Headquarters Location</span>
                  <span className="text-sm font-semibold block mt-0.5">Sector15 A faridabad, haryana</span>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant mock Google Map representation */}
          <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm space-y-4" id="mock-google-map">
            <div className="flex items-center justify-between border-b border-brand-100 pb-3">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-blackstone-gold" />
                <h4 className="font-display font-bold text-sm text-brand-900">Blackstone HQ Map</h4>
              </div>
              <span className="bg-brand-50 px-2 py-0.5 rounded text-[10px] font-mono text-brand-500 font-semibold uppercase">FARIDABAD</span>
            </div>

            {/* Map Placeholder Graphic */}
            <div className="relative h-48 bg-brand-50 rounded-lg overflow-hidden border border-brand-100 flex items-center justify-center">
              {/* Map Lines Mockup */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute w-2/3 h-0.5 bg-brand-200 top-1/3 left-0"></div>
              <div className="absolute w-1/2 h-0.5 bg-brand-200 top-2/3 left-0"></div>
              <div className="absolute h-full w-0.5 bg-brand-200 left-1/3 top-0"></div>
              <div className="absolute h-full w-0.5 bg-brand-200 left-2/3 top-0"></div>

              {/* Pin Accent */}
              <div className="relative z-10 flex flex-col items-center space-y-1">
                <div className="w-6 h-6 bg-brand-900 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
                  <span className="w-2 h-2 bg-blackstone-gold rounded-full"></span>
                </div>
                <span className="bg-brand-900 text-white font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase shadow-md">
                  BLACKSTONE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
