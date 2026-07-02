import React from 'react';
import { Award, Target, Eye, ShieldCheck, Star } from 'lucide-react';

export default function AboutSection() {
  const team = [
    {
      name: 'Alexander Sterling',
      role: 'Managing Partner & Co-Founder',
      bio: 'Former growth strategist at Google and Sequoia-backed startups. Oversees portfolio architecture and macro acquisition strategy.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Paid Acquisition',
      bio: 'Managed over $25M in combined client ad spend across search, social, and display channels. Expert in conversion audit loops.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Devon Carter',
      role: 'Head of Organic & Technical Search',
      bio: 'Specialist in crawl budget optimization, structured JSON-LD schema architectures, and E-E-A-T SGE authority formulas.',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
    }
  ];

  const certifications = [
    'Google Premier Partner 2026',
    'Meta Certified Buying Professional',
    'HubSpot Platinum Agency Partner',
    'Yandex Certified Advertising Expert',
    'Semrush Authorized SEO Partner'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 animate-fade-in" id="about-page">
      {/* Header */}
      <div className="text-left max-w-2xl space-y-3" id="about-header">
        <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">The Blackstone Manifesto</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-900 tracking-tight">Our Agency Story</h1>
        <p className="text-base text-brand-500">
          We founded Blackstone with a singular, unyielding mandate: to replace lazy vanity marketing with strict, audited digital revenue pipelines.
        </p>
      </div>

      {/* Story section block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="story-block">
        <div className="lg:col-span-7 space-y-6 text-left">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-900">Built On Absolute Attribution</h2>
          <p className="text-sm text-brand-500 leading-relaxed">
            In 2021, we noticed a critical, systemic rot in the agency landscape. Brands were paying massive retainers to agencies that measured success in "clicks," "impressions," and vague "relevance indicators" while direct conversion rates stagnated.
          </p>
          <p className="text-sm text-brand-500 leading-relaxed">
            Blackstone was engineered to reverse that compromise. We assembled a dedicated squad of frontend React engineers, E-E-A-T expert copywriters, and paid acquisition bidding specialists. We do not use cookie-cutter drag-and-drop templates. We construct blazingly fast custom headless software and back every campaign with direct cashflow accountability.
          </p>
        </div>

        {/* Vision & Mission boxes (5 cols) */}
        <div className="lg:col-span-5 space-y-6" id="mission-vision-boxes">
          {/* Mission */}
          <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm text-left space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-brand-50 rounded-lg text-brand-900">
                <Target className="w-5 h-5 text-blackstone-gold" />
              </div>
              <h3 className="font-display font-bold text-base text-brand-900">Our Strategic Mission</h3>
            </div>
            <p className="text-xs text-brand-500 leading-relaxed">
              To engineer the highest-converting, most transparent organic and paid acquisition systems on the internet for rapidly scaling startups and enterprise brands.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm text-left space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-brand-50 rounded-lg text-brand-900">
                <Eye className="w-5 h-5 text-blackstone-gold" />
              </div>
              <h3 className="font-display font-bold text-base text-brand-900">Our Long-term Vision</h3>
            </div>
            <p className="text-xs text-brand-500 leading-relaxed">
              To redefine the digital agency model globally by establishing absolute, board-ready cashflow and pipeline attribution as the universal baseline.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <section className="space-y-12" id="about-team-members">
        <div className="text-left space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">The Board Room</span>
          <h2 className="font-display font-extrabold text-3xl">Expert Strategists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((mem) => (
            <div key={mem.name} className="bg-white border border-brand-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all text-left" id={`team-card-${mem.name.toLowerCase().replace(' ', '-')}`}>
              <div className="h-64 overflow-hidden bg-brand-50">
                <img
                  src={mem.avatar}
                  alt={mem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-display font-bold text-lg text-brand-900">{mem.name}</h3>
                <span className="text-xs text-blackstone-gold font-mono uppercase font-bold block">{mem.role}</span>
                <p className="text-xs text-brand-500 leading-relaxed pt-2 border-t border-brand-100 mt-2">
                  {mem.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Block */}
      <section className="bg-brand-50 border border-brand-200 rounded-2xl p-8 lg:p-10 space-y-6" id="about-certifications">
        <div className="flex items-center space-x-3 text-brand-900 justify-start">
          <ShieldCheck className="w-6 h-6 text-blackstone-gold" />
          <h3 className="font-display font-bold text-xl uppercase tracking-wide">Audited Credentials</h3>
        </div>
        <div className="flex flex-wrap justify-start items-center gap-4">
          {certifications.map((cert) => (
            <span key={cert} className="bg-white border border-brand-200 rounded-lg px-4 py-2 text-xs font-semibold text-brand-900 shadow-sm flex items-center space-x-1.5">
              <Star className="w-3.5 h-3.5 text-blackstone-gold fill-blackstone-gold" />
              <span>{cert}</span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
