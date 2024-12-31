/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme
        light: {
          bg: {
            DEFAULT: '#F4F6F9',
            secondary: '#FFFFFF',
          },
          text: {
            primary: '#1A1A2E',
            secondary: '#4A4A68',
          },
          border: '#E0E4EB',
        },
        // Dark Theme
        dark: {
          bg: {
            DEFAULT: '#121212',
            secondary: '#1E1E1E',
          },
          text: {
            primary: '#E0E0E0',
            secondary: '#A0A0A0',
          },
          border: '#2C2C2C',
        },
        // Global Colors
        primary: {
          DEFAULT: '#4CAF50',
          hover: '#45a049',
          light: '#81C784',
          dark: '#388E3C',
        },
        secondary: {
          DEFAULT: '#6C757D',
          hover: '#5A6268',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display
        'display-lg': ['3.5625rem', '4rem'],     // 57px/64px
        'display-md': ['2.8125rem', '3.25rem'],  // 45px/52px
        'display-sm': ['2.25rem', '2.75rem'],    // 36px/44px
        // Headline
        'headline-lg': ['2rem', '2.5rem'],       // 32px/40px
        'headline-md': ['1.75rem', '2.25rem'],   // 28px/36px
        'headline-sm': ['1.5rem', '2rem'],       // 24px/32px
        // Body
        'body-lg': ['1rem', '1.5rem'],          // 16px/24px
        'body-md': ['0.875rem', '1.25rem'],     // 14px/20px
        'body-sm': ['0.75rem', '1rem'],         // 12px/16px
        'title-main': '48px',
        'title-sub': '32px',
        'body': '16px',
        'body-small': '14px'
      },
      boxShadow: {
        'light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
        'hover-light': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'hover-dark': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'spin-once': 'spin 1s ease-in-out',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'popupIn': 'popupIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        popupIn: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.7)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
