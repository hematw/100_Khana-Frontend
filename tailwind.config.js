const { heroui } = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/(autocomplete|avatar|button|card|chip|divider|drawer|dropdown|form|image|input|listbox|select|skeleton|slider|toast|popover|ripple|spinner|scroll-shadow|modal|menu).js"
  ],
	darkMode: ["class"],
	theme: {
		extend: {
			fontFamily: {
				poppins: 'Poppins, sans-serif',
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
			}
		}
	},
	plugins: [require("tailwindcss-animate"), heroui()],
}

// #EEEEEE #D84040 #8E1616 #1D1616