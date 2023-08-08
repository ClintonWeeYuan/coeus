/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Simple 15 column grid
                15: 'repeat(15, 60px)',
            },
            gridColumnStart: {
                13: '13',
                14: '14',
                15: '15',
                16: '16',
                17: '17',
            },
            gridColumnEnd: {
                13: '13',
                14: '14',
                15: '15',
                16: '16',
                17: '17',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                roboto: 'var(--font-roboto)',
                'inter-medium': 'var(--font-inter)',
            },
            colors: {
                primary: {
                    300: '#8EC5F5',
                    400: '#7CBCF4',
                    500: '#5FAEF1',
                    600: '#56A8F0',
                    700: '#439FEF',
                },
                secondary: {
                    300: '#4969C1',
                    400: '#3E5EB6',
                    500: '#3957A7',
                    600: '#344F98',
                    700: '#2F4789',
                },
                tertiary: {
                    500: '#E1BC29',
                },
                error: {
                    500: '#E15554',
                },
                neutral: {
                    light: '#FFFAFA',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('daisyui')],
};
