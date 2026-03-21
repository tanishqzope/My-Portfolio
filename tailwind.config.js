/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          base: 'var(--color-base)',
          navy: 'var(--color-navy)',
          charcoal: 'var(--color-charcoal)',
          cyan: 'var(--color-cyan)',
          green: 'var(--color-green)',
          purple: 'var(--color-purple)',
          red: 'var(--color-red)',
          textPrimary: 'var(--color-text-primary)',
          textSecondary: 'var(--color-text-secondary)',
          surface1: 'var(--color-surface-1)',
          surface2: 'var(--color-surface-2)',
          border: 'var(--color-border)',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['Share Tech Mono', 'Fira Code', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      backgroundImage: {
        'cyan-purple': 'linear-gradient(to right, var(--color-cyan), var(--color-purple))',
        'radial-navy': 'radial-gradient(circle at center, var(--color-navy) 0%, var(--color-base) 100%)',
      },
      animation: {
        'glitch': 'glitch 0.3s ease-in-out infinite alternate',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'shake': 'shake 0.3s ease-in-out',
        'shine': 'shine 2s infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(-1px, -1px)' },
          '60%': { transform: 'translate(2px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        typewriter: {
          to: { left: '100%' }
        },
        blink: {
          '50%': { borderColor: 'transparent' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
        shine: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(400%)' },
        }
      }
    },
  },
  plugins: [],
}
