/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        openclass: {
          orange: '#ec4909',
          'orange-hover': '#d43f05',
          'orange-light': '#ec49091a',
          'orange-border': '#ec49094d',
          navy: '#020335',
          dark: '#101b24',
          canvas: '#f7f4f2',
          surface: '#ffffff',
          muted: '#4a4d4f',
          border: '#4a4d4f1f',
          yellow: '#fcd554',
        },
        lexio: {
          canvas: '#f7f4f2',
          surface: '#ffffff',
          dark: '#101b24',
          muted: '#4a4d4f',
          border: '#4a4d4f1f',
          coral: '#ec4909',
          'coral-hover': '#d43f05',
          peach: '#fbe1ce',
          'peach-border': '#ec49094d',
          sage: '#C4DAC8',
          periwinkle: '#E1E3F6',
          gold: '#fcd554',
          blue: '#2F80ED',
        },
        brand: {
          coral: '#ec4909',
          emerald: '#34D399',
          cyan: '#20C7D9',
          sky: '#2F80ED',
          violet: '#7C5CFC',
        }
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Hanken Grotesk"', 'Inter', 'sans-serif'],
        heading: ['"Hanken Grotesk"', 'sans-serif'],
        serif: ['"DM Serif Text"', 'serif'],
        body: ['Inter', '"Hanken Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

