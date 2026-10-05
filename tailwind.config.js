/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        institutional: {
          navy: '#071B3A',
          blue: '#2F80ED',
          green: '#34D399',
          violet: '#7C5CFC',
          cyan: '#20C7D9',
          mist: '#F4F7FB',
          ink: '#10213F',
          border: '#E2E8F0',
        },
        brand: {
          emerald: '#34D399',
          cyan: '#20C7D9',
          sky: '#2F80ED',
          violet: '#7C5CFC',
        }
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
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

