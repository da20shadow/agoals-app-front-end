module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['cursive', 'sans-serif'],
      body: ['cursive', 'sans-serif'],
    },
    colors: {
      'primary': '#424854',
      'secondary': '#5a6170',
      'accent': '#61dafb',
      'gray': '#555c67',
      'light-gray': '#a5acb3',
      'green': '#105133',
      'light-green': '#d1e6dd',
      'blue': '#074198',
      'light-blue': '#cfe2ff',
      'orange': '#674d03',
      'light-orange': '#fff2cd',
      'red': '#84202b',
      'light-red': '#f7d7da',
    },
    extend: {
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'slate-bg': 'rgb(148 163 184)',
        'neutral-bg': 'rgb(226 232 240)',
        'light-gray': '#F7F7F7',
        'green-bg': '#d1e6dd',
        'blue-bg': '#cfe2ff',
        'orange-bg': '#fff2cd',
        'red-bg': '#f7d7da',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
    },
  },
  plugins: [],
};