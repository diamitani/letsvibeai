/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lexio: {
          canvas: '#F8F3EC',
          surface: '#FFFFFF',
          dark: '#281010',
          muted: '#706B67',
          border: '#EAE3D9',
          coral: '#FA5929',
          'coral-hover': '#E0491B',
          peach: '#FBE1CE',
          'peach-border': '#FCAA91',
          sage: '#C4DAC8',
          periwinkle: '#E1E3F6',
          gold: '#FEBF03',
          blue: '#2F80ED',
        },
        institutional: {
          navy: '#071B3A',
          blue: '#2F80ED',
          green: '#34D399',
          violet: '#7C5CFC',
          cyan: '#20C7D9',
          mist: '#F8F3EC',
          ink: '#281010',
          border: '#EAE3D9',
        },
        brand: {
          coral: '#FA5929',
          emerald: '#34D399',
          cyan: '#20C7D9',
          sky: '#2F80ED',
          violet: '#7C5CFC',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'Inter', 'sans-serif'],
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

