/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],

  theme: {
    extend: {
      fontFamily:{
        Poppins: ['Poppins', 'sans-serif'],
        ScopeOne: ['Scope One', 'serif'],
        Inika: ['Inika', 'serif']
      }
    },
  },
  plugins: [],
}

