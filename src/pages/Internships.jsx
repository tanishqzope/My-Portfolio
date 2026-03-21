import { motion } from 'framer-motion';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import { internships } from '../data/internships';

export default function Internships() {
  return (
    <div className="w-full flex flex-col pt-12 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary mb-4 tracking-wider text-glow-cyan uppercase">
        INTERNSHIPS
      </h1>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 0.5 }}
        className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff] mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 perspective-[1000px]">
        {internships.map((internship, i) => (
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
            className="relative bg-cyber-surface1 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-cyber-border group hover:-translate-y-4 hover:rotate-y-[5deg] hover:border-cyber-cyan transition-all duration-300 transform-style-preserve-3d hover:box-glow-cyan"
          >
            {/* ID Card Top Header */}
            <div className="h-20 bg-cyber-surface2 border-b border-cyber-border relative flex items-center justify-between px-6">
              <div className="w-12 h-12 bg-black border border-cyber-cyan rounded-full flex items-center justify-center -mb-8 z-10 bg-[url('/logo.png')] bg-cover">
                <ShieldAlert size={20} className="text-cyber-cyan opacity-50" />
              </div>
              <div className="flex flex-col items-end">
                <span className="font-orbitron font-bold text-cyber-cyan tracking-wider">{internship.company}</span>
                <span className="font-mono text-[10px] text-cyber-textSecondary uppercase tracking-widest">Authorized Personnel</span>
              </div>
            </div>

            {/* CLEARANCE BADGE line */}
            <div className="w-full bg-cyber-red py-1 text-center mt-6 shadow-[0_0_10px_#ff003c]">
              <span className="font-orbitron font-bold text-black text-xs tracking-[0.2em] uppercase">INTERN CLEARANCE</span>
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col h-[calc(100%-120px)]">
              <h2 className="font-rajdhani font-bold text-2xl text-cyber-textPrimary mb-1 uppercase">{internship.role}</h2>
              <p className="font-mono text-xs text-cyber-textSecondary mb-4">{internship.duration}</p>
              
              <p className="font-mono text-sm text-cyber-textPrimary mb-4 leading-relaxed">
                {internship.description}
              </p>

              <div className="mt-auto">
              </div>

              {internship.certificateUrl && internship.certificateUrl !== "#" && (
                <a href={internship.certificateUrl} target="_blank" rel="noreferrer" className="w-full text-center py-2 border border-cyber-cyan/50 text-cyber-cyan font-orbitron text-xs hover:bg-cyber-cyan hover:text-black transition-colors flex justify-center items-center gap-2">
                  View Completion Letter <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Barcode bottom */}
            <div className="absolute bottom-0 left-0 w-full h-8 flex justify-center items-end pb-2 gap-[2px] opacity-20 group-hover:opacity-40 transition-opacity">
               {Array.from({length: 40}).map((_, j) => (
                 <div key={j} className="bg-white h-4" style={{ width: `${Math.random() * 4 + 1}px` }}></div>
               ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
