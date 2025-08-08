/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx,html,css}",
    "./src/styles/**/*.css",
  ],
  safelist: [
    'w-[340px]',
    'rounded-[8px]',
    'bg-white',
    'pt-[16px]',
    'pb-[23px]',
    'text-[12px]',
    'pl-[59px]',
    'tracking-[2.4px]',
    'text-medium-grey',
    'font-bold',
    'leading-[100%]',
    'ml-[65px]',
    'mt-[19px]',
    'mr-[14.15px]',
    'mb-[31px]',
    'w-[293px]',
    'h-[49px]',
    'rounded-tr-[100px]',
    'rounded-br-[100px]',
    'bg-[#635FC7]',
    'text-white',
    'text-[15px]',
    'bg-[#F4F7FD]',
    'w-[260px]',
    'h-[48px]',
    'rounded-[6px]',
    'pt-[10px]',
    'pb-[17px]',
    'text-center',
    'flex',
    'items-center',
    'justify-center',
    'gap-4',
    'text-xl',
    'absolute', 'top-0', 'w-full', 'bg-black', 'opacity-50', 'fixed',
    'left-0', 'h-[130vh]', 'bg-white', 'rounded-[6px]', 'w-[343px]',
    'md:w-[600px]', 'p-[24px]', 'h-[532px]', 'md:h-[415px]', 'flex', 
    'flex-col', 'gap-[24px]', 'text-[18px]', 'font-bold', 'text-[13px]',
    'text-medium-grey', 'h-[40px]', 'mb-[24px]', 'pt-[8px]', 'pb-[9px]',
    'pl-[18px]', 'rounded', 'border', 'border-gray-300', 'appearance-none',
    'leading-[23px]', 'w-[300px]', 'bg-indigo', 'bg-red',
    "text-[13px]",
    "rounded-[6px]",
    "h-[532px]",
    "w-[343px]",
    "md:w-[600px]","bg-black", "opacity-50", "absolute", "top-0", "left-0", "w-full", "h-full",
    "mb-[21px]", "bg-white", "h-[60px]", "pt-[20px]", "px-[19px]", "pb-[21px]", "rounded-lg", "text-[15px]", "font-bold", "leading-[100%]", "text-rich-black", "shadow-custom-shadow", "cursor-pointer", "focus:outline-none", "focus:ring-2", "focus:ring-indigo",
    "flex", "flex-row",
    "w-[424px]", "md:m-auto", "md:flex", "md:items-center", "md:justify-center", "md:flex-row", "gap-[15px]", "text-[13px]", "py-[8px]",
    "top-[99px]", "lg:top-[249px]", "left-0", "right-0", "m-auto", "w-[343px]", "md:w-[600px]", "p-[24px]", "rounded-[6px]", "h-[415px]", "md:h-[478px]", "flex", "flex-col", "g-[24px]", "justify-between", "pb-4", "h-[112px]", "text-[13px]", "border", "border-gray-300", "rounded", "w-full", "pt-[8px]", "pb-[9px]", "pl-[18px]", "mb-[24px]",
    "w-[300px]", "h-[40px]", "rounded-[20px]", "bg-indigo", "text-white", "font-bold", "text-[13px]", "leading-[23px]", "w-[290px]", "h-[40px]", "md:h-[478px]", "h-[532px]"
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
          '@apply absolute w-[90%] max-w-[340px] bg-white h-[200px] top-[65px] left-0 right-0 mx-auto rounded-[8px] pt-[16px] pb-[23px]': {},
        },
      });
    }
  ],
}

