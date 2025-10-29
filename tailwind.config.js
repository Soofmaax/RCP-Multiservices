/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: [
          'Raleway',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
        body: [
          'Lato',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
      },
      colors: {
        /* semantic colors backed by CSS variables (supports opacity via /xx) */
        primary: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary-rgb) / <alpha-value>)',
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        info: 'rgb(var(--color-info-rgb) / <alpha-value>)',
        success: 'rgb(var(--color-success-rgb) / <alpha-value>)',
        warning: 'rgb(var(--color-warning-rgb) / <alpha-value>)',
        danger: 'rgb(var(--color-danger-rgb) / <alpha-value>)',

        /* text neutrals */
        neutral: {
          900: 'rgb(var(--text-dark-rgb) / <alpha-value>)',
          600: 'rgb(var(--text-medium-rgb) / <alpha-value>)',
          400: 'rgb(var(--text-light-rgb) / <alpha-value>)',
        },

        /* surfaces */
        surface: {
          dark: 'rgb(var(--bg-dark-rgb) / <alpha-value>)',
          light: 'rgb(var(--bg-light-rgb) / <alpha-value>)',
          info: 'rgb(var(--bg-info-rgb) / <alpha-value>)',
          success: 'rgb(var(--bg-success-rgb) / <alpha-value>)',
          warning: 'rgb(var(--bg-warning-rgb) / <alpha-value>)',
          danger: 'rgb(var(--bg-danger-rgb) / <alpha-value>)',
        },

        /* borders */
        border: 'rgb(var(--border-color-rgb) / <alpha-value>)',
      },
      borderRadius: {
        brand: 'var(--radius)',
      },
    },
  },
  plugins: [],
};
