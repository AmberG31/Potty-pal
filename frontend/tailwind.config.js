/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F7942C',
      },
      backgroundImage: {
        'form-bg': "url('../public/bg.jpeg')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
