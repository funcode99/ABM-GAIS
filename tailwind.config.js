/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      JakartaSans: ["'Plus Jakarta Sans', sans-serif;"],
    },
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        green: "#66AD2D",
        red: "#F04438",
        "red-star": "#F5333F",
        blue: "#015289",
        "blue-button": "#1F7793",
        primary: "#005289",
        secondary: "#1F7793",
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}
