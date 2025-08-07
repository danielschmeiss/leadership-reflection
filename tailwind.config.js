/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
