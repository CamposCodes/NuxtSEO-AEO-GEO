import type { Config } from 'tailwindcss'

export default {
    content: [
        './app/components/**/*.{vue,js,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/composables/**/*.{js,ts}',
        './app/app.{js,ts,vue}'
    ],

    darkMode: 'class',

    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f2f8fd',
                    100: '#e1eef8',
                    200: '#bddfff', // Legacy 300
                    300: '#8bbce5',
                    400: '#5c7ea2', // Legacy 200
                    500: '#2d5273', // Legacy Primary
                    600: '#264663',
                    700: '#1f3a53',
                    800: '#1e3a52', // Legacy Gradient End
                    900: '#122435',
                    DEFAULT: '#2d5273'
                },
                brand: {
                    DEFAULT: '#00DC82',
                    dark: '#00b368'
                },
                'hero-gray': '#DBDDE1'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Poppins', 'sans-serif']
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'fade-in-up': 'slideUp 0.8s ease-out'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                }
            }
        }
    }
} satisfies Config
