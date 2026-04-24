/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563eb', // Clean blue for buttons
                    hover: '#1d4ed8',
                    light: '#eff6ff',
                },
                brand: {
                    sidebar: '#1E3A8A', // Dark blue for sidebar (similar to image)
                    bg: '#25449A',      // Main background dark blue
                    card: '#FFFFFF',    // White for cards
                },
                secondary: '#6366f1',
                'slate-950': '#020617',
            },
            fontFamily: {
                display: ['Inter', 'system-ui', 'sans-serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 8px -2px rgba(0, 0, 0, 0.05)',
                'card': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
