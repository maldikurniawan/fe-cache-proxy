/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          base: "#378ecc",
          baseHover: "#2e74a6",
          baseActive: "#235c84",
          dark: "#3c73bc",
          light: "#34b1e7",
        },
      },
    },
  },
  plugins: [],
}