import React, { useState, useEffect } from 'react';
import VisitorNavbar from './components/VisitorNavbar';
import VisitorFooter from './components/VisitorFooter';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import PricingSection from './components/PricingSection';
import BlogSection from './components/BlogSection';
import CareersSection from './components/CareersSection';
import ContactSection from './components/ContactSection';
import ClientPortal from './components/ClientPortal';
import AdminDashboard from './components/AdminDashboard';

import { BlogPost, PortfolioItem, Project, Invoice, SupportTicket, Lead, Message } from './types';
import {
  BLOGS,
  PORTFOLIO_ITEMS,
  INITIAL_PROJECTS,
  INITIAL_INVOICES,
  INITIAL_TICKETS,
  INITIAL_LEADS,
  INITIAL_MESSAGES
} from './data';

export default function App() {
  // Navigation View Router State
  const [currentView, setCurrentView] = useState<string>('home');
  // System authorization role state (starts as simple visitor)
  const [userRole, setUserRole] = useState<'visitor' | 'client' | 'admin'>('visitor');

  // Unified persistent database states using local storage
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('bl_blogs');
    return saved ? JSON.parse(saved) : BLOGS;
  });

  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('bl_portfolios');
    return saved ? JSON.parse(saved) : PORTFOLIO_ITEMS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('bl_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('bl_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('bl_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('bl_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('bl_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('bl_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('bl_portfolios', JSON.stringify(portfolios));
  }, [portfolios]);

  useEffect(() => {
    localStorage.setItem('bl_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('bl_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('bl_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    localStorage.setItem('bl_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('bl_messages', JSON.stringify(messages));
  }, [messages]);

  // Handle client-strategist automatic simulated response chat loops
  useEffect(() => {
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];

    if (lastMsg.senderRole === 'client') {
      // Trigger a professional delayed response from their strategist
      const replyTimer = setTimeout(() => {
        const text = lastMsg.text.toLowerCase();
        let strategistReply = "Thank you for the message. I have recorded your comments and will sync with our engineering board shortly.";

        if (text.includes('budget') || text.includes('spend') || text.includes('roas') || text.includes('ads')) {
          strategistReply = "Hi there! I received your paid-spend note. I am compile-auditing our meta-ads pixel placements today. We can scale by 20% comfortably. Let me adjust the Q3 retainer deck.";
        } else if (text.includes('seo') || text.includes('traffic') || text.includes('search') || text.includes('ranking')) {
          strategistReply = "Excellent organic question. Devon is performing crawl audit checkups this afternoon to map SGE snippet indices. We will compile our findings in the next bi-weekly PDF report!";
        } else if (text.includes('invoice') || text.includes('billing') || text.includes('pay')) {
          strategistReply = "Billing update received. The ledger matches perfectly. Our accounting desk has reconciled your payment index. Let me know if you need customized invoice splits.";
        }

        setMessages(prev => [
          ...prev,
          {
            id: 'auto_' + Date.now(),
            senderId: 'admin',
            senderName: 'Elena (Strategist)',
            senderRole: 'admin',
            text: strategistReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1500);

      return () => clearTimeout(replyTimer);
    }
  }, [messages]);

  // Database operations callbacks passed to subcomponents
  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'date' | 'status'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: 'lead_' + Date.now(),
      date: new Date().toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'New'
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handlePayInvoice = (invoiceId: string) => {
    setInvoices(prev =>
      prev.map(inv => inv.id === invoiceId ? { ...inv, status: 'Paid' } : inv)
    );
  };

  const handleAddSupportTicket = (newTktData: Omit<SupportTicket, 'id' | 'date' | 'replies'>) => {
    const newTkt: SupportTicket = {
      ...newTktData,
      id: 'tkt_' + (supportTickets.length + 301),
      date: new Date().toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' }),
      replies: []
    };
    setSupportTickets(prev => [newTkt, ...prev]);
  };

  const handleSendMessage = (senderId: string, senderName: string, text: string, role: 'client' | 'admin') => {
    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      senderId,
      senderName,
      senderRole: role,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const handleUpdateProjectProgress = (projectId: string, progress: number) => {
    setProjects(prev =>
      prev.map(p => p.id === projectId ? { ...p, progress } : p)
    );
  };

  const handleUpdateProjectStatus = (projectId: string, status: Project['status']) => {
    setProjects(prev =>
      prev.map(p => p.id === projectId ? { ...p, status } : p)
    );
  };

  const handleAddInvoice = (newInvData: Omit<Invoice, 'id' | 'status'>) => {
    const newInv: Invoice = {
      ...newInvData,
      id: 'inv_' + (invoices.length + 105),
      status: 'Unpaid'
    };
    setInvoices(prev => [newInv, ...prev]);
  };

  const handleUpdateLeadStatus = (leadId: string, status: Lead['status']) => {
    setLeads(prev =>
      prev.map(l => l.id === leadId ? { ...l, status } : l)
    );
  };

  const handleAddBlog = (newBlog: BlogPost) => {
    setBlogs(prev => [newBlog, ...prev]);
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs(prev => prev.filter(b => b.id !== blogId));
  };

  const handleAddPortfolio = (newItem: PortfolioItem) => {
    setPortfolios(prev => [newItem, ...prev]);
  };

  const handleDeletePortfolio = (portId: string) => {
    setPortfolios(prev => prev.filter(p => p.id !== portId));
  };

  const handleUpdateAllDataFromJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.blogs && Array.isArray(data.blogs)) setBlogs(data.blogs);
      if (data.portfolios && Array.isArray(data.portfolios)) setPortfolios(data.portfolios);
      if (data.projects && Array.isArray(data.projects)) setProjects(data.projects);
      if (data.invoices && Array.isArray(data.invoices)) setInvoices(data.invoices);
      if (data.supportTickets && Array.isArray(data.supportTickets)) setSupportTickets(data.supportTickets);
      if (data.leads && Array.isArray(data.leads)) setLeads(data.leads);
      if (data.messages && Array.isArray(data.messages)) setMessages(data.messages);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-between" id="applet-viewport">
      {/* Navbar header */}
      <VisitorNavbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Core View Router */}
      <main className="flex-grow">
        {currentView === 'home' && <Hero setCurrentView={setCurrentView} />}
        {currentView === 'about' && <AboutSection />}
        {currentView === 'services' && <ServicesSection setCurrentView={setCurrentView} />}
        {currentView === 'portfolio' && <PortfolioSection />}
        {currentView === 'case-studies' && <CaseStudiesSection />}
        {currentView === 'pricing' && <PricingSection onAddLead={handleAddLead} />}
        {currentView === 'blog' && <BlogSection blogs={blogs} />}
        {currentView === 'careers' && <CareersSection />}
        {currentView === 'contact' && <ContactSection onAddLead={handleAddLead} />}

        {/* Client Portal tab */}
        {currentView === 'client-portal' && (
          <ClientPortal
            projects={projects}
            invoices={invoices}
            supportTickets={supportTickets}
            messages={messages}
            onAddSupportTicket={handleAddSupportTicket}
            onPayInvoice={handlePayInvoice}
            onSendMessage={handleSendMessage}
          />
        )}

        {/* Admin CMS tab */}
        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            projects={projects}
            invoices={invoices}
            supportTickets={supportTickets}
            leads={leads}
            blogs={blogs}
            portfolios={portfolios}
            messages={messages}
            onUpdateProjectProgress={handleUpdateProjectProgress}
            onUpdateProjectStatus={handleUpdateProjectStatus}
            onAddInvoice={handleAddInvoice}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onAddBlog={handleAddBlog}
            onDeleteBlog={handleDeleteBlog}
            onAddPortfolio={handleAddPortfolio}
            onDeletePortfolio={handleDeletePortfolio}
            onSendMessage={handleSendMessage}
            onUpdateAllDataFromJson={handleUpdateAllDataFromJson}
          />
        )}
      </main>

      {/* Footer bar links */}
      <VisitorFooter
        setCurrentView={setCurrentView}
        onNewsletterSubmit={(email) => {
          handleAddLead({
            name: 'Newsletter Subscriber',
            email: email,
            phone: '',
            company: 'Audited Lead Source',
            budget: 'Newsletter Subscriber',
            servicesNeeded: ['Newsletter'],
            message: 'Subscribed to weekly growth audits newsletter.'
          });
        }}
      />
    </div>
  );
}
