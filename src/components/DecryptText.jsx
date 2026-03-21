import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function DecryptText({ children, className, delay = 0 }) {
  const text = typeof children === 'string' ? children : '';
  const [displayText, setDisplayText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView || !text) return;

    let iteration = 0;
    let animationFrameId;

    const startTime = Date.now();

    const animate = () => {
      // Small artificial delay before starting
      if (Date.now() - startTime < delay) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      setDisplayText((prev) => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            // Reveal text sequentially left to right
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      // Controls speed of decryption
      iteration += 1 / 3;

      if (iteration < text.length) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(text); // Ensure final state is exactly the target text
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, text, delay]);

  // Initial render hides text until scrolled into view
  const initialText = !isInView ? text.replace(/[^\s]/g, '-') : displayText;

  return (
    <span ref={ref} className={className}>
      {initialText}
    </span>
  );
}
