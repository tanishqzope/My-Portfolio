import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <div className="relative pt-[70px] min-h-[calc(100vh-100px)] w-full flex flex-col items-center">
      {/* Scan Line Wipe out transition */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-[3px] bg-cyber-cyan shadow-[0_0_15px_#00f0ff] z-40 pointer-events-none"
        initial={{ top: '-10px', opacity: 1 }}
        animate={{ top: '100vh', opacity: 0 }}
        exit={{ top: '100vh', opacity: 0 }}
        transition={{ duration: 0.8, ease: 'linear' }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, staggerChildren: 0.05, ease: 'easeOut', delay: 0.2 }}
        className="h-full w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-grow"
      >
        {children}
      </motion.div>
    </div>
  );
}
