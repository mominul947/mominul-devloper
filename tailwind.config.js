/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#12121a',
        'surface-2': '#1a1a2e',
        primary: '#8b5cf6',
        'primary-dark': '#6d28d9',
        'primary-light': '#a78bfa',
        secondary: '#06b6d4',
        'secondary-dark': '#0891b2',
        accent: '#3b82f6',
        'neon-purple': '#8b5cf6',
        'neon-cyan': '#06b6d4',
        'neon-blue': '#3b82f6',
        'neon-pink': '#ec4899',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a0a2e 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(6,182,212,0.05) 100%)',
        'neon-gradient': 'linear-gradient(90deg, #8b5cf6, #06b6d4, #3b82f6)',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.2)',
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.2)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
        'card': '0 20px 60px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typewriter': 'typewriter 3s steps(30) forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
