const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/(autocomplete|avatar|button|card|chip|dropdown|form|input|select|slider|ripple|spinner|listbox|divider|popover|scroll-shadow|menu).js"
  ],
  darkMode: ["class"],
  theme: {
  	extend: {
  		fontFamily: {
  			poppins: 'Poppins, sans-serif',
  			roboto: 'Roboto, sans-serif',
  			clash: 'ClashDisplay, sans-serif',
  			smooch: 'Smooch Sans, sans-serif'
  		},
  		textShadow: {
  			sm: '0 1px 2px var(--tw-shadow-color)',
  			DEFAULT: '0 2px 4px var(--tw-shadow-color)',
  			lg: '0 8px 16px var(--tw-shadow-color)'
  		},
  		colors: {
			prime: "#DC2626",
			sec: "#F8F9FA",
			third: "#64748B",
			forth: "#FACC15",
			fifth: "#14B8A6",
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: [plugin(function ({ matchUtilities,theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,}),},{ values: theme('textShadow') }
      )
    }),require("tailwindcss-animate"),heroui()],
}

// #EEEEEE #D84040 #8E1616 #1D1616