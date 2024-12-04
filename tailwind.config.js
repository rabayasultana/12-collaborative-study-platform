/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#622569",
      },
      fontFamily: {
        lato: '"Lato", sans-serif',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

