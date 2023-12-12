/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}', "./node_modules/flowbite/**/*.js"],
  
  theme: {
    container:{
      center:true,
    },
    screens:{
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors:{
        "primary-green":'#0C7C6C',
        "primary-orange":'#FF6320',
        "bg-primary":'#FFFFFF',
        "footer-primary":'#111312',
        "footer-secondary":'#393B3A',
        "ofWhite-primary":'#858786',
        "ofWhite-secondary":'#CCCCCC',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}

