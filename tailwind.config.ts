import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        'bg-elev': '#12121A',
        border: '#1F1F2E',
        text: '#E8E8F0',
        muted: '#8B8B9E',
        cyan: '#22D3EE',
        violet: '#7C3AED',
        magenta: '#E879F9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
