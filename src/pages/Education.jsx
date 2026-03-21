import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { education } from '../data/education';

export function TimelineItem({ data, isLeft, isExperience = false }) {
  const accentColor = isExperience ? 'cyber-purple' : 'cyber-cyan';
  const shadowColor = isExperience ? '#bf00ff' : '#00f0ff';
  
  return (
    <div className={`relative w-full flex justify-between items-center mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}>
      {/* Timeline Center line & Node */}
      <div className="absolute left-[-22px] md:left-1/2 md:-translate-x-1/2 h-full flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className={`w-4 h-4 rounded-full bg-${accentColor} z-10`}
          style={{ boxShadow: `0 0 15px ${shadowColor}` }}
        ></motion.div>
      </div>

      {/* Connection Line (Desktop) */}
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-2rem)] h-[2px] pointer-events-none ${isLeft ? 'right-[calc(50%+2rem)]' : 'left-[calc(50%+2rem)]'}`}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`h-full bg-${accentColor}/50 ${isLeft ? 'float-right' : 'float-left'}`}
        ></motion.div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block w-[calc(50%-3rem)]"></div>

      {/* Card */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`w-full md:w-[calc(50%-3rem)] bg-cyber-charcoal border border-cyber-border rounded-xl p-6 hover:-translate-y-2 transition-all duration-300 relative group
          hover:border-${accentColor}`}
        style={{ '--hover-shadow': shadowColor }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .group:hover { box-shadow: 0 0 15px var(--hover-shadow); }
        `}} />
        
        <div className={`absolute top-6 right-6 text-${accentColor}/50 group-hover:text-${accentColor} transition-colors`}>
          <GraduationCap size={24} />
        </div>
        
        <h3 className="font-rajdhani font-bold text-xl text-cyber-textPrimary mb-1 pr-8">{data.degree || data.role}</h3>
        <div className={`font-mono text-${accentColor} text-sm mb-3`}>{data.institution || data.company}</div>
        
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-cyber-textSecondary mb-4">
          <span className="bg-cyber-surface1 px-2 py-1 rounded border border-cyber-border">{data.duration}</span>
          <span className="text-cyber-green">{data.grade || data.type}</span>
          {data.location && <span className="flex items-center gap-1"><MapPin size={12} /> {data.location}</span>}
        </div>
        
        <div className="font-mono text-sm text-cyber-textPrimary opacity-80 leading-relaxed">
          {Array.isArray(data.description) ? (
            <ul className="list-none space-y-2">
              {data.description.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className={`text-${accentColor}`}>{">"}</span> {point}
                </li>
              ))}
            </ul>
          ) : (
             <p>{data.description}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Education() {
  return (
    <div className="w-full flex justify-center py-12 min-h-screen">
      <div className="w-full max-w-5xl flex flex-col">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary mb-4 tracking-wider text-glow-cyan text-center">
          EDUCATION
        </h1>
        
        <div className="flex justify-center mb-16">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 0.5 }}
            className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff]"
          />
        </div>

        <div className="relative w-full ml-6 md:ml-0">
          {/* Main Vertical Timeline Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="absolute left-[-14px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-transparent z-0"
          ></motion.div>

          <div className="flex flex-col relative z-10 w-full">
            {education.map((item, index) => (
              <TimelineItem key={item.id} data={item} isLeft={index % 2 !== 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
