/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        mogra: ["Mogra", "cursive"],
        Homenaje : ["Homenaje", "serif"],
      },
      width: ["responsive"],
      height: ["responsive"],
      animation: {
        rotBGimg: 'rotateBorder 4s linear infinite',
      },
      keyframes: {
        rotateBorder: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
    },
  },
  plugins: [],
}
}
