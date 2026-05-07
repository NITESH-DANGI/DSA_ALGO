import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080c10',
        surface: '#0e1318',
        'surface-2': '#141c24',
        accent: '#00ffb4',
        'accent-red': '#ff4e6a',
        'accent-purple': '#7c6fff',
        muted: '#6a7f94',
        'code-bg': '#0a1520',
      },
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
