import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface VisitorFooterProps {
  setCurrentView: (view: string) => void;
  onNewsletterSubmit: (email: string) => void;
}

export default function VisitorFooter({ setCurrentView, onNewsletterSubmit }: VisitorFooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onNewsletterSubmit(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-900 text-white pt-16 pb-12 border-t border-blackstone-gold/20" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4" id="footer-brand-info">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-brand-900 font-display font-extrabold text-xl">BS</span>
              </div>
              <div>
                <span className="font-display font-bold text-base tracking-tight text-white block">BLACKSTONE</span>
                <span className="block text-[9px] tracking-widest text-blackstone-gold font-mono uppercase font-semibold">MARKETING AGENCY</span>
              </div>
            </div>
            <p className="text-sm text-brand-200 leading-relaxed max-w-xs">
              Unlocking predictable, compound organic growth and hyper-scalable paid search/social funnels for modern digital brands.
            </p>
            <div className="space-y-2 pt-2 text-sm text-brand-200">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blackstone-gold" />
                <span>+91 7982829840</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blackstone-gold" />
                <span>blackstoneagency379@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blackstone-gold" />
                <span>Sector15 A faridabad, haryana</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div id="footer-quick-links">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-blackstone-gold mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-brand-200">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-white transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-colors">Our Services</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('portfolio')} className="hover:text-white transition-colors">Portfolio</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('blog')} className="hover:text-white transition-colors">Blogs</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('careers')} className="hover:text-white transition-colors">Careers</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-white transition-colors">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div id="footer-core-services">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-blackstone-gold mb-4">Core Services</h4>
            <ul className="space-y-2 text-sm text-brand-200">
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-colors">Search Engine Optimization</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-colors">Pay-Per-Click Advertising</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-colors">Social Media Marketing</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-colors">Content & Digital PR</button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-colors">Web Development & Apps</button>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-4" id="footer-newsletter">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-blackstone-gold mb-4">Newsletter Signup</h4>
            <p className="text-xs text-brand-200">
              Subscribe to "The Blackstone Blueprint" for weekly elite marketing checklists and growth insights.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter work email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-sm text-white focus:outline-none focus:border-blackstone-gold transition-colors"
                  id="newsletter-email-input"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blackstone-gold hover:bg-blackstone-gold/90 text-brand-900 font-bold text-xs uppercase tracking-wider rounded transition-colors"
                id="newsletter-submit-btn"
              >
                Subscribe Now
              </button>
            </form>
            {subscribed && (
              <span className="text-xs text-green-400 block animate-pulse">
                ✓ Added to subscription registry successfully!
              </span>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-200 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} Blackstone Marketing Agency LLC. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer" onClick={() => handleLinkClick('careers')}>Careers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
