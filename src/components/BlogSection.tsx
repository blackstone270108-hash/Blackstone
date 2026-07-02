import React, { useState } from 'react';
import { Search, Calendar, User, Clock, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BLOGS } from '../data';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingBlogId, setReadingBlogId] = useState<string | null>(null);

  const categories = ['All', 'SEO', 'PPC', 'Social Media', 'Content Strategy', 'CRO'];

  // Filters blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const readingBlog = blogs.find(b => b.id === readingBlogId);

  // Suggested related blogs
  const relatedBlogs = readingBlog
    ? blogs.filter(b => b.id !== readingBlog.id && (b.category === readingBlog.category || b.tags.some(t => readingBlog.tags.includes(t)))).slice(0, 2)
    : [];

  const handleBlogClick = (id: string) => {
    setReadingBlogId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="blog-page">
      {readingBlog ? (
        /* Blog Detail Reading View */
        <div className="max-w-3xl mx-auto text-left space-y-8 animate-fade-in" id="blog-reader-view">
          {/* Back button */}
          <button
            onClick={() => setReadingBlogId(null)}
            className="inline-flex items-center space-x-2 text-brand-500 hover:text-brand-900 transition-colors py-2 text-sm font-semibold"
            id="blog-back-to-list"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all insights</span>
          </button>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border border-brand-200">
            <img
              src={readingBlog.image}
              alt={readingBlog.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-brand-100 pb-4 text-xs text-brand-500 font-medium">
            <span className="bg-brand-50 text-brand-900 border border-brand-200 font-semibold px-2.5 py-1 rounded font-mono uppercase text-[10px]">
              {readingBlog.category}
            </span>
            <span className="flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-brand-400" />
              <span>{readingBlog.author}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-400" />
              <span>{readingBlog.date}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>{readingBlog.readTime}</span>
            </span>
          </div>

          {/* Article Contents */}
          <article className="space-y-6">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-900 tracking-tight leading-tight">
              {readingBlog.title}
            </h1>
            <p className="text-base text-brand-500 italic leading-relaxed">
              {readingBlog.excerpt}
            </p>
            <div className="text-sm text-brand-700 leading-relaxed space-y-4 pt-4 border-t border-brand-100">
              <p>{readingBlog.content}</p>
              <p className="mt-4 text-brand-500">
                To maximize search-engine algorithms, marketing teams must ensure their content architecture is aligned with the latest core systems updates. For comprehensive assistance, you can coordinate a full technical search-presence and paid acquisition audit with Blackstone Marketing Agency.
              </p>
            </div>
          </article>

          {/* Tags list */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-brand-100">
            {readingBlog.tags.map(tag => (
              <span key={tag} className="text-xs font-mono text-brand-500 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="pt-12 space-y-6 border-t border-brand-100" id="blog-related-articles">
              <h3 className="font-display font-bold text-lg text-brand-900">Related Marketing Insights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedBlogs.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => handleBlogClick(rel.id)}
                    className="bg-white p-5 border border-brand-200 rounded-xl hover:border-brand-400 transition-colors cursor-pointer text-left space-y-3"
                  >
                    <span className="text-[9px] tracking-widest text-blackstone-gold font-mono uppercase font-semibold block">{rel.category}</span>
                    <h4 className="font-display font-bold text-base text-brand-900 line-clamp-1 hover:text-blackstone-gold transition-colors">{rel.title}</h4>
                    <p className="text-xs text-brand-500 line-clamp-2">{rel.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Blog Grid List View */
        <div className="space-y-12 text-left" id="blog-list-view">
          {/* Header */}
          <div className="max-w-2xl space-y-3" id="blog-header">
            <span className="font-mono text-xs uppercase tracking-wider text-blackstone-gold font-bold">The Blackstone Blueprint</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-900 tracking-tight">Growth Insights & Audits</h1>
            <p className="text-base text-brand-500">
              Checklists, updates, and deep tactical breakdowns of modern search optimization, paid acquisition funnels, and design.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-brand-200 pb-6" id="blog-search-bar">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-brand-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-brand-200 bg-white rounded-lg text-xs focus:outline-none focus:border-brand-900"
                id="blog-search-input"
              />
            </div>

            {/* Filter tags */}
            <div className="md:col-span-8 flex flex-wrap gap-1.5 justify-start md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded transition-colors ${
                    selectedCategory === cat
                      ? 'bg-brand-900 text-white font-semibold'
                      : 'bg-brand-50 text-brand-500 border border-brand-100 hover:text-brand-900 hover:bg-brand-100'
                  }`}
                  id={`blog-cat-filter-${cat.toLowerCase().replace(' ', '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blog-grid">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => handleBlogClick(blog.id)}
                  className="bg-white rounded-xl border border-brand-200 overflow-hidden shadow-sm hover:shadow-md hover:border-brand-400 transition-all cursor-pointer flex flex-col justify-between"
                  id={`blog-card-${blog.id}`}
                >
                  <div className="space-y-4">
                    {/* Visual Cover */}
                    <div className="relative h-48 overflow-hidden bg-brand-50">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-brand-900 text-white font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded font-semibold">
                        {blog.category}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="px-6 flex items-center space-x-3 text-[10px] text-brand-400 font-mono">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{blog.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    {/* Text */}
                    <div className="px-6 space-y-2">
                      <h3 className="font-display font-bold text-lg text-brand-900 line-clamp-2 hover:text-blackstone-gold transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-brand-500 line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read action */}
                  <div className="px-6 pb-6 pt-4 border-t border-brand-50 flex justify-between items-center text-xs font-bold text-brand-900 mt-4">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 text-blackstone-gold" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-brand-200 rounded-xl space-y-2">
              <p className="text-brand-500 text-sm">No insights match your search term or category filters.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="text-xs font-bold text-brand-900 underline hover:text-blackstone-gold"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
