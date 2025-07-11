/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'soft-red': '#FF9898',
        'red': '#EA5555',
        'light-grey': '#F4F7FD',
        'background-light': '#E4EBFA',
        'medium-grey': '#828FA3',
        'gray-dark': '#3E3F4E',
        'dark-grey': '#2B2C37',
        'very-dark-grey': '#20212C',
        'black': '#000112',
        'soft-indigo': '#A8A4FF',
        'indigo': '#635FC7',
      },
      fontFamily: {
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      gridTemplateColumns: {
        // 3 columns, each 280px wide
        'cols-280': 'repeat(3, 280px)',
      },
      spacing: {
        '26px': '26px',
        '29px': '29px',
      },
      boxShadow: {
        'custom-shadow': '0px 0px 15px 6px #364E7E1A',
      },
    },
  },
  plugins: [],
}

