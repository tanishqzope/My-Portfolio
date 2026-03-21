import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const BGMPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // We start paused, as auto-play is often blocked by browsers
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // 30% volume
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        loop
        preload="auto"
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 animate-pulse" />
        ) : (
          <VolumeX className="w-6 h-6 opacity-60" />
        )}
      </motion.button>
    </div>
  );
};

export default BGMPlayer;
