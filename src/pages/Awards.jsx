import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, Flag, ScrollText } from 'lucide-react';
import { awards } from '../data/awards';

const GlowingParticles = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight / 2,
      tx: (Math.random() - 0.5) * window.innerWidth,
      ty: (Math.random() - 0.5) * window.innerHeight - 200,
      scale: Math.random() * 1.5 + 0.5,
      rotation: Math.random() * 360,
      color: Math.random() > 0.5 ? '#00f0ff' : '#bf00ff',
      shape: Math.random() > 0.5 ? 'triangle' : 'square',
    }));
    setParticles(newParticles);
    
    setTimeout(() => setParticles([]), 2000);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: window.innerWidth/2, y: window.innerHeight/2, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: 0, 
              x: window.innerWidth/2 + p.tx, 
              y: window.innerHeight/2 + p.ty, 
              scale: p.scale, 
              rotate: p.rotation * 4 
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute ${p.shape === 'triangle' ? 'w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent' : 'w-4 h-4'}`}
            style={{
              borderColor: p.shape === 'triangle' ? `transparent transparent ${p.color} transparent` : undefined,
              backgroundColor: p.shape === 'square' ? p.color : undefined,
              boxShadow: p.shape === 'square' ? `0 0 10px ${p.color}` : 'none'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function Awards() {
  const getIcon = (type) => {
    switch(type) {
      case 'trophy': return <Trophy size={48} className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]" />;
      case 'medal': return <Medal size={48} className="text-[#C0C0C0] drop-shadow-[0_0_15px_rgba(192,192,192,0.8)]" />;
      case 'badge': return <Award size={48} className="text-cyber-cyan drop-shadow-[0_0_15px_#00f0ff]" />;
      case 'flag': return <Flag size={48} className="text-cyber-green drop-shadow-[0_0_15px_#00ff41]" />;
      case 'certificate': return <ScrollText size={48} className="text-cyber-purple drop-shadow-[0_0_15px_#bf00ff]" />;
      default: return <Trophy size={48} className="text-cyber-cyan" />;
    }
  };

  return (
    <div className="w-full flex flex-col pt-12 min-h-screen relative">
      <GlowingParticles />
      
      <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary mb-4 tracking-wider text-glow-cyan uppercase text-center md:text-left">
        AWARDS & ACHIEVEMENTS
      </h1>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 0.5 }}
        className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff] mb-16 mx-auto md:mx-0"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 perspective-[1000px]">
        {awards.map((award, i) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, rotateY: 90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15, type: "spring", bounce: 0.4 }}
            className="bg-gradient-to-b from-cyber-surface1 to-cyber-base border border-cyber-border rounded-xl p-8 flex flex-col items-center text-center shadow-[inset_0_0_30px_rgba(0,0,0,1)] hover:shadow-[inset_0_0_30px_rgba(0,240,255,0.1)] transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:border-cyber-cyan"
          >
            {/* Top Shine */}
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out"></div>

            <div className="mb-6 relative">
              <div className="absolute inset-0 blur-xl opacity-50 scale-150 animate-pulse">
                {getIcon(award.iconType)}
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {getIcon(award.iconType)}
              </motion.div>
            </div>

            {award.rank && (
              <div className="text-[#FFD700] font-orbitron font-bold text-lg mb-2 tracking-widest uppercase">
                {award.rank}
              </div>
            )}

            <h3 className="font-rajdhani font-bold text-cyber-textPrimary text-xl md:text-2xl mb-2">{award.title}</h3>
            <p className="font-mono text-cyber-cyan text-sm mb-1">{award.issuer}</p>
            <p className="font-mono text-cyber-textSecondary text-xs mb-6">{award.date}</p>
            
            <p className="font-mono text-cyber-textPrimary opacity-80 text-sm leading-relaxed mt-auto">
              {award.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
