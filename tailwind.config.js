/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        app: {
          // Default colors
          light: colors.slate['100'],
          medium: colors.slate['300'],
          DEFAULT: colors.slate['600'],
          dark: colors.slate['700'],
          darkest: colors.slate['900'],
          // Text colors
          altText: colors.white,
          text: colors.slate['900'],
          // Util colors
          error: colors.red['500'],
        },
      },
      maxWidth: ({ theme }) => ({
        cellText: theme('spacing.48'),
      }),
      fontFamily: {
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [],
};
