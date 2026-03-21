import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ChevronDown, Download, ArrowRight, Github, Linkedin, Twitter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Globe from '../components/Globe';
import DecryptText from '../components/DecryptText';

const TITLES = [
  "Cybersecurity Enthusiast",
  "Ethical Hacker in Training",
  "Security Researcher",
  "CTF Player",
  "Digital Forensics Learner",
  "Bug Bounty Hunter"
];

const TICKER_ITEMS = [
  "🔒 Completed Workshop In IIT Bombay",
  "🏆 Have DCSC Certificate",
  "📜 Earned DCjSP Certificate",
  "💻 Published new tool on GitHub"
];

export default function Home() {
  const navigate = useNavigate();
  const [titleIndex, setTitleIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 4000); 

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(titleInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex justify-center -mt-8 px-0">
    <div className="w-full min-h-screen flex flex-col relative top-0 px-0 sm:px-0 lg:px-0">
      {/* First Fold */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* 3D Globe Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <Globe />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        {/* Floating Social Bar (Desktop) */}
        <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
          {[
            { name: 'GitHub', icon: <Github size={18} />, url: 'https://github.com/tanishqzope' },
            { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/tanishqzope' },
            { name: 'X', icon: <X size={18} />, url: 'https://x.com/tanishqzope' }
          ].map((platform) => (
            <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-cyber-textSecondary rounded flex items-center justify-center text-cyber-textSecondary hover:text-cyber-cyan hover:border-cyber-cyan hover:box-glow-cyan transition-all group relative">
              {platform.icon}
              <div className="absolute left-12 bg-cyber-charcoal border border-cyber-cyan px-2 py-1 text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                {platform.name}
              </div>
            </a>
          ))}
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="overflow-hidden whitespace-nowrap mb-2 flex justify-center w-full"
          >
            <p className="font-mono text-cyber-green text-sm md:text-base">
              &gt; Hello, World. I am
            </p>
          </motion.div>

          <h1 className="font-orbitron font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cyber-textPrimary mb-2 tracking-wider animate-glitch text-glow-cyan" style={{ animationDuration: '3s' }}>
            <DecryptText>
              TANISHQ ZOPE
            </DecryptText>
          </h1>

          <div className="h-8 md:h-10 overflow-hidden relative w-full flex justify-center mt-2 mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIndex}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(4px)' }}
                transition={{ duration: 0.4 }}
                className="absolute font-rajdhani text-xl md:text-2xl text-cyber-cyan tracking-widest uppercase font-semibold"
              >
                {TITLES[titleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-mono text-cyber-textSecondary text-sm md:text-base max-w-lg mb-12"
          >
            Securing the digital frontier, one vulnerability at a time.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => navigate('/about')}
              className="group relative px-8 py-3 bg-transparent border-2 border-cyber-cyan font-orbitron uppercase text-cyber-cyan tracking-wider overflow-hidden hover:text-black transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,240,255,0.2)]"
            >
              <div className="absolute inset-0 w-0 bg-cyber-cyan group-hover:w-full transition-all duration-300 ease-out z-[-1]"></div>
              <span className="flex items-center gap-2">
                Explore Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <a 
              href="/resume.pdf"
              target="_blank" rel="noopener noreferrer"
              className="group relative px-8 py-3 bg-cyan-purple border-none font-orbitron uppercase text-cyber-textPrimary tracking-wider box-glow-purple transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 bg-cyan-purple opacity-0 group-hover:opacity-100 transition-opacity blur-md z-[-1]"></div>
              <span className="flex items-center gap-2">
                Download Resume <Download size={16} className="group-hover:translate-y-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute top-10 right-10 w-2 h-2 opacity-0 hover:opacity-100 bg-cyber-red rounded-full cursor-pointer z-50 transition-all duration-300"
          onClick={() => {
             const event = new KeyboardEvent('keydown', { key: '`' });
             window.dispatchEvent(event);
          }}
          title="Hidden Access Point"
        />

        <motion.div 
          animate={{ opacity: scrolled ? 0 : 1 }}
          className="absolute bottom-10 flex flex-col items-center justify-center gap-2 z-10 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="text-cyber-cyan" size={24} />
          </motion.div>
          <span className="font-mono text-xs text-cyber-textSecondary">Scroll to explore</span>
        </motion.div>
      </section>

      {/* Stats Fold & Marquee */}
      <section className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-cyber-charcoal py-16 border-t border-b border-cyber-cyan/30 z-10 flex flex-col items-center">
        <div className="max-w-7xl mx-auto w-full px-4 mb-16 flex flex-wrap justify-center gap-6">
          {[
            { label: "Certifications", value: "14" },
            { label: "Projects", value: "14" },
            { label: "Industry Experience", value: "5M" },
            { label: "CTFs Played", value: "20+" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-cyber-base border-l-4 border-cyber-cyan p-6 rounded min-w-[200px] hover:-translate-y-2 transition-transform shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:box-glow-cyan"
            >
              <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-cyber-cyan mb-2">{stat.value}</h3>
              <p className="font-mono text-cyber-textSecondary text-sm uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="w-full bg-cyber-charcoal border-y border-cyber-purple py-3 overflow-hidden whitespace-nowrap relative flex">
          <motion.div 
            className="flex min-w-max"
            animate={{ x: [0, "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          >
            {/* Double array length for seamless scroll */}
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="font-mono text-cyber-cyan mx-8 text-sm md:text-base">
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
    </div>
  );
}
