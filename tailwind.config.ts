import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // pulled from logo vibe: deep navy + soft peach
          navy: '#2D3A8C',
          peach: '#F4B7A6',
          mint: '#BFE3DB',
        },
        surface: {
          50: '#FAFBFA',
          100: '#F5F7F6',
          200: '#EDEFEF',
        }
      },
      borderRadius: {
        '2xl': '1.25rem',
        'blob': '32px'
      },
      boxShadow: {
        soft: '0 12px 32px -16px rgba(20,24,40,.15)',
      },
      keyframes: {
        fadeUp: { '0%':{opacity:0,transform:'translateY(10px)'}, '100%':{opacity:1,transform:'translateY(0)'} },
        splashFade: { '0%':{opacity:1}, '100%':{opacity:0} }
      },
      animation: {
        fadeUp: 'fadeUp .6s ease-out both',
        splashFade: 'splashFade .6s ease-out both',
      }
    }
  },
  plugins: []
}
export default config
