/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                sidebar: '#FFCAD4',
                success: '#0AB39C',
                success_rgba: 'rgba(10, 179, 156, 0.18)',
                info: '#299CDB',
                info_rgba: 'rgba(41, 156, 219, 0.18)',
                warning: '#F7B84B',
                warning_rgba: 'rgba(247, 184, 7, 0.18)',
                danger: '#F06548',
                danger_rgba: 'rgba(240, 101, 72, 0.18)',
                dark: '#212529',
                dark_rgba: 'rgba(3, 37, 41, 0.18)',
                link: '#405189',
                button_bg: 'rgba(64, 81, 137, 0.1)',
                // primary: '#319795',
                // secondary: '#748ACC',
            },
        },
    },
    plugins: [],
};
