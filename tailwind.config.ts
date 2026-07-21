import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F7F4', // warm white — page background
        surface: '#FFFFFF', // pure white — cards / panels
        ink: '#1C1C1C', // charcoal — primary text
        muted: '#7B7B7B', // muted grey — secondary text
        gold: '#B89065', // warm gold — accent, used sparingly
        'gold-soft': '#D9C4A9',
        line: 'rgba(0,0,0,0.08)', // hairline borders
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      fontSize: {
        // fluid editorial scale
        caption: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'display-sm': ['clamp(2.2rem, 5vw, 3.4rem)', { lineHeight: '1.02' }],
        'display-md': ['clamp(2.8rem, 7vw, 5rem)', { lineHeight: '0.98' }],
        'display-lg': ['clamp(3.4rem, 11vw, 9rem)', { lineHeight: '0.92' }],
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
      },
      maxWidth: {
        editorial: '78rem',
      },
      keyframes: {
        'grain-shift': {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-3%,-4%)' },
          '30%': { transform: 'translate(2%,-2%)' },
          '50%': { transform: 'translate(-1%,3%)' },
          '70%': { transform: 'translate(3%,1%)' },
          '90%': { transform: 'translate(-2%,2%)' },
        },
      },
      animation: {
        grain: 'grain-shift 8s steps(6) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
