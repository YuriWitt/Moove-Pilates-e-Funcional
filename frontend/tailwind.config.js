/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f6fb',
          100: '#e7ecf6',
          200: '#c7d0e6',
          600: '#0b265c',
          700: '#061a46',
          800: '#00103b',
          900: '#000a24',
        },
        gold: {
          50: '#faf7e9',
          100: '#f0e7bd',
          300: '#d2c164',
          400: '#b8a744',
          500: '#a0862f',
          600: '#8d6f23',
          700: '#744d0f',
          800: '#523509',
        },
        cream: {
          50: '#fcfaf5',
          100: '#f7f3e8',
          200: '#eee6d4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
