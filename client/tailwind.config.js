/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#fde047',
          dark: '#f59e0b',
        },
        purple: {
          deep: '#0d021a',
          mid: '#2c1a4d',
          light: '#4f3a7a',
        },
        'text-main': '#e5e7eb',
        'text-muted': '#9ca3af',
      },
      gridTemplateColumns: {
        // Add a 13-column grid for the 78 cards (13 * 6 rows)
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      animation: {
        'cosmic-bg': 'cosmic-bg 20s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'reading-reveal': 'readingReveal 1.2s ease-out forwards',
      },
      keyframes: {
        'cosmic-bg': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          from: { textShadow: '0 0 10px rgba(253, 224, 71, 0.4), 0 0 4px rgba(253, 224, 71, 0.3)' },
          to: { textShadow: '0 0 25px rgba(253, 224, 71, 0.6), 0 0 10px rgba(253, 224, 71, 0.5)' },
        },
        readingReveal: {
            from: {
                opacity: 0,
                transform: 'translateY(30px) scale(0.98)',
            },
            to: {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
            }
        }
      }
    },
  },
  plugins: [],
}