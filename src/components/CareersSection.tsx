import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Check, ArrowRight, X } from 'lucide-react';
import { CAREERS } from '../data';
import { Career } from '../types';

export default function CareersSection() {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [appliedRole, setAppliedRole] = useState<Career | null>(null);

  // Application form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    coverLetter: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleApplyClick = (role: Career) => {
    setAppliedRole(role);
    setApplicationModalOpen(true);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate sending application
    setSubmitted(true);
    setFormData({ name: '', email: '', portfolio: '', coverLetter: '' });
    setTimeout(() => {
      setSubmitted(false);
      setApplicationModalOpen(false);
      setAppliedRole(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16" id="careers-page">
      {/* Header */}
      <div className="text-left max-w-2xl space-y-3" id="careers-header">
        <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">Grow With Blackstone</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-900 tracking-tight">Join Our Growth Board</h1>
        <p className="text-base text-brand-500">
          We operate with absolute transparency, deep structural accountability, and high-velocity testing. If you are an organic growth wizard or paid-ads architect, explore our roles below.
        </p>
      </div>

      {/* Careers List Grid */}
      <div className="grid grid-cols-1 gap-6 text-left" id="careers-roles-list">
        {CAREERS.map((role) => {
          const isExpanded = selectedRoleId === role.id;
          return (
            <div
              key={role.id}
              className={`bg-white border rounded-2xl transition-all overflow-hidden ${
                isExpanded ? 'border-brand-900 shadow-md' : 'border-brand-200 hover:border-brand-300'
              }`}
              id={`career-card-${role.id}`}
            >
              {/* Row Header */}
              <div 
                className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer"
                onClick={() => setSelectedRoleId(isExpanded ? null : role.id)}
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] tracking-widest font-mono uppercase bg-brand-50 text-brand-900 px-2.5 py-1 rounded font-bold border border-brand-100">
                      {role.department}
                    </span>
                    <span className="text-[10px] tracking-widest font-mono uppercase bg-blackstone-gold/10 text-brand-900 px-2.5 py-1 rounded font-bold">
                      {role.type}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-brand-900 hover:text-blackstone-gold transition-colors">{role.title}</h3>
                  <div className="flex items-center space-x-4 text-xs text-brand-400 font-medium">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{role.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyClick(role);
                    }}
                    className="px-5 py-2.5 bg-brand-900 hover:bg-blackstone-dark text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>

              {/* Accordion content details */}
              {isExpanded && (
                <div className="px-6 pb-8 sm:px-8 border-t border-brand-100 pt-6 space-y-6 bg-brand-50/20 animate-fade-in" id={`career-expanded-details-${role.id}`}>
                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-sm uppercase tracking-wider text-blackstone-gold">Role Overview</h4>
                    <p className="text-xs text-brand-500 leading-relaxed max-w-3xl">{role.description}</p>
                  </div>

                  {/* Requirements list */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-sm uppercase tracking-wider text-blackstone-gold">Requirements & Experience</h4>
                    <ul className="space-y-2.5">
                      {role.requirements.map((req, i) => (
                        <li key={i} className="text-xs text-brand-600 flex items-start space-x-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Inside CTA button */}
                  <button
                    onClick={() => handleApplyClick(role)}
                    className="px-6 py-3 bg-white hover:bg-brand-50 text-brand-900 border border-brand-200 rounded font-semibold text-xs uppercase tracking-wider transition-colors"
                  >
                    Submit Application Cover
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Slide-over application Modal */}
      {applicationModalOpen && appliedRole && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="application-modal">
          {/* Overlay background */}
          <div className="fixed inset-0 bg-brand-900/60 backdrop-blur-sm" onClick={() => setApplicationModalOpen(false)}></div>

          {/* Modal Container */}
          <div className="flex items-center justify-center min-h-screen px-4 py-8 relative">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl border border-brand-200 text-left space-y-6 animate-scale-up">
              {/* Close Button */}
              <button
                onClick={() => setApplicationModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-brand-400 hover:text-brand-900 transition-colors"
                id="close-career-modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] tracking-widest font-mono text-blackstone-gold uppercase font-bold">Direct Professional Application</span>
                <h3 className="font-display font-bold text-2xl text-brand-900">{appliedRole.title}</h3>
                <span className="text-xs text-brand-400 font-semibold">{appliedRole.department} Department</span>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4" id="application-success-banner">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-xl">Application Transmitted!</h4>
                  <p className="text-xs text-brand-500 max-w-xs mx-auto leading-relaxed">
                    Thank you, {formData.name}. We have recorded your application and files link. Our talent acquisition director will review and coordinate within 2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4" id="application-form">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Amanda Carter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                      id="candidate-name-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Contact Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="amanda@marketing.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                      id="candidate-email-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">LinkedIn or Portfolio Link</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                      id="candidate-portfolio-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Brief Cover Letter / Introduction</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about a paid ads campaign or technical SEO program you structured..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900 resize-none"
                      id="candidate-intro-input"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-900 hover:bg-blackstone-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                    id="submit-candidate-application-btn"
                  >
                    Transmit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
