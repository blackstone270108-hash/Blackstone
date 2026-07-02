import dataJson from './data.json';
import { Service, PortfolioItem, CaseStudy, BlogPost, Testimonial, Career, Project, Invoice, SupportTicket, Lead, Message } from './types';

export const SERVICES: Service[] = dataJson.SERVICES as Service[];
export const PORTFOLIO_ITEMS: PortfolioItem[] = dataJson.PORTFOLIO_ITEMS as PortfolioItem[];
export const CASE_STUDIES: CaseStudy[] = dataJson.CASE_STUDIES as CaseStudy[];
export const BLOGS: BlogPost[] = dataJson.BLOGS as BlogPost[];
export const TESTIMONIALS: Testimonial[] = dataJson.TESTIMONIALS as Testimonial[];
export const CAREERS: Career[] = dataJson.CAREERS as Career[];
export const SEED_CLIENTS = dataJson.SEED_CLIENTS;
export const INITIAL_PROJECTS: Project[] = dataJson.INITIAL_PROJECTS as Project[];
export const INITIAL_INVOICES: Invoice[] = dataJson.INITIAL_INVOICES as Invoice[];
export const INITIAL_TICKETS: SupportTicket[] = dataJson.INITIAL_TICKETS as SupportTicket[];
export const INITIAL_LEADS: Lead[] = dataJson.INITIAL_LEADS as Lead[];
export const INITIAL_MESSAGES: Message[] = dataJson.INITIAL_MESSAGES as Message[];
