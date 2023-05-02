/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    fontFamily: {
      poppins: 'Poppins, sans-serif',
      inter: 'Inter, sans-serif',
    },
    extend: {
      colors: {
        // 'primary': '#4640DE',
        // 'secondary': '#F6F6FD',
        // 'grey': '#ABB3C4',
        // 'dark': '#121F3E',
        // 'page': '#F8F8FA',
        // 'success': '#2ED16C',
        'primary': '#4640DE',
        'primary-hover': '#7B2FDB',
        'secondary': '#F6F6FD',
        'grey-100': '#3F4E65',
        'grey-80': '#637289',
        'grey-60': '#8E9BAE',
        'grey-40': '#ABB5C4',
        'grey-20': '#D1D7E0',
        'grey-5': '#E2E6EC',
        'grey-5': '#F4F6F9',
        'dark': '#121F3E',
        'page': '#F8F8FA',
        // 'page': '#F5F5F6',
        'success': '#2ED16C',
      },
      // screens: {
      //   print: { raw: 'print' },
      //   screen: { raw: 'screen' },
      // }
    },
  },
  plugins: [],
}

