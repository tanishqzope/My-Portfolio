import { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  // Check localStorage for preferred state, default to muted due to browser auto-play policies
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('cyber-muted');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const audioCtxRef = useRef(null);
  const humOscillatorRef = useRef(null);
  const humGainRef = useRef(null);
  const bgmRef = useRef(null);

  // Initialize Web Audio API on first interaction if not muted
  useEffect(() => {
    if (!isMuted && !audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
  }, [isMuted]);

  // Handle background music
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.3; // 30% volume
      if (isMuted) {
        bgmRef.current.pause();
      } else {
        bgmRef.current.play().catch(e => console.log('BGM play blocked:', e));
      }
    }
  }, [isMuted]);

  // Handle ambient hum
  useEffect(() => {
    if (isMuted) {
      if (humGainRef.current) {
        humGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      return;
    }

    if (!audioCtxRef.current) return;

    // Create continuous low-frequency server hum
    if (!humOscillatorRef.current) {
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, audioCtxRef.current.currentTime); // Deep hum (55Hz)
      
      // Add subtle modulation/phasing
      const lfo = audioCtxRef.current.createOscillator();
      const lfoGain = audioCtxRef.current.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.2; // 0.2Hz sweep
      lfoGain.gain.value = 5;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      
      gain.gain.value = 0; // Start quiet
      osc.start();

      humOscillatorRef.current = osc;
      humGainRef.current = gain;
    }

    // Fade in
    humGainRef.current.gain.setTargetAtTime(0.05, audioCtxRef.current.currentTime, 1);

    return () => {
      // Don't fully disconnect on cleanup unless unmounting
    };
  }, [isMuted]);

  // Save preference
  useEffect(() => {
    localStorage.setItem('cyber-muted', JSON.stringify(isMuted));
  }, [isMuted]);

  // Expose sound triggers
  const playKeyboardClick = () => {
    if (isMuted || !audioCtxRef.current) return;
    
    // Synthesize a short, sharp mechanical click using white noise
    const ctx = audioCtxRef.current;
    
    // Resume context if suspended (Browser policy)
    if (ctx.state === 'suspended') ctx.resume();

    const bufferSize = ctx.sampleRate * 0.05; // 50ms buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Filter to sound like a chunky mechanical switch
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1000 + Math.random() * 500; // Vary slightly per click
    bandpass.Q.value = 1.0;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

    noiseSource.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start();
  };

  const playAccessGranted = () => {
    if (isMuted || !audioCtxRef.current) return;
    // Synthesize a soft two-tone success chime
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const playTone = (freq, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(880, now, 0.2); // A5
    playTone(1760, now + 0.15, 0.4); // A6
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    // Force resume of web audio if unmuting because of browser autoplay policies
    if (isMuted && audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playKeyboardClick, playAccessGranted }}>
      <audio ref={bgmRef} src="/bgm.mp3" loop preload="auto" />
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
