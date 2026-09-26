import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        cyan: {
          glow: '#22d3ee',
        },
        violet: {
          glow: '#8b5cf6',
        },
        amber: {
          glow: '#f59e0b',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.24)',
        'glass-light': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        glow: '0 0 40px -8px rgba(34, 211, 238, 0.35)',
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        drift: 'drift 22s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(12%, -10%) scale(1.15)' },
          '66%': { transform: 'translate(-10%, 12%) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
