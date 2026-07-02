import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Lock, UserCheck } from 'lucide-react';

interface VisitorNavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  userRole: 'visitor' | 'client' | 'admin';
  setUserRole: (role: 'visitor' | 'client' | 'admin') => void;
}

export default function VisitorNavbar({
  currentView,
  setCurrentView,
  userRole,
  setUserRole
}: VisitorNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Services', view: 'services' },
    { label: 'Portfolio', view: 'portfolio' },
    { label: 'Blogs', view: 'blog' },
    { label: 'Careers', view: 'careers' },
    { label: 'Contact Us', view: 'contact' },
  ];

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-100/90 backdrop-blur-md border-b border-brand-200" id="navbar-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => handleNavClick('home')}
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 bg-brand-900 rounded-lg flex items-center justify-center border border-blackstone-gold/30">
              <span className="text-white font-display font-bold text-xl tracking-tighter">BS</span>
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-white">BLACKSTONE</span>
              <span className="block text-[10px] tracking-widest text-blackstone-gold font-mono uppercase font-semibold">MARKETING AGENCY</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  currentView === item.view
                    ? 'text-blackstone-gold bg-brand-200 font-semibold'
                    : 'text-brand-500 hover:text-white hover:bg-brand-100'
                }`}
                id={`nav-link-${item.view}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Role selector & Portal CTAs */}
          <div className="hidden lg:flex items-center space-x-3" id="desktop-actions">
            {/* Quick Portal Access */}
            <button
              onClick={() => handleNavClick('client-portal')}
              className={`flex items-center space-x-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider border rounded-md transition-all duration-200 ${
                currentView === 'client-portal'
                  ? 'bg-blackstone-gold text-brand-900 border-blackstone-gold font-bold'
                  : 'text-white border-white/20 hover:bg-white/10'
              }`}
              id="navbar-client-portal-btn"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Client Portal</span>
            </button>

            <button
              onClick={() => handleNavClick('admin-dashboard')}
              className={`flex items-center space-x-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider border rounded-md transition-all duration-200 ${
                currentView === 'admin-dashboard'
                  ? 'bg-blackstone-gold text-brand-900 border-blackstone-gold font-bold'
                  : 'text-blackstone-gold border-blackstone-gold/40 hover:bg-blackstone-gold hover:text-brand-900'
              }`}
              id="navbar-admin-dashboard-btn"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin CMS</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('client-portal')}
              className="p-2 text-brand-500 hover:text-white bg-brand-200 rounded-md"
              title="Client Portal"
              id="mobile-portal-icon-btn"
            >
              <UserCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-500 hover:text-white bg-brand-100 rounded-md"
              id="mobile-menu-toggle-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-brand-200 bg-brand-100" id="mobile-nav-panel">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`block w-full text-left px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  currentView === item.view
                    ? 'text-blackstone-gold bg-brand-200 font-semibold'
                    : 'text-brand-500 hover:text-white hover:bg-brand-200/50'
                }`}
                id={`mobile-nav-link-${item.view}`}
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-brand-200 pt-3 mt-3 px-4 space-y-2">
              <button
                onClick={() => handleNavClick('client-portal')}
                className="flex items-center justify-center space-x-2 w-full py-3 bg-white/10 text-white font-medium rounded-md text-sm border border-white/10 hover:bg-white/20"
                id="mobile-client-portal-cta"
              >
                <UserCheck className="w-4 h-4" />
                <span>Access Client Portal</span>
              </button>
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="flex items-center justify-center space-x-2 w-full py-3 bg-blackstone-gold text-brand-900 font-bold rounded-md text-sm border border-blackstone-gold/50"
                id="mobile-admin-dashboard-cta"
              >
                <Lock className="w-4 h-4" />
                <span>Admin Dashboard CMS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
