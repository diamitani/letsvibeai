import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1F44', 900: '#071531', 800: '#102A57', 700: '#163466' },
        ink: '#0B1F44',
        mist: '#F3F6FA',
        signal: '#3B82F6',
        violet: '#8B5CF6',
        growth: '#10B991',
        cyan: '#20C7D9',
        line: '#E3E9F2',
        muted: '#5A6B86',
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        site: '80rem',
        prose: '46rem',
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.04375rem', fontWeight: '700' }],
        display: ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.12', letterSpacing: '-0.035rem', fontWeight: '700' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(7,27,58,.06), 0 8px 24px -12px rgba(7,27,58,.18)',
        lift: '0 2px 4px rgba(7,27,58,.08), 0 24px 48px -20px rgba(7,27,58,.35)',
      },
    },
  },
  plugins: [],
};

export default config;
