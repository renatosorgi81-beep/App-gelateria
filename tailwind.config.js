/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4332',
          light: '#40916C',
          50: '#D8F3DC',
        },
        accent: {
          DEFAULT: '#D4A843',
          dark: '#B8860B',
        },
        background: '#FDFAF5',
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F0E8',
        },
        'text-primary': '#1A1A2E',
        'text-secondary': '#6B7280',
        error: '#E53E3E',
        border: '#E5E0D5',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 16px rgba(27, 67, 50, 0.08)',
        'card-hover': '0 4px 24px rgba(27, 67, 50, 0.14)',
        'bottom-nav': '0 -2px 16px rgba(27, 67, 50, 0.08)',
      },
    },
  },
  plugins: [],
};
