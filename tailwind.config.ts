import type { Config } from 'tailwindcss'


const config: Config = {
content: [
'./app/**/*.{ts,tsx}',
'./components/**/*.{ts,tsx}'
],
theme: {
extend: {
colors: {
brand: {
50: '#f0f8f6',
100: '#d9efe9',
200: '#b3dfd3',
300: '#8dcfbd',
400: '#66bfa7',
500: '#40af91',
600: '#339274',
700: '#277558',
800: '#1a583c',
900: '#0e3b23'
}
},
borderRadius: {
'2xl': '1.25rem'
},
boxShadow: {
soft: '0 10px 30px -10px rgba(0,0,0,0.25)'
}
}
},
plugins: []
}
export default config