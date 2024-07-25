/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primary-blue': '#4A6AFE',
      'secondary-yellow': '#FFF27E',
      'grad-blue': '#A4B4FF',
      'grad-yellow': '#FFFACA',
      'success-green': '#4BDF59',
      'warning-orange': '#FCA522',
      'danger-red': '#FC3D36',
      'danger-lighten': '#FC5B55',
      'danger-darken': '#E4231C',
      'danger-disabled': '#FAA8A5',
      'p-white': '#FFFFFF',
      'white': '#FCFCFC',
      'gray1': '#ECECEC',
      'gray2': '#C1C1C1',
      'gray3': '#6C6C6C',
      'black': '#1E1E1E'
    },
    fontSize: {
      '12': ['12px', '160%'],
      '14': ['14px', '160%'],
      '16': ['16px', '140%'],
      '18': ['18px', '140%'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
