import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    let timeoutId;
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));

      // Add to trail (only every few pixels to avoid too many elements)
      setTrail(prev => {
        const last = prev[prev.length - 1];
        if (!last || Math.hypot(last.x - e.clientX, last.y - e.clientY) > 15) {
          const newTrail = [...prev, { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY, char: randomChar }];
          if (newTrail.length > 25) newTrail.shift();
          return newTrail;
        }
        return prev;
      });
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setTrail([]);
      }, 500);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"]') || window.getComputedStyle(e.target).cursor === 'pointer') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      clearTimeout(timeoutId);
    };
  }, []);

  // Slowly remove trail entries so they fade naturally even if mouse stops
  useEffect(() => {
    if (trail.length === 0) return;
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, [trail]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Matrix Text Trail */}
      {trail.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.8, y: t.y, x: t.x }}
          animate={{ opacity: 0, y: t.y + 40 }}
          transition={{ duration: 0.8, ease: "linear" }}
          className="fixed top-0 left-0 pointer-events-none z-[9990] font-mono text-sm font-bold text-cyber-green"
          style={{ textShadow: theme === 'cyber' ? '0 0 5px #00ff41' : 'none', marginLeft: '-4px', marginTop: '10px' }}
        >
          {t.char}
        </motion.div>
      ))}

      {/* Main Block Cursor */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-mono ${theme === 'cyber' ? 'mix-blend-screen' : ''}`}
        animate={{
          x: mousePosition.x - (isHovering ? 12 : 6),
          y: mousePosition.y - (isHovering ? 12 : 12),
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      >
        <div 
          className="text-cyber-green animate-pulse" 
          style={{ 
            textShadow: theme === 'cyber' ? '0 0 10px #00ff41, 0 0 20px #00ff41' : 'none',
            fontSize: isHovering ? '16px' : '18px'
          }}
        >
          {isHovering ? '[_]' : '█'}
        </div>
      </motion.div>
    </>
  );
}
