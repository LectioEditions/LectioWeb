import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			white: {
  				'1': '#EFEFEF',
  				'2': 'rgba(255, 255, 255, 0.72)',
  				'3': 'rgba(255, 255, 255, 0.4)',
  				'4': 'rgba(255, 255, 255, 0.64)',
  				'5': 'rgba(255, 255, 255, 0.80)',
  				'6': '#D8E1DD '
  			},
  			black: {
  				'1': '#101114',
  				'2': '#222429',
  				'3': '#101114',
  				'4': '#252525',
  				'5': '#2E3036',
  				'6': '#2A2A2A'
  			},
  			orange: {
  				'1': '#F97535'
  			},
  			gray: {
  				'1': '#71788B'
  			},
  			green: {
  				'1': '#319075',
  				'2': '#289180'
  			}
  		},
  		backgroundImage: {
  			'nav-focus': 'linear-gradient(270deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.00) 100%)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;