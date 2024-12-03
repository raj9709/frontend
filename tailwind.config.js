/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:"be95c4",
        primary: "#2B85FF",
        secondary: "EF863E",
      }
    },
  },
  plugins: [],
}

