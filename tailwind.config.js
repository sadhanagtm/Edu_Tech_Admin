/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      height:{
        '100':"34rem"

      },

      backgroundColor:{
        'primary':"#04413D",
        'ternary':"#68428A"

        
        
      },

 
    
      
     
    },
  },
  plugins: [],
}

