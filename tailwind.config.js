/** @type {import('tailwindcss').Config} */
// LetsVibeAI brand tokens (see letsvibeai-brand-guidelines.md)
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#071B3A', 900: '#050F24', 800: '#0A2148', 700: '#10294F' },
        ink: '#10213F',
        mist: '#F4F7FB',
        signal: '#2F80ED',
        violet: '#7C5CFC',
        growth: '#34D399',
        cyan: '#20C7D9',
        line: '#E3E9F2',
        muted: '#5A6B86',
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '1200px' },
      boxShadow: {
        card: '0 1px 2px rgba(7,27,58,.06), 0 8px 24px -12px rgba(7,27,58,.18)',
        lift: '0 2px 4px rgba(7,27,58,.08), 0 24px 48px -20px rgba(7,27,58,.35)',
      },
    },
  },
  plugins: [],
};
