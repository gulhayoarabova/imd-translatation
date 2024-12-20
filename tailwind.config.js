/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/preline/dist/*.js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      screens:{
        sm:"300px",
        md:"1000px"
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, rgba(204, 216, 242, 0), hsla(0, 0%, 100%, .4)), linear-gradient(180deg, #ccd8f2, #ebf2ff)',
        'bg2': 'linear-gradient(252.43deg, #D45B78 0.01%, #4B3862 101.01%)',
      },
      borderRadius: {
        'bl-30pc': '0 0 5% 5%', // Custom class for bottom left and bottom right radius
      },
      boxShadow: {
        'custom-shadow': '0px 17px 32px 0px rgba(0, 0, 0, 0.25)',
        'upload-shadow': '0px 0px 60px 0px rgba(2, 4, 69, 0.06)',
        'img-shadow': '#0000001A 0px 10px 15px -3px, #0000000D 0px 4px 6px -2px',
        'uploadShadow':'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
      },
      fontFamily: {
        inter: ['Roboto', 'sans-serif'],
      },
      backdropBlur: {
        '50': '50px',
      },
      colors: {
        'custom-pink': {
          DEFAULT: '#D45B78',  // Base color
          200: '#EAB8D1',      // Custom shade; adjust as necessary
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('preline/plugin'),
]
}