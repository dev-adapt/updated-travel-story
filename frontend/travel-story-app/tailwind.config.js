/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',  // Adjust according to your project structure
  ],
  theme: {
    fontFamily:{
      display:["Poppins","sans-serif"],
    },
    extend: {
      //colors used in project
      colors:{
        primary:"#05B6D3",
        secondary:"#EF863E"
      },
      backgroundImage:{
        'login-bg-img':"url('/src/assets/images/bg-image.png')",
         'signup-bg-img':"url('/src/assets/images/signup-bg-img.png')",
      }
    },
  },
  plugins: [],
}

