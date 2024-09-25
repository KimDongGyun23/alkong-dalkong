import type { Config } from 'tailwindcss'

import {
  backgroundImage,
  boxShadow,
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from './src/utility/styles'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontWeight,
    extend: {
      fontFamily,
      backgroundImage,
      backgroundColor: colors,
      colors,
      fontSize,
      lineHeight,
      boxShadow,
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
