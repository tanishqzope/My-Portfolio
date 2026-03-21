import { motion } from 'framer-motion';
import { ShieldAlert, Briefcase } from 'lucide-react';
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <div className="w-full flex flex-col pt-12 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary mb-4 tracking-wider text-glow-purple uppercase">
        INDUSTRY EXPERIENCE
      </h1>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 0.5 }}
        className="h-[3px] bg-cyber-purple shadow-[0_0_10px_#bf00ff] mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 perspective-[1000px]">
        {experience.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
            className="relative bg-cyber-surface1 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-cyber-border group hover:-translate-y-4 hover:rotate-y-[5deg] hover:border-cyber-purple transition-all duration-300 transform-style-preserve-3d hover:box-glow-purple"
          >
            {/* ID Card Top Header */}
            <div className="h-20 bg-cyber-surface2 border-b border-cyber-border relative flex items-center justify-between px-6">
              <div className="w-12 h-12 bg-black border border-cyber-purple rounded-full flex items-center justify-center -mb-8 z-10 bg-[url('/logo.png')] bg-cover">
                <Briefcase size={20} className="text-cyber-purple opacity-50" />
              </div>
              <div className="flex flex-col items-end">
                <span className="font-orbitron font-bold text-cyber-purple tracking-wider">{item.company}</span>
                <span className="font-mono text-[10px] text-cyber-textSecondary uppercase tracking-widest">{item.type}</span>
              </div>
            </div>

            {/* CLEARANCE BADGE line */}
            <div className="w-full bg-cyber-purple py-1 text-center mt-6 shadow-[0_0_10px_#bf00ff]">
              <span className="font-orbitron font-bold text-black text-xs tracking-[0.2em] uppercase">EMPLOYEE CLEARANCE</span>
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col h-[calc(100%-120px)] relative z-10">
              <h2 className="font-rajdhani font-bold text-2xl text-cyber-textPrimary mb-1 uppercase">{item.role}</h2>
              <p className="font-mono text-xs text-cyber-textSecondary mb-4">{item.duration}</p>
              
              <div className="mt-2 mb-6 flex-grow">
                <h3 className="font-mono text-cyber-purple text-xs uppercase mb-2">Responsibilities</h3>
                <ul className="list-none space-y-2">
                  {item.description.map((desc, idx) => (
                    <li key={idx} className="font-mono text-sm text-cyber-textPrimary flex gap-2 leading-relaxed">
                       <span className="text-cyber-purple mt-[2px]">{">"}</span> <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <h3 className="font-mono text-cyber-purple text-xs uppercase mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple font-mono text-xs rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Barcode bottom */}
            <div className="absolute bottom-0 left-0 w-full h-8 flex justify-center items-end pb-2 gap-[2px] opacity-10 group-hover:opacity-30 transition-opacity z-0 pointer-events-none">
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
