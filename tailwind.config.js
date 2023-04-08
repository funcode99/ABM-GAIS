/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "Montserrat": ["'Montserrat', sans-serif;"],
      "Poppins": ["'Poppins', sans-serif;"],
      "Fira": ["'Fira Sans', sans-serif;"],
      "Inter": ["'Inter', sans-serif;"],
    },
    extend: {
      colors: {
        "white": "#FFFFFF",
        "black": "#000000",
      }
    },
  },
  plugins: [require("daisyui")],
}

