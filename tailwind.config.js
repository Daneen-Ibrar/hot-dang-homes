/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Aboreto", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
      colors: {
        navy: {
          900: '#1E293B' // Adjust this to the exact navy color code you want
        },
        pink: {
          500: '#EC4899', // Adjust to the exact pink shade you prefer
          600: '#BE185D',  // A slightly darker pink for hover states
          700: "#DB2777"
        }
      }
    }
  },
  plugins: [],
};
