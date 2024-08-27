/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    ],

    purge: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.astro', './src/**/*.tsx'],

    plugins: [],

    darkMode: 'class',

    safelist: [
        'w-64',
        'w-1/2',
        'rounded-l-lg',
        'rounded-r-lg',
        'bg-gray-200',
        'grid-cols-4',
        'grid-cols-7',
        'h-6',
        'leading-6',
        'h-9',
        'leading-9',
        'shadow-lg'
    ],

    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        fontFamily: {
            sans: ['Menlo', 'sans-serif'],
            serif: ['Menlo', 'Merriweather', 'serif'],
            'body': [
                'Menlo',
                'ui-sans-serif',
                'system-ui',
            ],
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            }
        }
    },

    variants: {
        fill: [],
        extend: {
            borderColor: ['focus-visible'],
            opacity: ['disabled'],
        }
    },
}
