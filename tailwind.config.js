/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@tremor/**/*.{js,ts,jsx,tsx}', // Tremor module
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Simple 15 column grid
                15: 'repeat(15, minmax(60px, 1fr))',
                16: 'repeat(16, minmax(0, 1fr))',
                24: 'repeat(24, minmax(20px, 1fr))',
                48: 'repeat(48, minmax(0, 1fr))',
            },
            minWidth: {
                500: '500px'
            },
            gridColumnStart: {
                13: '13',
                14: '14',
                15: '15',
                16: '16',
                17: '17',
                18: '18',
                19: '19',
                20: '20',
                21: '21',
                22: '22',
                23: '23',
                24: '24',
                25: '25',
                26: '26',
                27: '27',
                28: '28',
                29: '29',
                30: '30',
                31: '31',
                32: '32',
                33: '33',
                34: '34',
                35: '35',
                36: '36',
                37: '37',
                38: '38',
                39: '39',
                40: '40',
                41: '41',
                42: '42',
                43: '43',
                44: '44',
                45: '45',
                46: '46',
                47: '47',
                48: '48',
            },
            gridColumnEnd: {
                13: '13',
                14: '14',
                15: '15',
                16: '16',
                17: '17',
                18: '18',
                19: '19',
                20: '20',
                21: '21',
                22: '22',
                23: '23',
                24: '24',
                25: '25',
                26: '26',
                27: '27',
                28: '28',
                29: '29',
                30: '30',
                31: '31',
                32: '32',
                33: '33',
                34: '34',
                35: '35',
                36: '36',
                37: '37',
                38: '38',
                39: '39',
                40: '40',
                41: '41',
                42: '42',
                43: '43',
                44: '44',
                45: '45',
                46: '46',
                47: '47',
                48: '48',
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
                    100: '#B4D8F8',
                    200: '#A1CFF7',
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
                //Tremor Colors
                tremor: {
                    brand: {
                        faint: '#eff6ff', // blue-50
                        muted: '#bfdbfe', // blue-200
                        subtle: '#60a5fa', // blue-400
                        DEFAULT: '#3b82f6', // blue-500
                        emphasis: '#1d4ed8', // blue-700
                        inverted: '#ffffff', // white
                    },
                    background: {
                        muted: '#f9fafb', // gray-50
                        subtle: '#f3f4f6', // gray-100
                        DEFAULT: '#ffffff', // white
                        emphasis: '#374151', // gray-700
                    },
                    border: {
                        DEFAULT: '#e5e7eb', // gray-200
                    },
                    ring: {
                        DEFAULT: '#e5e7eb', // gray-200
                    },
                    content: {
                        subtle: '#9ca3af', // gray-400
                        DEFAULT: '#6b7280', // gray-500
                        emphasis: '#374151', // gray-700
                        strong: '#111827', // gray-900
                        inverted: '#ffffff', // white
                    },
                },
                // dark mode
                'dark-tremor': {
                    brand: {
                        faint: '#0B1229', // custom
                        muted: '#172554', // blue-950
                        subtle: '#1e40af', // blue-800
                        DEFAULT: '#3b82f6', // blue-500
                        emphasis: '#60a5fa', // blue-400
                        inverted: '#030712', // gray-950
                    },
                    background: {
                        muted: '#131A2B', // custom
                        subtle: '#1f2937', // gray-800
                        DEFAULT: '#111827', // gray-900
                        emphasis: '#d1d5db', // gray-300
                    },
                    border: {
                        DEFAULT: '#1f2937', // gray-800
                    },
                    ring: {
                        DEFAULT: '#1f2937', // gray-800
                    },
                    content: {
                        subtle: '#4b5563', // gray-600
                        DEFAULT: '#6b7280', // gray-600
                        emphasis: '#e5e7eb', // gray-200
                        strong: '#f9fafb', // gray-50
                        inverted: '#000000', // black
                    },
                },
            },
            boxShadow: {
                // light
                'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'tremor-card':
                    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'tremor-dropdown':
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                // dark
                'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'dark-tremor-card':
                    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'dark-tremor-dropdown':
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
            borderRadius: {
                'tremor-small': '0.375rem',
                'tremor-default': '0.5rem',
                'tremor-full': '9999px',
            },
            fontSize: {
                'tremor-label': ['0.75rem'],
                'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
                'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
                'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
            },
        },
    },
    safelist: [
        {
            pattern:
                /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected'],
        },
        {
            pattern:
                /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected'],
        },
        {
            pattern:
                /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected'],
        },
        {
            pattern:
                /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern:
                /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern:
                /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
    ],
    plugins: [
        require('@tailwindcss/forms'),
        require('daisyui'),
        require('@tailwindcss/typography'),
        require('tailwindcss-animate'),
    ],
};
