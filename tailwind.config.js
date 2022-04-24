module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flexGrow: {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
