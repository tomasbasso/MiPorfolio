import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#060912',
        'navy-2': '#0C1220',
        'line-dark': '#1A2336',
        brand: '#0A60FE',
        'brand-soft': '#5B95FF',
        white: '#FEFEFE',
        paper: '#F5F7FB',
        'paper-2': '#FFFFFF',
        ink: '#0B1222',
        'ink-soft': '#56607A',
        mist: '#8A94A8',
        'line-light': '#E3E8F1',
        wa: '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        frame: '0 30px 60px -20px rgba(11, 18, 34, 0.22), 0 12px 24px -12px rgba(11, 18, 34, 0.12)',
        'frame-dark': '0 40px 80px -24px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(91, 149, 255, 0.14)',
      },
    },
  },
  plugins: [],
}

export default config
