module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ], // remove unused styles in production
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
