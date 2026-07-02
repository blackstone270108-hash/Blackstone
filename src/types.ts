export interface Service {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  process: string[];
  pricing: string;
  faq: { q: string; a: string }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  clientReview?: string;
  reviewerName?: string;
  results: string[];
  beforeVal?: string;
  afterVal?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  overview: string;
  problem: string;
  strategy: string;
  execution: string;
  results: string[];
  stats: { label: string; value: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  clientId: string;
  status: 'Planning' | 'In Progress' | 'In Review' | 'Completed';
  progress: number;
  startDate: string;
  reports: { name: string; date: string; url: string }[];
  docs: { name: string; size: string; url: string }[];
}

export interface Invoice {
  id: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  date: string;
  clientId: string;
}

export interface SupportTicket {
  id: string;
  clientId: string;
  subject: string;
  status: 'Open' | 'Pending' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  description: string;
  date: string;
  category: string;
  replies?: { author: string; message: string; date: string }[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  servicesNeeded: string[];
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Closed';
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'admin';
  text: string;
  timestamp: string;
}
