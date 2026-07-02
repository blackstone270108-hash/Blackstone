import React, { useState } from 'react';
import { SEED_CLIENTS } from '../data';
import { Project, Invoice, SupportTicket, Message } from '../types';
import { UserCheck, Briefcase, FileText, Folder, MessageSquare, HelpCircle, DollarSign, Send, CheckCircle, Clock, AlertTriangle, LogOut } from 'lucide-react';

interface ClientPortalProps {
  projects: Project[];
  invoices: Invoice[];
  supportTickets: SupportTicket[];
  messages: Message[];
  onAddSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'date' | 'replies'>) => void;
  onPayInvoice: (invoiceId: string) => void;
  onSendMessage: (senderId: string, senderName: string, text: string, role: 'client' | 'admin') => void;
}

export default function ClientPortal({
  projects,
  invoices,
  supportTickets,
  messages,
  onAddSupportTicket,
  onPayInvoice,
  onSendMessage
}: ClientPortalProps) {
  // Portal session state
  const [loggedClientId, setLoggedClientId] = useState<string | null>(null);
  const [portalTab, setPortalTab] = useState<'dashboard' | 'projects' | 'invoices' | 'messages' | 'support'>('dashboard');

  // Support ticket form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketPriority, setTicketPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [ticketCategory, setTicketCategory] = useState('Creative Design');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Live chat input state
  const [chatInput, setChatInput] = useState('');

  const currentClient = SEED_CLIENTS.find(c => c.id === loggedClientId);

  const clientProjects = projects.filter(p => p.clientId === loggedClientId);
  const clientInvoices = invoices.filter(i => i.clientId === loggedClientId);
  const clientTickets = supportTickets.filter(t => t.clientId === loggedClientId);

  // Total invoice cost unpaid & paid
  const totalPaid = clientInvoices.filter(i => i.status === 'Paid').reduce((sum, curr) => sum + curr.amount, 0);
  const totalUnpaid = clientInvoices.filter(i => i.status === 'Unpaid' || i.status === 'Overdue').reduce((sum, curr) => sum + curr.amount, 0);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDesc.trim() || !loggedClientId) return;

    onAddSupportTicket({
      clientId: loggedClientId,
      subject: ticketSubject,
      priority: ticketPriority,
      category: ticketCategory,
      description: ticketDesc,
      status: 'Open'
    });

    setTicketSubmitted(true);
    setTicketSubject('');
    setTicketDesc('');
    setTimeout(() => setTicketSubmitted(false), 5000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !loggedClientId || !currentClient) return;

    onSendMessage(loggedClientId, currentClient.name, chatInput, 'client');
    setChatInput('');
  };

  if (!loggedClientId || !currentClient) {
    return (
      <div className="max-w-md mx-auto py-20 px-4" id="portal-login-screen">
        <div className="bg-white rounded-2xl border border-brand-200 p-8 shadow-md text-center space-y-6">
          <div className="w-12 h-12 bg-brand-900 text-white rounded-xl flex items-center justify-center mx-auto border border-blackstone-gold/20">
            <UserCheck className="w-6 h-6 text-blackstone-gold" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-2xl text-brand-900">Access Client Portal</h2>
            <p className="text-xs text-brand-500 max-w-xs mx-auto">
              Select one of our pre-configured partner accounts below to test real invoices, live reports, documents, support tickets, and chat.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {SEED_CLIENTS.map(c => (
              <button
                key={c.id}
                onClick={() => setLoggedClientId(c.id)}
                className="w-full py-3.5 px-4 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl font-display font-bold text-sm text-brand-900 transition-all text-left flex justify-between items-center"
                id={`login-as-client-${c.id}`}
              >
                <div>
                  <span className="block font-bold">{c.name}</span>
                  <span className="block text-[10px] font-mono text-brand-400 uppercase tracking-wider">{c.company}</span>
                </div>
                <span className="text-xs text-blackstone-gold font-mono font-bold">Access →</span>
              </button>
            ))}
          </div>

          <span className="block text-[9px] font-mono text-brand-400 uppercase tracking-widest pt-4">
            BLACKSTONE PORTAL SYSTEM V1.0
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-left" id="client-portal-dashboard">
      {/* Portal Top Bar */}
      <div className="bg-brand-900 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-blackstone-gold/20 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-blackstone-gold text-brand-900 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-bold">
              PARTNER CLIENT
            </span>
            <span className="text-xs text-brand-300 font-mono">ID: {currentClient.id}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-white">Welcome, {currentClient.name}</h1>
          <p className="text-xs text-brand-200">Manage invoices, tickets, active campaigns, and download performance reports.</p>
        </div>

        <button
          onClick={() => { setLoggedClientId(null); setPortalTab('dashboard'); }}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-mono flex items-center space-x-1.5 transition-colors"
          id="portal-logout-btn"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Portal</span>
        </button>
      </div>

      {/* Portal Tab controls */}
      <div className="flex flex-wrap gap-2 border-b border-brand-200 pb-2" id="portal-tab-navigation">
        {(['dashboard', 'projects', 'invoices', 'messages', 'support'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setPortalTab(tab)}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-2 ${
              portalTab === tab
                ? 'bg-brand-900 text-white font-bold shadow-sm'
                : 'bg-white text-brand-500 hover:text-brand-900 hover:bg-brand-50 border border-brand-100'
            }`}
            id={`portal-nav-tab-${tab}`}
          >
            {tab === 'dashboard' && <UserCheck className="w-3.5 h-3.5" />}
            {tab === 'projects' && <Briefcase className="w-3.5 h-3.5" />}
            {tab === 'invoices' && <DollarSign className="w-3.5 h-3.5" />}
            {tab === 'messages' && <MessageSquare className="w-3.5 h-3.5" />}
            {tab === 'support' && <HelpCircle className="w-3.5 h-3.5" />}
            <span className="capitalize">{tab}</span>
          </button>
        ))}
      </div>

      {/* Render Portal tab contents */}
      {portalTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="portal-tab-dashboard-contents">
          {/* Main welcome details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border border-brand-200 rounded-xl p-5 shadow-sm space-y-2">
                <span className="block text-[10px] font-mono text-brand-400 uppercase tracking-widest">Active Projects</span>
                <span className="font-display font-extrabold text-2xl text-brand-900 block">{clientProjects.length} Campaigns</span>
              </div>
              <div className="bg-white border border-brand-200 rounded-xl p-5 shadow-sm space-y-2">
                <span className="block text-[10px] font-mono text-brand-400 uppercase tracking-widest">Total Settled Invoices</span>
                <span className="font-display font-extrabold text-2xl text-green-600 block">₹{totalPaid.toLocaleString()}</span>
              </div>
              <div className="bg-white border border-brand-200 rounded-xl p-5 shadow-sm space-y-2">
                <span className="block text-[10px] font-mono text-brand-400 uppercase tracking-widest">Unpaid Balance</span>
                <span className={`font-display font-extrabold text-2xl block ${totalUnpaid > 0 ? 'text-amber-600' : 'text-brand-500'}`}>
                  ₹{totalUnpaid.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Project Status Preview */}
            <div className="bg-white border border-brand-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3">Active Campaigns overview</h3>
              {clientProjects.length > 0 ? (
                <div className="space-y-6">
                  {clientProjects.map(proj => (
                    <div key={proj.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-brand-800">{proj.name}</span>
                        <span className="bg-brand-50 border border-brand-200 text-xs font-semibold px-2 py-0.5 rounded text-brand-900">
                          {proj.status}
                        </span>
                      </div>
                      <div className="w-full bg-brand-100 rounded-full h-2">
                        <div className="bg-brand-900 h-2 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-brand-400">
                        <span>Campaign progress: {proj.progress}%</span>
                        <span>Commenced: {proj.startDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-brand-500">No active campaigns configured.</p>
              )}
            </div>
          </div>

          {/* Documents / Reports column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-brand-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3">Recent PDF Reports</h3>
              {clientProjects.length > 0 ? (
                <div className="space-y-3">
                  {clientProjects.flatMap(p => p.reports).map((rep, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-brand-50/50 rounded-lg border border-brand-100 hover:bg-brand-50 transition-colors">
                      <div className="space-y-0.5 text-left">
                        <span className="block text-xs font-semibold text-brand-800">{rep.name}</span>
                        <span className="block text-[9px] font-mono text-brand-400">Published: {rep.date}</span>
                      </div>
                      <button className="text-[10px] font-mono text-brand-900 hover:text-blackstone-gold font-bold underline">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-brand-500">No reports found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {portalTab === 'projects' && (
        <div className="space-y-8" id="portal-tab-projects-contents">
          {clientProjects.map(proj => (
            <div key={proj.id} className="bg-white border border-brand-200 rounded-2xl p-6 lg:p-8 shadow-sm space-y-6">
              <div className="border-b border-brand-100 pb-4 flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest text-blackstone-gold font-mono uppercase font-bold">Campaign Status</span>
                  <h3 className="font-display font-extrabold text-xl text-brand-900">{proj.name}</h3>
                  <span className="text-xs text-brand-400 block font-medium">Commencement: {proj.startDate}</span>
                </div>
                <span className="bg-brand-900 text-white font-mono text-xs uppercase px-3 py-1 rounded font-bold">
                  {proj.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-500 font-medium">Milestone Execution Index</span>
                  <span className="font-mono text-brand-900 font-bold">{proj.progress}% Complete</span>
                </div>
                <div className="w-full bg-brand-100 rounded-full h-3">
                  <div className="bg-gradient-to-r from-brand-900 to-blackstone-gold h-3 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                </div>
              </div>

              {/* Two Column details: Reports & Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {/* PDF Reports */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-sm text-brand-900 flex items-center space-x-1.5 border-b border-brand-50 pb-2">
                    <FileText className="w-4 h-4 text-blackstone-gold" />
                    <span>Weekly & Monthly Reports</span>
                  </h4>
                  <div className="space-y-2.5">
                    {proj.reports.map((rep, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-brand-50/50 rounded-lg border border-brand-100">
                        <div>
                          <span className="block text-xs font-semibold text-brand-800">{rep.name}</span>
                          <span className="block text-[9px] font-mono text-brand-400">Date: {rep.date}</span>
                        </div>
                        <button className="px-3 py-1 bg-brand-900 text-white text-[9px] font-mono uppercase rounded hover:bg-blackstone-gold hover:text-brand-900 font-bold transition-all">
                          Get PDF
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategy Documents */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-sm text-brand-900 flex items-center space-x-1.5 border-b border-brand-50 pb-2">
                    <Folder className="w-4 h-4 text-blackstone-gold" />
                    <span>Internal Campaign Documents</span>
                  </h4>
                  <div className="space-y-2.5">
                    {proj.docs.map((docItem, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-brand-50/50 rounded-lg border border-brand-100">
                        <div>
                          <span className="block text-xs font-semibold text-brand-800">{docItem.name}</span>
                          <span className="block text-[9px] font-mono text-brand-400">Size: {docItem.size}</span>
                        </div>
                        <button className="px-3 py-1 bg-brand-100 hover:bg-brand-200 text-brand-900 text-[9px] font-mono uppercase rounded font-bold transition-all border border-brand-200">
                          Get FILE
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {portalTab === 'invoices' && (
        <div className="bg-white border border-brand-200 rounded-2xl p-6 lg:p-8 shadow-sm space-y-6" id="portal-tab-invoices-contents">
          <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3">Retainer Billing Invoices</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-200 font-mono text-[10px] uppercase text-brand-400">
                  <th className="py-3 px-4">Invoice ID</th>
                  <th className="py-3 px-4">Date Issued</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {clientInvoices.map(inv => (
                  <tr key={inv.id} className="border-b border-brand-50 last:border-b-0 text-xs">
                    <td className="py-4 px-4 font-mono font-bold text-brand-900">{inv.id}</td>
                    <td className="py-4 px-4 text-brand-500">{inv.date}</td>
                    <td className="py-4 px-4 text-brand-500">{inv.dueDate}</td>
                    <td className="py-4 px-4 font-bold text-brand-900">₹{inv.amount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold inline-flex items-center space-x-1 ${
                        inv.status === 'Paid'
                          ? 'bg-green-100 text-green-700'
                          : inv.status === 'Overdue'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                      }`}>
                        {inv.status === 'Paid' ? <CheckCircle className="w-3 h-3 text-green-600" /> : <Clock className="w-3 h-3" />}
                        <span>{inv.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {inv.status !== 'Paid' ? (
                        <button
                          onClick={() => onPayInvoice(inv.id)}
                          className="px-4 py-1.5 bg-brand-900 text-white font-semibold rounded text-[10px] uppercase tracking-wider hover:bg-blackstone-gold hover:text-brand-900 transition-colors"
                          id={`pay-btn-${inv.id}`}
                        >
                          Settle Invoice
                        </button>
                      ) : (
                        <span className="text-xs text-green-600 font-semibold font-mono">Paid (Audited)</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {portalTab === 'messages' && (
        <div className="bg-white border border-brand-200 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 h-[550px]" id="portal-tab-messages-contents">
          {/* Strategist Profile Card (4 cols) */}
          <div className="lg:col-span-4 bg-brand-50 p-6 border-b lg:border-b-0 lg:border-r border-brand-200 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <span className="text-[9px] tracking-widest font-mono text-blackstone-gold uppercase font-bold">Assigned Strategist</span>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-lg text-brand-900">Elena Rostova</h4>
                <span className="text-xs text-brand-500 block">Growth Acquisition Strategist</span>
              </div>
              <p className="text-xs text-brand-400 leading-relaxed">
                Elena manages SwiftCart and AuraPays marketing funnels, PPC allocations, and organic technical queues.
              </p>
            </div>

            <div className="text-[9px] text-brand-400 font-mono space-y-1 pt-6 border-t border-brand-200">
              <span>SYSTEM STATE: ENCRYPTED CHAT</span>
              <span className="block">COMMUNICATION DIRECT</span>
            </div>
          </div>

          {/* Chat Window (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white h-full">
            {/* Conversation list */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4 h-[400px]">
              {messages.map((msg) => {
                const isMe = msg.senderId === loggedClientId;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-xs sm:max-w-md p-4 rounded-xl text-xs leading-relaxed ${
                      isMe 
                        ? 'bg-brand-900 text-white rounded-br-none' 
                        : 'bg-brand-50 text-brand-900 rounded-bl-none border border-brand-200'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-brand-400 font-mono mt-1">
                      {msg.senderName} • {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chat Send Form */}
            <form onSubmit={handleSendChat} className="p-4 border-t border-brand-200 flex space-x-2" id="chat-send-form">
              <input
                type="text"
                placeholder="Type dynamic message to your growth team..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-brand-200 rounded-lg text-xs focus:outline-none focus:border-brand-900 bg-white"
                id="chat-text-input"
              />
              <button
                type="submit"
                className="p-2 bg-brand-900 text-white hover:bg-blackstone-dark rounded-lg flex items-center justify-center transition-colors shrink-0"
                id="chat-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {portalTab === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="portal-tab-support-contents">
          {/* Submit support ticket (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-brand-200 rounded-2xl p-6 lg:p-8 shadow-sm text-left">
            <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3 mb-6">Create Support Ticket</h3>
            {ticketSubmitted ? (
              <div className="py-12 text-center space-y-4" id="ticket-success-banner">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg">Support Ticket Captured!</h4>
                <p className="text-xs text-brand-500 max-w-sm mx-auto leading-relaxed">
                  We have appended your support request. It will appear on the Admin Dashboard immediately for priority assignment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4" id="support-ticket-form">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Subject / Issue Overview *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sizing adjustments for ad creative layouts..."
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900"
                    id="ticket-subject-input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Priority Level</label>
                    <select
                      value={ticketPriority}
                      onChange={(e) => setTicketPriority(e.target.value as any)}
                      className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs bg-white focus:outline-none focus:border-brand-900"
                      id="ticket-priority-select"
                    >
                      <option value="Low">Low (General)</option>
                      <option value="Medium">Medium (Ad adjustments)</option>
                      <option value="High">High (Ad Campaign Downtime)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Request Category</label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs bg-white focus:outline-none focus:border-brand-900"
                      id="ticket-category-select"
                    >
                      <option value="Creative Design">Creative Design</option>
                      <option value="SEO Strategy">SEO Strategy</option>
                      <option value="Billing & Invoices">Billing & Invoices</option>
                      <option value="Campaign Audits">Campaign Audits</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-400 block">Deep Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide exact details of the request, URL links, sizing specifications..."
                    value={ticketDesc}
                    onChange={(e) => setTicketDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-200 rounded-md text-xs focus:outline-none focus:border-brand-900 resize-none"
                    id="ticket-desc-input"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-900 hover:bg-blackstone-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                  id="submit-support-ticket-btn"
                >
                  File Support Request
                </button>
              </form>
            )}
          </div>

          {/* Ticket list history (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-brand-200 rounded-2xl p-6 shadow-sm space-y-4 text-left">
            <h3 className="font-display font-bold text-base text-brand-900 border-b border-brand-100 pb-3">Support History</h3>
            {clientTickets.length > 0 ? (
              <div className="space-y-4">
                {clientTickets.map(tkt => (
                  <div key={tkt.id} className="p-4 bg-brand-50 border border-brand-200 rounded-xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-brand-400 block">ID: {tkt.id}</span>
                        <h4 className="text-xs font-bold text-brand-900 leading-snug">{tkt.subject}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold ${
                        tkt.status === 'Resolved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {tkt.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-brand-500 leading-relaxed line-clamp-2">{tkt.description}</p>

                    {/* Replies */}
                    {tkt.replies && tkt.replies.length > 0 && (
                      <div className="border-t border-brand-100 pt-3 space-y-2">
                        <span className="block text-[8px] font-mono uppercase tracking-widest text-blackstone-gold font-bold">Latest Response</span>
                        <p className="text-[11px] text-brand-600 italic bg-white p-2.5 rounded border border-brand-100">
                          "{tkt.replies[0].message}"
                        </p>
                        <span className="block text-[8px] font-mono text-brand-400">
                          — {tkt.replies[0].author} • {tkt.replies[0].date}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-brand-500">No support ticket history.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
