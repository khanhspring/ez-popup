/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0.1 },
        },
        'fade-in': {
          '0%': { opacity: 0.1 },
          '100%': { opacity:1 },
        }
      },
      animation: {
        'fade-out': 'fade-out 0.2s ease-in-out forwards',
        'fade-in': 'fade-in 0.2s ease-in-out forwards'
      }
    },
  },
  plugins: [],
}
