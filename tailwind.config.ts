import type { Config } from 'tailwindcss'

const config: Config = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        primary: 'linear-gradient(91.47deg, #da458f -6%, #da34dd 113.05%)',
        disabled: 'linear-gradient(91.47deg, rgba(218, 69, 143, 0.4) -6%, rgba(218, 52, 221, 0.4) 113.05%)',
        'gradient-epic': 'linear-gradient(90.13deg, #DD5AFE 0%, #6366F1 100%)',
        'gradient-common': 'linear-gradient(90.13deg, #49DD81 0%, #22B4C6 100%)',
        'gradient-rare': 'linear-gradient(90deg, #43A6F6 0%, #5868F3 100%)',
        'gradient-legendary': 'linear-gradient(90.13deg, #FE955A 0%, #F1DA63 100%)',
        'gradient-mythic': 'linear-gradient(90.13deg, #FE5A5A 0%, #F163D2 100%)',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-primary',
    'bg-gradient-epic',
    'bg-gradient-common',
    'bg-gradient-rare',
    'bg-gradient-legendary',
    'bg-gradient-mythic',
  ],
}
export default config
