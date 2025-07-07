/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'my-white': '#FFFFFF',
        'soft-red': '#FF9898',
        'coral-red': '#EA5555',
        'snow-blue': '#F4F7FD',
        'light-periwinkle': '#E4EBFA',
        'cool-gray': '#828FA3',
        'charcoal-gray': '#3E3F4E',
        'deep-slate': '#2B2C37',
        'slate-black': '#20212C',
        'rich-black': '#000112',
        'soft-indigo': '#A8A4FF',
        'deep-indigo': '#635FC7',
      },
      fontFamily: {
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      spacing: {
        '26px': '26px',
        '29px': '29px',
      }
    },
  },
  plugins: [],
}

