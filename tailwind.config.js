/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx,html,css}",
    "./src/styles/**/*.css",
    "./public/index.html"
  ],
  safelist: [
  'w-[340px]', 'rounded-[8px]', 'bg-white', 'pt-[16px]', 'pb-[23px]', 'text-[12px]', 'pl-[59px]', 'tracking-[2.4px]', 'text-medium-grey',
  'font-bold', 'leading-[100%]', 'ml-[65px]', 'mt-[19px]', 'mr-[14.15px]', 'mb-[31px]', 'w-[293px]', 'h-[49px]', 'rounded-tr-[100px]',
  'rounded-br-[100px]', 'bg-[#635FC7]', 'text-white', 'text-[15px]', 'bg-[#F4F7FD]', 'w-[260px]', 'h-[48px]', 'rounded-[6px]', 'pt-[10px]',
  'pb-[17px]', 'text-center', 'flex', 'items-center', 'justify-center', 'gap-4', 'text-xl', 'absolute', 'top-0', 'w-full', 'bg-black',
  'opacity-50', 'fixed', 'left-0', 'h-[130vh]', 'md:w-[600px]', 'p-[24px]', 'h-[532px]', 'md:h-[415px]', 'flex-col', 'gap-[24px]',
  'text-[18px]', 'text-[13px]', 'h-[40px]', 'mb-[24px]', 'pt-[8px]', 'pb-[9px]', 'pl-[18px]', 'rounded', 'border', 'border-gray-300',
  'appearance-none', 'leading-[23px]', 'w-[300px]', 'bg-indigo', 'bg-red', 'h-full', 'px-[18px]', 'mt-[8px]', 'mb-[21px]', 'h-[60px]',
  'pt-[20px]', 'px-[19px]', 'pb-[21px]', 'rounded-lg', 'text-rich-black', 'shadow-custom-shadow', 'cursor-pointer', 'focus:outline-none',
  'focus:ring-2', 'focus:ring-indigo', 'flex-row', 'w-[424px]', 'md:m-auto', 'md:flex', 'md:items-center', 'md:justify-center', 'md:flex-row',
  'gap-[15px]', 'py-[8px]', 'top-[99px]', 'lg:top-[249px]', 'right-0', 'm-auto', 'h-[415px]', 'md:h-[478px]', 'g-[24px]', 'justify-between', "lg:top-[200px]",
  'pb-4', 'h-[112px]', 'rounded-[20px]', 'w-[290px]', 'bg-[#A8A4FF]', 'w-[56px]', 'pt-2', 'pl-3', 'text-[20px]', "md-[43px]", "h-[65px]", "dark:text-black",
  "bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2211%22%20height=%228%22%20viewBox=%220%200%2011%208%22%20fill=%22none%22><path%20d=%22M0.79834%201.54863L5.49682%206.24711L10.1953%201.54863%22%20stroke=%22%23828FA3%22%20stroke-width=%222%22/></svg>')]",
  "dark:text-white", "dark:bg-dark-grey", "dark:bg-indigo", "h-[200px]", "w-[200px]", "bg-[#f5f5dc]", "flex", "m-auto", "fixed", "inset-0", "z-50", "animate-spin", "rounded-full", "block", "h-[50px]", "w-[50px]", "border-t-4", "border-light-grey", "border-solid mb-4"
],
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
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.MobileNav': {
          '@apply absolute w-[90%] max-w-[340px] bg-white h-[200px] top-[65px] left-0 right-0 mx-auto rounded-[8px] pt-[16px] pb-[23px] dark:bg-gray-dark': {},
        },
      });
    }
  ],
}

