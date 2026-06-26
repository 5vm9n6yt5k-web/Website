/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"MilkyWalky"', 'Georgia', 'serif'],
        ui: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        ink: '#0c0b0a',
        paper: '#f5f3ef',
        mid: '#888480',
        light: '#d8d4cf',
        dim: '#3a3835',
      },
      letterSpacing: {
        widest: '0.22em',
        ultra: '0.35em',
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
