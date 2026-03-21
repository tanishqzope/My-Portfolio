import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ChevronRight, Search, Activity } from 'lucide-react';
import { blogs, getRelativeTime } from '../data/blogs';

export default function Blogs() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Extract unique categories
  const categories = ['All', ...new Set(blogs.map(b => b.category))];

  // Filter logic
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = filter === 'All' || blog.category === filter;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col pt-12 min-h-screen">
      <div className="flex flex-col mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary tracking-wider text-glow-cyan h-12 flex items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            WRITEUPS & LOGS
          </motion.span>
        </h1>
        <p className="font-mono text-cyber-textSecondary mt-2 max-w-2xl">
          Detailed deep dives into vulnerabilities, CTF walkthroughs, and thoughts on cybersecurity.
        </p>
      </div>

      {/* Animated Divider */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 0.5 }}
        className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff] mb-12"
      />

      {/* Constraints & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-sm transition-all ${
                filter === cat 
                  ? 'bg-cyber-purple text-cyber-textPrimary border border-cyber-purple box-glow-purple' 
                  : 'bg-cyber-charcoal text-cyber-textSecondary border border-cyber-border hover:border-cyber-cyan hover:text-cyber-cyan'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex items-center justify-end">
          {!isSearchExpanded && !searchQuery ? (
            <button 
              onClick={() => setIsSearchExpanded(true)}
              className="w-10 h-10 rounded-sm bg-cyber-charcoal border border-cyber-border flex items-center justify-center text-cyber-textSecondary hover:text-cyber-cyan hover:border-cyber-cyan transition-colors"
              title="Search Blogs"
            >
              <Search size={16} />
            </button>
          ) : (
            <motion.div 
              initial={{ width: 40, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full md:w-64"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyber-cyan">
                <Search size={16} />
              </div>
              <input
                type="text"
                autoFocus
                onBlur={() => { if(!searchQuery) setIsSearchExpanded(false) }}
                className="w-full bg-cyber-charcoal border border-cyber-cyan rounded-sm pl-10 pr-4 py-2 font-mono text-sm text-cyber-textPrimary focus:outline-none box-glow-cyan transition-all"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Blog Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <AnimatePresence>
          {filteredBlogs.map((blog, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.id}`)}
              className="bg-cyber-base border border-cyber-border rounded flex flex-col group cursor-pointer hover:border-cyber-cyan transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)] overflow-hidden"
            >
              {/* Header Image Placeholder / Gradient */}
              <div 
                className="h-40 w-full bg-cyber-charcoal border-b border-cyber-border relative overflow-hidden flex items-center justify-center glitch-hover"
                style={blog.image ? { backgroundImage: `url(${blog.image})` } : {}}
              >
                 {blog.image && (
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-0"
                    />
                 )}
                 <div className={`absolute inset-0 ${blog.image ? 'bg-cyber-charcoal/40 group-hover:bg-transparent' : 'bg-gradient-to-br from-cyber-charcoal to-cyber-surface1 opacity-50 group-hover:opacity-0'} transition-all duration-500 z-10 pointer-events-none`}></div>
                 
                 {!blog.image && (
                   <div className="font-orbitron text-4xl text-cyber-border group-hover:text-cyber-cyan/30 transition-colors z-0 font-bold tracking-widest uppercase rotate-2 scale-150 absolute opacity-20">
                      {blog.category}
                   </div>
                 )}
                 
                 {/* Always show the category badge centered */}
                 <div className="relative z-20 font-rajdhani text-xl text-cyber-cyan tracking-widest uppercase border border-cyber-cyan px-4 py-1 bg-black/70 backdrop-blur-md group-hover:box-glow-cyan transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                    {blog.category}
                 </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyber-textSecondary mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-cyber-cyan" />
                    {blog.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-cyber-purple" />
                    {blog.readTime}
                  </div>
                  {blog.lastUpdated && (
                    <div className="flex items-center gap-1 text-cyber-green">
                      <Activity size={14} />
                      Updated {getRelativeTime(blog.lastUpdated)}
                    </div>
                  )}
                </div>

                {/* Title & Excerpt */}
                <h2 className="font-orbitron font-bold text-xl text-cyber-textPrimary mb-3 group-hover:text-cyber-cyan transition-colors leading-snug">
                  {blog.title}
                </h2>
                <p className="font-mono text-sm text-cyber-textPrimary mb-6 flex-grow line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags & Action */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-cyber-border">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-cyber-purple bg-cyber-purple/10 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-cyber-cyan flex items-center text-sm font-mono group-hover:underline">
                    Read <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredBlogs.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-cyber-textSecondary font-mono border border-dashed border-cyber-border bg-cyber-base">
            <Search size={48} className="text-cyber-border mb-4" />
            <p>No query results found in the database.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
