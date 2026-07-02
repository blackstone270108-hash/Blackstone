import React, { useState } from 'react';
import { Project, Invoice, SupportTicket, Lead, BlogPost, PortfolioItem, Message } from '../types';
import { SEED_CLIENTS } from '../data';
import { Lock, Plus, Trash, Eye, DollarSign, CheckCircle, Clock, FileText, TrendingUp, Users, Activity, BarChart2, Mail, Send, Check, Database } from 'lucide-react';

interface AdminDashboardProps {
  projects: Project[];
  invoices: Invoice[];
  supportTickets: SupportTicket[];
  leads: Lead[];
  blogs: BlogPost[];
  portfolios: PortfolioItem[];
  messages: Message[];
  onUpdateProjectProgress: (projectId: string, progress: number) => void;
  onUpdateProjectStatus: (projectId: string, status: Project['status']) => void;
  onAddInvoice: (invoice: Omit<Invoice, 'id' | 'status'>) => void;
  onUpdateLeadStatus: (leadId: string, status: Lead['status']) => void;
  onAddBlog: (blog: BlogPost) => void;
  onDeleteBlog: (blogId: string) => void;
  onAddPortfolio: (portfolio: PortfolioItem) => void;
  onDeletePortfolio: (portfolioId: string) => void;
  onSendMessage: (senderId: string, senderName: string, text: string, role: 'client' | 'admin') => void;
  onUpdateAllDataFromJson?: (jsonString: string) => boolean;
}

export default function AdminDashboard({
  projects,
  invoices,
  supportTickets,
  leads,
  blogs,
  portfolios,
  messages,
  onUpdateProjectProgress,
  onUpdateProjectStatus,
  onAddInvoice,
  onUpdateLeadStatus,
  onAddBlog,
  onDeleteBlog,
  onAddPortfolio,
  onDeletePortfolio,
  onSendMessage,
  onUpdateAllDataFromJson
}: AdminDashboardProps) {
  // Panel state
  const [adminTab, setAdminTab] = useState<'analytics' | 'leads' | 'projects' | 'billing' | 'cms-blogs' | 'cms-portfolio' | 'support' | 'json-workspace'>('analytics');

  // JSON Database Workspace state
  const [jsonText, setJsonText] = useState(() => {
    const dbState = { blogs, portfolios, projects, invoices, supportTickets, leads, messages };
    return JSON.stringify(dbState, null, 2);
  });
  const [jsonStatus, setJsonStatus] = useState('');
  const [jsonError, setJsonError] = useState('');

  // New Invoice Form state
  const [newInvClient, setNewInvClient] = useState(SEED_CLIENTS[0].id);
  const [newInvAmount, setNewInvAmount] = useState<number>(3000);
  const [newInvDueDate, setNewInvDueDate] = useState('July 25, 2026');
  const [invoiceSubmitted, setInvoiceSubmitted] = useState(false);

  // New Blog Form state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('SEO');
  const [blogAuthor, setBlogAuthor] = useState('Elena Rostova, Managing Partner');
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80');
  const [blogTags, setBlogTags] = useState('Marketing, Scaling');

  // New Portfolio Form state
  const [portTitle, setPortTitle] = useState('');
  const [portCategory, setPortCategory] = useState('SEO');
  const [portClient, setPortClient] = useState('');
  const [portResults, setPortResults] = useState('+$10k, +400% traffic');
  const [portImage, setPortImage] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80');

  // Support ticket reply message
  const [supportReplyText, setSupportReplyText] = useState<{ [ticketId: string]: string }>({});

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvAmount || isNaN(newInvAmount)) return;

    onAddInvoice({
      amount: Number(newInvAmount),
      dueDate: newInvDueDate,
      date: 'July 01, 2026',
      clientId: newInvClient
    });

    setInvoiceSubmitted(true);
    setTimeout(() => setInvoiceSubmitted(false), 4000);
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim()) return;

    onAddBlog({
      id: 'blog_' + Date.now(),
      title: blogTitle,
      excerpt: blogExcerpt || blogContent.substring(0, 100) + '...',
      content: blogContent,
      category: blogCategory,
      author: blogAuthor,
      date: 'July 01, 2026',
      readTime: '4 min read',
      tags: blogTags.split(',').map(t => t.trim()),
      image: blogImage
    });

    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogTags('Marketing, Scaling');
    alert('Blog post compiled and added successfully!');
  };

  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle.trim() || !portClient.trim()) return;

    onAddPortfolio({
      id: 'port_' + Date.now(),
      title: portTitle,
      category: portCategory,
      client: portClient,
      image: portImage,
      results: portResults.split(',').map(r => r.trim())
    });

    setPortTitle('');
    setPortClient('');
    setPortResults('+$10k, +400% traffic');
    alert('Portfolio item created successfully!');
  };

  // Metrics
  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, curr) => sum + curr.amount, 0);
  const conversionRate = leads.length > 0 ? ((leads.filter(l => l.status === 'Qualified').length / leads.length) * 100).toFixed(0) : '25';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-left" id="admin-dashboard-container">
      {/* Admin Top Header bar */}
      <div className="bg-brand-900 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-blackstone-gold/20 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-blackstone-gold text-brand-900 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-bold">
              ADMINISTRATIVE CONTROL PANEL
            </span>
            <span className="text-xs text-brand-300 font-mono">ROLE-BASED AUTHORIZATION</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-white">Blackstone CMS Dashboard</h1>
          <p className="text-xs text-brand-200">Manage campaign statuses, track sourced leads, bill invoices, and update blog/portfolio CMS entries.</p>
        </div>
      </div>

      {/* Admin navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brand-200 pb-2" id="admin-tab-navigation">
        {(['analytics', 'leads', 'projects', 'billing', 'cms-blogs', 'cms-portfolio', 'support', 'json-workspace'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setAdminTab(tab)}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-2 ${
              adminTab === tab
                ? 'bg-brand-900 text-white font-bold shadow-sm'
                : 'bg-white text-brand-500 hover:text-brand-900 hover:bg-brand-50 border border-brand-100'
            }`}
            id={`admin-nav-tab-${tab}`}
          >
            {tab === 'analytics' && <Activity className="w-3.5 h-3.5" />}
            {tab === 'leads' && <Users className="w-3.5 h-3.5" />}
            {tab === 'projects' && <BarChart2 className="w-3.5 h-3.5" />}
            {tab === 'billing' && <DollarSign className="w-3.5 h-3.5" />}
            {tab === 'cms-blogs' && <FileText className="w-3.5 h-3.5" />}
            {tab === 'cms-portfolio' && <Plus className="w-3.5 h-3.5" />}
            {tab === 'support' && <Eye className="w-3.5 h-3.5" />}
            {tab === 'json-workspace' && <Database className="w-3.5 h-3.5" />}
            <span className="capitalize">
              {tab === 'cms-blogs' 
                ? 'Blogs CMS' 
                : tab === 'cms-portfolio' 
                ? 'Portfolio CMS' 
                : tab === 'json-workspace' 
                ? 'JSON Database' 
                : tab}
            </span>
          </button>
        ))}
      </div>

      {/* Analytics view tab */}
      {adminTab === 'analytics' && (
        <div className="space-y-8" id="admin-analytics-tab">
          {/* Metrics summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="bg-white border border-brand-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="block text-[10px] font-mono text-brand-400 uppercase tracking-widest">Sourced Leads</span>
              <span className="font-display font-extrabold text-2xl text-brand-900 block">{leads.length} Proposals</span>
            </div>
            <div className="bg-white border border-brand-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="block text-[10px] font-mono text-brand-400 uppercase tracking-widest">Conversion Index</span>
              <span className="font-display font-extrabold text-2xl text-brand-900 block">{conversionRate}%</span>
            </div>
            <div className="bg-white border border-brand-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="block text-[10px] font-mono text-brand-400 uppercase tracking-widest">Audited Revenue</span>
              <span className="font-display font-extrabold text-2xl text-green-600 block">₹{totalRevenue.toLocaleString()}</span>
            </div>
            <div className="bg-white border border-brand-200 rounded-xl p-5 shadow-sm space-y-2">
              <span className="block text-[10px] font-mono text-brand-400 uppercase tracking-widest">Open Support Tickets</span>
              <span className="font-display font-extrabold text-2xl text-amber-600 block">
                {supportTickets.filter(t => t.status === 'Open').length} Issues
              </span>
            </div>
          </div>

          {/* Interactive performance charts mockups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Traffic & Conversion graph */}
            <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-brand-100 pb-3">
                <h3 className="font-display font-bold text-sm text-brand-900 uppercase tracking-wide">Website traffic & organic SGE clicks</h3>
                <span className="text-[10px] font-mono text-green-500 font-bold">+245% YTD</span>
              </div>
              <div className="h-44 flex items-end justify-between pt-6 space-x-2">
                {[30, 45, 35, 60, 75, 90, 110].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                    <div className="w-full bg-brand-900 rounded-t" style={{ height: `${val}px` }}></div>
                    <span className="text-[9px] font-mono text-brand-400">M0{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acquisition Revenue Pipeline graph */}
            <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-brand-100 pb-3">
                <h3 className="font-display font-bold text-sm text-brand-900 uppercase tracking-wide">Attributable Pipeline value</h3>
                <span className="text-[10px] font-mono text-brand-900 font-bold">₹10 Cr Audited</span>
              </div>
              <div className="h-44 flex items-end justify-between pt-6 space-x-2">
                {[40, 55, 65, 80, 70, 95, 120].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                    <div className="w-full bg-blackstone-gold rounded-t" style={{ height: `${val}px` }}></div>
                    <span className="text-[9px] font-mono text-brand-400">M0{i+1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leads view tab */}
      {adminTab === 'leads' && (
        <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm space-y-6" id="admin-leads-tab">
          <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3">Lead Pipeline Tracker</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-200 font-mono text-[10px] uppercase text-brand-400">
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Budget Range</th>
                  <th className="py-3 px-4">Selected Services</th>
                  <th className="py-3 px-4">Notes / Objectives</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} className="border-b border-brand-50 last:border-b-0 text-xs">
                    <td className="py-4 px-4 text-left">
                      <span className="block font-bold text-brand-900">{lead.name}</span>
                      <span className="block text-[10px] text-brand-400 font-mono">{lead.email}</span>
                      {lead.phone && <span className="block text-[10px] text-brand-400 font-mono">{lead.phone}</span>}
                    </td>
                    <td className="py-4 px-4 font-semibold text-brand-700">{lead.company}</td>
                    <td className="py-4 px-4 font-mono font-bold text-brand-900">{lead.budget}</td>
                    <td className="py-4 px-4 text-brand-500">
                      <div className="flex flex-wrap gap-1">
                        {lead.servicesNeeded.map((svc, i) => (
                          <span key={i} className="bg-brand-50 border border-brand-100 text-[10px] px-1.5 py-0.5 rounded text-brand-700">
                            {svc}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-brand-500 max-w-xs truncate" title={lead.message}>
                      {lead.message}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                        lead.status === 'New'
                          ? 'bg-blue-100 text-blue-700'
                          : lead.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-700'
                            : lead.status === 'Qualified'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => onUpdateLeadStatus(lead.id, 'Contacted')}
                        className="px-2.5 py-1 bg-brand-50 text-brand-900 text-[9px] font-mono uppercase rounded border border-brand-200"
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => onUpdateLeadStatus(lead.id, 'Qualified')}
                        className="px-2.5 py-1 bg-green-900 text-white text-[9px] font-mono uppercase rounded font-bold"
                      >
                        Qualify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects CMS view tab */}
      {adminTab === 'projects' && (
        <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm space-y-6" id="admin-projects-tab">
          <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3">Active Campaigns Management</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-200 font-mono text-[10px] uppercase text-brand-400">
                  <th className="py-3 px-4">Campaign Name</th>
                  <th className="py-3 px-4">Client Partner</th>
                  <th className="py-3 px-4">Commence Date</th>
                  <th className="py-3 px-4">Milestone Progress Index</th>
                  <th className="py-3 px-4">Execution Status</th>
                  <th className="py-3 px-4 text-right">Update Phase</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(proj => (
                  <tr key={proj.id} className="border-b border-brand-50 last:border-b-0 text-xs">
                    <td className="py-4 px-4 font-bold text-brand-900">{proj.name}</td>
                    <td className="py-4 px-4 text-brand-500 font-medium">{proj.clientName}</td>
                    <td className="py-4 px-4 font-mono text-brand-400">{proj.startDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={proj.progress}
                          onChange={(e) => onUpdateProjectProgress(proj.id, Number(e.target.value))}
                          className="w-24 h-1.5 bg-brand-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="font-mono font-bold text-brand-900 text-[10px]">{proj.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-brand-900 text-white font-mono text-[9px] uppercase font-bold px-2.5 py-1 rounded">
                        {proj.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <select
                        value={proj.status}
                        onChange={(e) => onUpdateProjectStatus(proj.id, e.target.value as any)}
                        className="px-2.5 py-1.5 border border-brand-200 bg-white text-[10px] font-mono rounded"
                      >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="In Review">In Review</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invoices view tab */}
      {adminTab === 'billing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="admin-billing-tab">
          {/* Create Invoice Form (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-brand-200 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3 mb-6">Issue Retainer Invoice</h3>
            {invoiceSubmitted ? (
              <div className="py-12 text-center space-y-4" id="billing-success-banner">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg">Invoice Issued!</h4>
                <p className="text-xs text-brand-500 max-w-sm mx-auto leading-relaxed">
                  The billing item has been compiled and injected. It is now immediately visible to the client on their billing log.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateInvoice} className="space-y-4" id="invoice-creation-form">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Select Client Partner *</label>
                  <select
                    value={newInvClient}
                    onChange={(e) => setNewInvClient(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs bg-white focus:outline-none focus:border-brand-900"
                    id="new-invoice-client-select"
                  >
                    {SEED_CLIENTS.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Invoice Retainer Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newInvAmount}
                    onChange={(e) => setNewInvAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="new-invoice-amount-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Payment Due Date *</label>
                  <input
                    type="text"
                    required
                    value={newInvDueDate}
                    onChange={(e) => setNewInvDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="new-invoice-due-date-input"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-900 hover:bg-blackstone-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                  id="issue-invoice-btn"
                >
                  Issue Retainer Invoice
                </button>
              </form>
            )}
          </div>

          {/* Invoices list (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-brand-200 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3 mb-4">All Retainer Invoices</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-200 font-mono text-[10px] uppercase text-brand-400">
                    <th className="py-2 px-3">Invoice ID</th>
                    <th className="py-2 px-3">Client</th>
                    <th className="py-2 px-3">Due Date</th>
                    <th className="py-2 px-3">Amount</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.id} className="border-b border-brand-50 last:border-b-0 text-xs">
                      <td className="py-3 px-3 font-mono font-bold text-brand-900">{inv.id}</td>
                      <td className="py-3 px-3 text-brand-500">{SEED_CLIENTS.find(c => c.id === inv.clientId)?.company || inv.clientId}</td>
                      <td className="py-3 px-3 text-brand-500">{inv.dueDate}</td>
                      <td className="py-3 px-3 font-bold text-brand-900">₹{inv.amount.toLocaleString()}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                          inv.status === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Blogs CMS tab */}
      {adminTab === 'cms-blogs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="admin-blogs-cms-tab">
          {/* Create Blog Form (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-brand-200 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3 mb-6">Create Blog Insights Entry</h3>
            <form onSubmit={handleCreateBlog} className="space-y-4" id="blog-creation-form">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Blog Post Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master-class guide to landing-page setups"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                  id="cms-blog-title"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Brief Excerpt *</label>
                <input
                  type="text"
                  required
                  placeholder="Summary for listings..."
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                  id="cms-blog-excerpt"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs bg-white focus:outline-none focus:border-brand-900"
                    id="cms-blog-cat"
                  >
                    <option value="SEO">SEO</option>
                    <option value="PPC">PPC</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Content Strategy">Content Strategy</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={blogTags}
                    onChange={(e) => setBlogTags(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="cms-blog-tags"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Content Rich Body *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Full text contents..."
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900 resize-none"
                  id="cms-blog-content"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-900 hover:bg-blackstone-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                id="cms-blog-submit"
              >
                Publish Insight Entry
              </button>
            </form>
          </div>

          {/* Blogs list table (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-brand-200 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3 mb-4">Active CMS Blog Posts</h3>
            <div className="space-y-3">
              {blogs.map(blog => (
                <div key={blog.id} className="p-4 bg-brand-50 border border-brand-200 rounded-xl flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-blackstone-gold uppercase font-bold">{blog.category}</span>
                    <h4 className="text-sm font-bold text-brand-900">{blog.title}</h4>
                    <span className="text-[10px] text-brand-400 block">By: {blog.author}</span>
                  </div>
                  <button
                    onClick={() => onDeleteBlog(blog.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    id={`delete-blog-btn-${blog.id}`}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Portfolio CMS tab */}
      {adminTab === 'cms-portfolio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="admin-portfolio-cms-tab">
          {/* Create portfolio Item Form (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-brand-200 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3 mb-6">Create Portfolio Proof Entry</h3>
            <form onSubmit={handleCreatePortfolio} className="space-y-4" id="portfolio-creation-form">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Case Study / Portfolio Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyper-Scale Paid-Ads Funnels"
                  value={portTitle}
                  onChange={(e) => setPortTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                  id="cms-port-title"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Partner Client *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SwiftCart Co."
                  value={portClient}
                  onChange={(e) => setPortClient(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                  id="cms-port-client"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Category</label>
                  <select
                    value={portCategory}
                    onChange={(e) => setPortCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs bg-white focus:outline-none focus:border-brand-900"
                    id="cms-port-cat"
                  >
                    <option value="SEO">SEO</option>
                    <option value="PPC">PPC</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Key Metrics (comma-separated)</label>
                  <input
                    type="text"
                    value={portResults}
                    onChange={(e) => setPortResults(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="cms-port-results"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-900 hover:bg-blackstone-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                id="cms-portfolio-submit"
              >
                Create Portfolio Entry
              </button>
            </form>
          </div>

          {/* Portfolio items list (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-brand-200 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3 mb-4">Active CMS Portfolio Proofs</h3>
            <div className="space-y-3">
              {portfolios.map(item => (
                <div key={item.id} className="p-4 bg-brand-50 border border-brand-200 rounded-xl flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-blackstone-gold uppercase font-bold">{item.category}</span>
                    <h4 className="text-sm font-bold text-brand-900">{item.title}</h4>
                    <span className="text-[10px] text-brand-400 block">Client: {item.client}</span>
                  </div>
                  <button
                    onClick={() => onDeletePortfolio(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    id={`delete-portfolio-btn-${item.id}`}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Support tickets view tab */}
      {adminTab === 'support' && (
        <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm space-y-6" id="admin-support-tab">
          <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3">Support Ticket Queue</h3>
          {supportTickets.length > 0 ? (
            <div className="space-y-6">
              {supportTickets.map(ticket => (
                <div key={ticket.id} className="p-6 bg-brand-50/50 border border-brand-200 rounded-xl space-y-4" id={`admin-ticket-card-${ticket.id}`}>
                  <div className="flex justify-between items-start border-b border-brand-100 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-brand-900 font-mono font-bold">Ticket {ticket.id}</span>
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold ${
                          ticket.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-brand-100 text-brand-700'
                        }`}>
                          {ticket.priority} Priority
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-brand-900 leading-snug">{ticket.subject}</h4>
                      <span className="text-xs text-brand-500 block">Client Partner: {SEED_CLIENTS.find(c => c.id === ticket.clientId)?.name || ticket.clientId}</span>
                    </div>

                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                      ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>

                  <p className="text-xs text-brand-600 leading-relaxed max-w-3xl">{ticket.description}</p>

                  {/* Replies queue */}
                  {ticket.replies && ticket.replies.length > 0 && (
                    <div className="space-y-2.5 bg-white p-4 rounded-lg border border-brand-200 max-w-3xl">
                      <span className="block text-[8px] font-mono uppercase text-blackstone-gold font-bold">Thread responses</span>
                      {ticket.replies.map((rep, rIdx) => (
                        <div key={rIdx} className="space-y-1 border-b border-brand-50 last:border-b-0 pb-2 last:pb-0">
                          <p className="text-xs text-brand-600 italic">"{rep.message}"</p>
                          <span className="block text-[9px] text-brand-400 font-mono">
                            By: {rep.author} • {rep.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {ticket.status !== 'Resolved' && (
                    <div className="flex items-center space-x-3 max-w-2xl pt-2">
                      <input
                        type="text"
                        placeholder="Type reply message to resolve or update..."
                        value={supportReplyText[ticket.id] || ''}
                        onChange={(e) => setSupportReplyText({ ...supportReplyText, [ticket.id]: e.target.value })}
                        className="flex-1 px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900 bg-white"
                        id={`ticket-reply-input-${ticket.id}`}
                      />
                      <button
                        onClick={() => {
                          const rText = supportReplyText[ticket.id];
                          if (!rText || !rText.trim()) return;

                          ticket.status = 'Resolved';
                          ticket.replies = [
                            ...(ticket.replies || []),
                            {
                              author: 'Elena Rostova (Ads Director)',
                              message: rText,
                              date: 'July 01, 2026 12:05 PM'
                            }
                          ];

                          setSupportReplyText({ ...supportReplyText, [ticket.id]: '' });
                        }}
                        className="px-4 py-2 bg-brand-900 text-white hover:bg-blackstone-gold hover:text-brand-900 font-semibold text-xs rounded transition-colors"
                        id={`ticket-reply-btn-${ticket.id}`}
                      >
                        Send & Resolve
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-brand-500">No support tickets active in queue.</p>
          )}
        </div>
      )}

      {/* JSON Workspace view tab */}
      {adminTab === 'json-workspace' && (
        <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm space-y-6 text-left animate-fade-in" id="admin-json-workspace">
          <div className="border-b border-brand-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-display font-bold text-base text-brand-900 flex items-center space-x-2">
                <Database className="w-5 h-5 text-blackstone-gold" />
                <span>Executive JSON Database Workspace</span>
              </h3>
              <p className="text-xs text-brand-400 mt-1">Read, modify, back up, or restore the real-time application database structures in standard JSON formatting.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const dbState = { blogs, portfolios, projects, invoices, supportTickets, leads, messages };
                  setJsonText(JSON.stringify(dbState, null, 2));
                  setJsonStatus('Successfully loaded current live database state.');
                  setJsonError('');
                }}
                className="px-3.5 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                id="btn-json-reset-live"
              >
                Reset to Current Live
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    const dbState = { blogs, portfolios, projects, invoices, supportTickets, leads, messages };
                    const blob = new Blob([JSON.stringify(dbState, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `blackstone_db_${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                    setJsonStatus('Successfully generated and downloaded .json database backup file.');
                    setJsonError('');
                  } catch (e) {
                    setJsonError('Failed to generate export file backup.');
                    setJsonStatus('');
                  }
                }}
                className="px-3.5 py-1.5 bg-blackstone-gold hover:bg-yellow-600 text-brand-900 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                id="btn-json-export-file"
              >
                Download JSON Backup
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Raw JSON State Schema Editor</label>
              <textarea
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value);
                  setJsonStatus('');
                  setJsonError('');
                }}
                rows={18}
                className="w-full px-4 py-3 font-mono text-xs bg-brand-900 text-brand-200 border border-brand-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blackstone-gold focus:border-blackstone-gold leading-relaxed"
                placeholder="Paste valid database JSON structure here..."
                id="textarea-json-raw-db"
              />
            </div>

            {jsonStatus && (
              <p className="text-xs text-green-700 font-semibold bg-green-50 p-3 rounded-lg border border-green-200" id="json-sync-status-msg">
                ✓ {jsonStatus}
              </p>
            )}

            {jsonError && (
              <p className="text-xs text-red-700 font-semibold bg-red-50 p-3 rounded-lg border border-red-200" id="json-sync-error-msg">
                ⚠ {jsonError}
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                if (!onUpdateAllDataFromJson) {
                  setJsonError('Sync callback is not available.');
                  return;
                }
                const success = onUpdateAllDataFromJson(jsonText);
                if (success) {
                  setJsonStatus('Success: synchronized raw JSON data structure with application state and saved back to localStorage.');
                  setJsonError('');
                } else {
                  setJsonError('Validation Error: Failed to parse raw JSON. Please confirm that all brackets, commas, quotes, and objects are strictly formatted.');
                  setJsonStatus('');
                }
              }}
              className="px-5 py-3 bg-brand-900 hover:bg-blackstone-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer"
              id="btn-json-commit-sync"
            >
              Sync & Save All JSON Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
