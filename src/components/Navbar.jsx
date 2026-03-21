import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Moon, Sun, Volume2, VolumeX, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';

const LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { 
    name: 'Certification', 
    subLinks: [
      { name: 'Courses', path: '/certification/courses' },
      { name: 'Workshops', path: '/certification/workshops' }
    ]
  },
  { name: 'Projects', path: '/projects' },
  { name: 'Education', path: '/education' },
  { 
    name: 'Experience', 
    subLinks: [
      { name: 'Industry Experience', path: '/experience/industry' },
      { name: 'Internships', path: '/experience/internships' }
    ]
  },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-cyber-cyan border-opacity-30 ${
          scrolled 
            ? `h-[55px] shadow-[0_4px_20px_rgba(0,240,255,0.1)] ${theme === 'cyber' ? 'bg-[#0a0a0add]' : 'bg-[#f5f7fadd]'}` 
            : `h-[70px] ${theme === 'cyber' ? 'bg-[#0a0a0ad9]' : 'bg-[#f5f7fad9]'}`
        }`}
      >
        <div className="flex items-center justify-between h-full px-4 md:px-8 max-w-7xl mx-auto">
          {/* LEFT: Logo */}
          <NavLink 
            to="/" 
            className="flex items-center gap-2 group relative"
            onClick={(e) => {
              if (!window.logoClicks) window.logoClicks = 0;
              window.logoClicks++;
              if (window.logoClicks >= 10) {
                e.currentTarget.classList.add('animate-[spin_0.5s_linear_infinite]');
                setTimeout(() => {
                  e.currentTarget.classList.remove('animate-[spin_0.5s_linear_infinite]');
                  window.logoClicks = 0;
                }, 5000);
              }
            }}
          >
            <span className="font-orbitron font-bold text-cyber-cyan text-lg md:text-xl tracking-wider group-hover:animate-glitch">
              TANISHQ ZOPE
            </span>
          </NavLink>

          {/* CENTER: Desktop Links */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {LINKS.map(link => (
              link.subLinks ? (
                <div key={link.name} className="relative group">
                  <div className="font-rajdhani uppercase tracking-widest text-sm transition-all duration-200 text-cyber-textSecondary group-hover:text-cyber-cyan cursor-pointer py-2">
                    {link.name}
                  </div>
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-0 w-48 backdrop-blur-md border border-cyber-cyan/30 rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_4px_20px_rgba(0,240,255,0.1)] z-50 ${theme === 'cyber' ? 'bg-[#0a0a0af2]' : 'bg-[#f5f7faf2]'}`}>
                    {link.subLinks.map(subLink => (
                      <NavLink
                        key={subLink.name}
                        to={subLink.path}
                        className={({isActive}) => `
                          block px-4 py-2 font-rajdhani uppercase tracking-widest text-sm transition-all duration-200
                          ${isActive ? 'text-cyber-cyan bg-cyber-cyan/10' : 'text-cyber-textSecondary hover:text-cyber-cyan hover:bg-white/5'}
                        `}
                      >
                        {subLink.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink 
                  key={link.name} 
                  to={link.path}
                  className={({isActive}) => `
                    relative font-rajdhani uppercase tracking-widest text-sm transition-all duration-200 group
                    ${isActive ? 'text-cyber-cyan' : 'text-cyber-textSecondary hover:text-cyber-cyan hover:scale-105'}
                  `}
                >
                  {({ isActive }) => (
                    <div className="relative pb-1">
                      {link.name}
                      {/* Hover Underline & Active State */}
                      <div className={`absolute bottom-0 left-0 h-[2px] bg-cyber-cyan shadow-[0_0_5px_#00f0ff] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                      {isActive && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyber-cyan rotate-45 animate-pulse shadow-[0_0_5px_#00f0ff]"></div>}
                    </div>
                  )}
                </NavLink>
              )
            ))}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4">
            <NavLink 
              to="/terminal"
              className="text-cyber-textSecondary hover:text-cyber-cyan transition-colors"
              title="Open Interactive Terminal"
            >
              <Terminal size={20} />
            </NavLink>

            {/* Sound Toggle Button */}
            <button 
              onClick={toggleMute}
              className="text-cyber-textSecondary hover:text-cyber-cyan transition-colors"
              title={isMuted ? "Unmute Soundscapes" : "Mute Soundscapes"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="text-cyber-textSecondary hover:text-cyber-cyan transition-colors"
              title={`Switch to ${theme === 'cyber' ? 'Corporate' : 'Cyber'} Mode`}
            >
              {theme === 'cyber' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              className="lg:hidden text-cyber-cyan p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-0 z-[100] backdrop-blur-xl flex flex-col items-center justify-center overflow-y-auto pt-20 pb-10 ${theme === 'cyber' ? 'bg-[#0a0a0af2]' : 'bg-[#f5f7faf2]'}`}
          >
            <button 
              className="absolute top-6 right-6 text-cyber-cyan p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-6 w-full">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full text-center"
                >
                  {link.subLinks ? (
                    <div className="flex flex-col items-center">
                      <div className="py-2 font-orbitron text-2xl tracking-widest uppercase text-cyber-textSecondary mb-2">
                        {link.name}
                      </div>
                      <div className="flex flex-col gap-3">
                        {link.subLinks.map(subLink => (
                          <NavLink
                            key={subLink.name}
                            to={subLink.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({isActive}) => `
                              block py-1 font-rajdhani text-xl tracking-widest uppercase transition-colors
                              ${isActive ? 'text-cyber-cyan text-glow-cyan' : 'text-cyber-textSecondary hover:text-cyber-textPrimary'}
                            `}
                          >
                            {subLink.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink 
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({isActive}) => `
                        block py-2 font-orbitron text-2xl tracking-widest uppercase transition-colors
                        ${isActive ? 'text-cyber-cyan text-glow-cyan' : 'text-cyber-textSecondary hover:text-cyber-textPrimary'}
                      `}
                    >
                      {link.name}
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
