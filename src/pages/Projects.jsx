import { motion } from 'framer-motion';
import { ExternalLink, Github, TerminalSquare } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { projects } from '../data/projects';
import ServerRack3D from '../components/ServerRack3D';
import DecryptText from '../components/DecryptText';

export default function Projects() {
  return (
    <div className="w-full flex flex-col pt-12 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-cyber-textPrimary mb-4 tracking-wider text-glow-cyan uppercase">
            <DecryptText delay={200}>PROJECTS</DecryptText>
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 0.5 }}
            className="h-[3px] bg-cyan-purple shadow-[0_0_10px_#00f0ff] mb-4"
          />
          <p className="font-mono text-cyber-textSecondary max-w-lg">
            Deploying secure architectures and exploiting vulnerable ones. Here are a few things I've built.
          </p>
        </div>

        {/* 3D Server Rack Feature */}
        <div className="w-full md:w-1/3 h-64 border border-cyber-border rounded-xl bg-cyber-charcoal relative overflow-hidden group">
           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyber-cyan/10 to-transparent pointer-events-none"></div>
           <Canvas camera={{ position: [3, 2, 4], fov: 40 }}>
             <ambientLight intensity={0.5} />
             <directionalLight position={[10, 10, 5]} intensity={1} />
             <ServerRack3D />
             <OrbitControls enableZoom={false} autoRotate={false} />
           </Canvas>
           <div className="absolute bottom-2 right-2 font-mono text-[10px] text-cyber-textSecondary opacity-50 group-hover:opacity-100 transition-opacity">
             [INTERACTIVE_MODEL]
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`flex flex-col bg-cyber-charcoal border border-cyber-border rounded-xl overflow-hidden group hover:border-cyber-cyan hover:box-glow-cyan transition-all duration-300 relative ${project.featured ? 'lg:col-span-2' : ''}`}
          >
            {/* Scan Line effect on hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-cyan shadow-[0_0_10px_#00f0ff] opacity-0 group-hover:opacity-100 group-hover:animate-scanline z-20 pointer-events-none"></div>

            <div className={`flex flex-col ${project.featured ? 'lg:flex-row' : ''} h-full`}>
              {/* Image Area */}
              <div 
                className={`relative overflow-hidden glitch-hover ${project.featured ? 'lg:w-1/2' : 'w-full'} aspect-video lg:aspect-auto border-b lg:border-b-0 lg:border-r border-cyber-border group-hover:border-cyber-cyan/50 transition-colors`}
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-10 transition-all duration-700" />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-cyber-red text-cyber-textPrimary font-orbitron text-xs px-3 py-1 rounded animate-pulse shadow-[0_0_10px_#ff003c]">
                    FEATURED
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-charcoal to-transparent opacity-80 lg:opacity-0"></div>
              </div>

              {/* Text Area */}
              <div className={`flex flex-col p-6 lg:p-8 ${project.featured ? 'lg:w-1/2' : 'w-full'} h-full justify-between z-10`}>
                <div>
                  <div className="flex items-center gap-2 mb-2 w-full">
                    <TerminalSquare size={20} className="text-cyber-cyan shrink-0" />
                    <h2 className="font-rajdhani font-bold text-2xl text-cyber-textPrimary truncate">{project.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-cyber-green shadow-[0_0_8px_#00ff41]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]'}`}></div>
                    <span className="font-mono text-xs text-cyber-textSecondary">{project.status}</span>
                  </div>
                  
                  <p className="font-mono text-cyber-textPrimary text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map(tech => (
                      <span key={tech} className="bg-cyber-surface1 border border-cyber-border text-cyber-textSecondary font-mono text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-auto">
                  <a href={project.liveUrl} className="flex-1 text-center bg-transparent border border-cyber-cyan text-cyber-cyan font-orbitron uppercase text-sm py-2 px-4 hover:bg-cyber-cyan hover:text-black transition-colors flex items-center justify-center gap-2">
                    View Project <ExternalLink size={14} />
                  </a>
                  <a href={project.githubUrl} className="flex-1 text-center bg-cyber-surface1 border border-cyber-border text-cyber-textPrimary font-orbitron uppercase text-sm py-2 px-4 hover:border-cyber-purple hover:text-cyber-purple transition-colors flex items-center justify-center gap-2">
                    GitHub <Github size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
