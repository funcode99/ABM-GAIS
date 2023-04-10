/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,vue}"],
  theme: {
    extend: {
      // ga kepake wkwk
      animation: {
        rotateup: 'rotateUp 1s linear'
      },
      keyframes: {
        slide: {
          '0%' : { marginLeft: '50px' },
          '100%' : { marginLeft: '100px' }
        },
        slideDown: {
          '0%' : { marginTop: '-40px'},
          '100%': { marginTop: '0px' }
        },
        slideUp: {
          '0%' : { marginTop: '0px'},
          '100%': { marginTop: '-40px' }
        },
        rotateDown: {
          '0%' : { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' }
        },
        rotateUp: {
          '0%': { transform: 'rotate(180deg)' },
          '100%' : { transform: 'rotate(0deg)' }
        }
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
}
