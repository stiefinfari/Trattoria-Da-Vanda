/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbfaf7',
          100: '#f4f1ea',
          200: '#e9e1d2',
          300: '#d6c3a8',
          400: '#b8956b',
          500: '#9b6f46',
          600: '#845a3a',
          700: '#6c4832',
          800: '#573b2a',
          900: '#3a281d',
          950: '#1b120d',
        },
        rustic: {
          50: '#fbfaf7',
          100: '#f4f1ea',
          200: '#e9e1d2',
          300: '#d6c3a8',
          400: '#b8956b',
          500: '#9b6f46',
          600: '#845a3a',
          700: '#6c4832',
          800: '#573b2a',
          900: '#3a281d',
          950: '#1b120d',
        },
        sage: {
          50: '#f3f7f4',
          100: '#e6efe7',
          200: '#ccdfd0',
          300: '#a9c6b0',
          400: '#7ea58a',
          500: '#5f8b6f',
          600: '#4a6f57',
          700: '#3c5a48',
          800: '#324a3c',
          900: '#2a3e33',
          950: '#131f18',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 14px 40px rgba(17, 12, 8, 0.08)',
        elevated: '0 24px 80px rgba(17, 12, 8, 0.16)',
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
      }
    },
  },
  plugins: [],
}
