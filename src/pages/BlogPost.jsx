import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, Tag, Activity } from 'lucide-react';
import { blogs, getRelativeTime } from '../data/blogs';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the blog from the data file
    const foundBlog = blogs.find(b => b.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
      // Fetch the markdown content if external
      if (foundBlog.contentFile) {
        fetch(foundBlog.contentFile)
          .then(res => res.text())
          .then(text => {
            setMarkdown(text);
            setLoading(false);
          })
          .catch(err => {
            console.error("Failed to load markdown: ", err);
            setMarkdown('Error: Failed to load content.');
            setLoading(false);
          });
      } else {
        setMarkdown(foundBlog.content || '');
        setLoading(false);
      }
    } else {
      // Could redirect to 404 or back to blogs
      navigate('/blog', { replace: true });
    }
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id, navigate]);

  if (loading || !blog) return <div className="min-h-screen text-cyber-textPrimary font-mono flex items-center justify-center">Decrypting document...</div>;

  return (
    <div className="w-full flex justify-center py-12 relative min-h-screen">
      <div className="w-full max-w-4xl flex flex-col px-4 sm:px-0">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-cyber-textSecondary hover:text-cyber-cyan font-mono text-sm w-fit mb-8 group transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          cd ../
        </button>

        {/* Post Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-cyber-cyan/30 pb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs text-cyber-cyan border border-cyber-cyan px-2 py-0.5 rounded-sm uppercase tracking-widest bg-cyber-cyan/10">
              {blog.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-cyber-textPrimary tracking-wide mb-6 leading-tight text-glow-cyan">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-cyber-textSecondary mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-cyber-purple" />
              {blog.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-cyber-purple" />
              {blog.readTime}
            </div>
            {blog.lastUpdated && (
              <div className="flex items-center gap-2 text-cyber-green bg-cyber-green/10 px-3 py-1 rounded-sm border border-cyber-green/30">
                <Activity size={16} className="animate-pulse" />
                Updated {getRelativeTime(blog.lastUpdated)}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs font-mono px-2 py-1 bg-cyber-surface1 text-cyber-textSecondary rounded-sm border border-cyber-border">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Markdown Content rendered via ReactMarkdown */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none text-cyber-textSecondary font-mono"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="font-orbitron text-3xl font-bold text-cyber-textPrimary mt-12 mb-6 text-glow-cyan" {...props} />,
              h2: ({node, ...props}) => <h2 className="font-orbitron text-2xl font-bold text-cyber-cyan mt-10 mb-5 flex items-center gap-2 border-b border-cyber-border pb-2" {...props}><span className="text-cyber-purple">&gt;</span>{props.children}</h2>,
              h3: ({node, ...props}) => <h3 className="font-rajdhani text-xl font-bold text-cyber-textPrimary mt-8 mb-4 border-l-2 border-cyber-cyan pl-3" {...props} />,
              p: ({node, ...props}) => <p className="mb-6 leading-relaxed text-[#c4c4c4] text-[15px] sm:text-[16px]" {...props} />,
              a: ({node, ...props}) => <a className="text-cyber-cyan hover:text-cyber-purple hover:underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
              ul: ({node, ...props}) => <ul className="list-none pl-5 mb-6 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal text-cyber-purple pl-5 mb-6 space-y-2" {...props} />,
              li: ({node, ...props}) => (
                <li className="relative pl-2">
                   <span className="absolute left-[-15px] top-[8px] w-1.5 h-1.5 rounded-full bg-cyber-cyan inline-block"></span>
                   <span className="text-cyber-textSecondary">{props.children}</span>
                </li>
              ),
              code: ({node, inline, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <div className="relative group mb-8 mt-4 rounded overflow-hidden border border-cyber-border bg-cyber-base shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-8 bg-cyber-surface1 border-b border-cyber-border flex items-center px-4">
                       <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/80"></div>
                       </div>
                       <span className="ml-auto text-xs text-cyber-textSecondary font-rajdhani tracking-widest uppercase">{match ? match[1] : 'CODE'}</span>
                    </div>
                    <pre className="p-4 pt-10 overflow-x-auto text-[13px] sm:text-[14px] leading-relaxed">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="bg-cyber-surface1 text-cyber-purple px-1.5 py-0.5 rounded text-sm border border-cyber-border" {...props}>
                    {children}
                  </code>
                )
              },
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-cyber-purple bg-gradient-to-r from-cyber-purple/10 to-transparent p-4 my-6 italic text-cyber-textSecondary rounded-r" {...props} />
              ),
              strong: ({node, ...props}) => <strong className="font-bold text-cyber-textPrimary tracking-wide" {...props} />,
              table: ({node, ...props}) => <div className="overflow-x-auto mb-8 border border-cyber-border rounded"><table className="w-full text-left text-sm" {...props} /></div>,
              th: ({node, ...props}) => <th className="bg-cyber-surface1 p-3 text-cyber-cyan font-rajdhani uppercase tracking-wider border-b border-cyber-border" {...props} />,
              td: ({node, ...props}) => <td className="p-3 border-b border-cyber-border text-cyber-textSecondary" {...props} />,
              img: ({node, ...props}) => (
                <div className="my-8 relative group border border-cyber-border rounded-sm overflow-hidden bg-cyber-base">
                  <img className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" {...props} />
                  {props.alt && (
                    <div className="absolute bottom-0 w-full bg-[#0a0a0ad9] backdrop-blur-sm border-t border-cyber-border p-2 text-center text-xs font-mono text-cyber-cyan tracking-widest uppercase">
                      [ {props.alt} ]
                    </div>
                  )}
                  {/* Styling Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity m-2"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity m-2"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity m-2 mb-8"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity m-2 mb-8"></div>
                </div>
              )
            }}
          >
            {markdown}
          </ReactMarkdown>
        </motion.div>
        
        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-cyber-border flex justify-between items-center text-sm font-mono text-cyber-textSecondary mb-20">
           <div>EOF.</div>
           <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-cyber-cyan transition-colors">
              ^ Back to top
           </button>
        </div>

      </div>
    </div>
  );
}
