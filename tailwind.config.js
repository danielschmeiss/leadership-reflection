/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'animate-spin',
    'animate-pulse',
    'transition-all',
    'duration-200',
    'duration-300',
  ],
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'sans': ['Roboto', 'system-ui', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  // Enable optimizations for production
  corePlugins: {
    // Disable unused core plugins to reduce bundle size
    container: false,
    float: false,
    clear: false,
    skew: false,
    caretColor: false,
    sepia: false,
  }
};
