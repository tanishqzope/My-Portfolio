import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Code, CheckCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { certifications as courses } from '../data/certifications';

export default function Courses() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [filter, setFilter] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['All', ...new Set(courses.map(c => c.category))];
  const filteredCerts = filter === 'All' ? courses : courses.filter(c => c.category === filter);

  return (
    <div className="w-full flex flex-col pt-12 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary mb-4 tracking-wider text-glow-cyan uppercase">
        COURSES
      </h1>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 0.5 }}
        className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff] mb-8"
      />

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
              filter === cat 
                ? 'bg-cyber-cyan text-black font-bold box-glow-cyan' 
                : 'bg-cyber-charcoal border border-cyber-cyan/30 text-cyber-textSecondary hover:border-cyber-cyan hover:text-cyber-cyan'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        <AnimatePresence>
          {filteredCerts.map((cert, i) => (
            <motion.div
              layout
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => { setSelectedCert(cert); setCurrentImageIndex(0); }}
              className="bg-cyber-charcoal border border-[#222222] rounded-xl overflow-hidden cursor-pointer group hover:-translate-y-2 hover:border-cyber-cyan hover:box-glow-cyan transition-all duration-300 relative"
            >
              {/* Image Area */}
              <div className="w-full aspect-video overflow-hidden relative border-b border-cyber-cyan/50">
                <img src={cert.image} alt={cert.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span className="px-4 py-2 border border-cyber-cyan text-cyber-cyan font-orbitron text-sm rounded backdrop-blur-md">VIEW CERTIFICATE</span>
                </div>
              </div>
              
              {/* Text Area */}
              <div className="p-6 relative">
                <div className="absolute top-[-20px] right-4 text-cyber-cyan bg-cyber-charcoal border border-cyber-cyan p-2 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)] z-10">
                  {cert.category === 'Cybersecurity' ? <Shield size={18} /> : <Code size={18} />}
                </div>
                <h3 className="font-rajdhani font-bold text-cyber-textPrimary text-xl leading-tight mb-2 pr-8">{cert.name}</h3>
                <p className="font-mono text-cyber-cyan text-sm mb-1">{cert.issuer}</p>
                <p className="font-mono text-cyber-textSecondary text-xs mb-4">{cert.date}</p>
                <div className="flex items-center gap-1 text-cyber-green text-xs font-mono">
                  <CheckCircle size={12} /> Verify Credential
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pt-[70px]"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-cyber-charcoal border border-cyber-cyan box-glow-cyan rounded-xl overflow-hidden flex flex-col max-h-[85vh] relative"
            >
              {(() => {
                const images = selectedCert.images || [selectedCert.image];
                return (
                  <div className="relative w-full aspect-video bg-black border-b border-cyber-cyan/30 flex justify-center items-center group/carousel overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        src={images[currentImageIndex]} 
                        alt={`${selectedCert.name} - ${currentImageIndex + 1}`} 
                        className="w-auto h-full max-w-full object-contain" 
                      />
                    </AnimatePresence>
                    
                    {images.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-cyber-cyan border border-cyber-cyan/50 p-2 rounded-full hover:bg-cyber-cyan hover:text-black transition-all opacity-0 group-hover/carousel:opacity-100 z-10"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-cyber-cyan border border-cyber-cyan/50 p-2 rounded-full hover:bg-cyber-cyan hover:text-black transition-all opacity-0 group-hover/carousel:opacity-100 z-10"
                        >
                          <ChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                              className={`rounded-full transition-all ${currentImageIndex === idx ? 'bg-cyber-cyan w-6 h-2' : 'bg-cyber-cyan/30 w-2 h-2 hover:bg-cyber-cyan/60'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <button 
                      onClick={() => setSelectedCert(null)}
                      className="absolute top-4 right-4 bg-black/80 text-cyber-cyan border border-cyber-cyan p-2 rounded-full hover:bg-cyber-cyan hover:text-black transition-colors z-20"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })()}
              <div className="p-8 overflow-y-auto">
                <h2 className="font-orbitron font-bold text-2xl md:text-3xl text-cyber-textPrimary mb-2">{selectedCert.name}</h2>
                <div className="flex flex-wrap gap-4 font-mono text-sm mb-6">
                  <span className="text-cyber-cyan">{selectedCert.issuer}</span>
                  <span className="text-cyber-textSecondary">{selectedCert.date}</span>
                  <span className="text-cyber-textSecondary">ID: {selectedCert.credentialId}</span>
                </div>
                <p className="font-mono text-cyber-textPrimary text-sm leading-relaxed mb-6">
                  {selectedCert.description}
                </p>
                <div className="mb-8">
                  <h4 className="font-rajdhani text-cyber-cyan mb-2 tracking-wider">VALIDATED SKILLS</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <a 
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-cyber-green text-cyber-green font-orbitron uppercase hover:bg-cyber-green hover:text-black hover:shadow-[0_0_15px_#00ff41] transition-all"
                >
                  Verify Authenticity <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
