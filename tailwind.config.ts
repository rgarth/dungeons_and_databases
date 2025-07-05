import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'dice-canvas': 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      },
      colors: {
        // Use CSS custom properties for theming - no duplicate color definitions
        // All colors are defined in globals.css via CSS custom properties
      },
    },
  },
  plugins: [],
}

export default config 