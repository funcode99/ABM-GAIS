/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%' : { marginLeft: '50px' },
          '100%' : { marginLeft: '100px' }
        }
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
}
