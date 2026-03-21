import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SEQUENCE = [
  "> Initializing secure connection...",
  "> Encrypting data channels... [OK]",
  "> Loading portfolio modules... [OK]",
  "> Authenticating user access... [GRANTED]",
  "> Welcome, Visitor. Access Level: PUBLIC",
  "> Loading TANISHQ ZOPE's Portfolio..."
];

export default function LoadingScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    
    // Check if reduce motion is preferred
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const typeLine = () => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, BOOT_SEQUENCE[currentLine]]);
        currentLine++;
        setTimeout(typeLine, prefersReduced ? 0 : 200);
      } else {
        setShowProgress(true);
      }
    };
    
    setTimeout(typeLine, prefersReduced ? 0 : 500);
  }, []);

  useEffect(() => {
    if (showProgress) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = prefersReduced ? 0 : 1500;
      const interval = 30;
      const steps = duration / interval;
      let currentStep = 0;

      if (steps === 0) {
        setProgress(100);
        setTimeout(() => setIsFinished(true), 100);
        return;
      }

      const timer = setInterval(() => {
        currentStep++;
        setProgress(Math.min(100, (currentStep / steps) * 100));
        if (currentStep >= steps) {
          clearInterval(timer);
          setTimeout(() => setIsFinished(true), 400);
        }
      }, interval);
      return () => clearInterval(timer);
    }
  }, [showProgress]);

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        onComplete();
      }, 600);
    }
  }, [isFinished, onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-cyber-green font-mono overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Split Door Effect Elements */}
        <motion.div 
          className="absolute top-0 bottom-0 left-0 w-1/2 bg-black border-r border-cyber-cyan box-glow-cyan z-10"
          animate={isFinished ? { x: '-100%' } : { x: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div 
          className="absolute top-0 bottom-0 right-0 w-1/2 bg-black border-l border-cyber-cyan box-glow-cyan z-10"
          animate={isFinished ? { x: '100%' } : { x: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        <motion.div 
          className="relative z-20 max-w-xl w-full p-8"
          animate={isFinished ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-2 mb-8 h-48 justify-end text-left">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm md:text-base text-glow-green"
              >
                {line}
              </motion.div>
            ))}
            {lines.length < BOOT_SEQUENCE.length && (
              <div className="w-2 h-4 bg-cyber-green animate-blink mt-1"></div>
            )}
          </div>
          
          {showProgress && (
            <div className="w-full h-1 bg-cyber-charcoal rounded overflow-hidden mt-8 border border-cyber-cyan/30">
              <motion.div 
                className="h-full bg-cyan-purple shadow-[0_0_10px_#00f0ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
