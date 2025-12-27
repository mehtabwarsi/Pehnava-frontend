export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                pehnava: {
                    // Modern Premium White Palette
                    white: "#FFFFFF",
                    offWhite: "#FAFAFA",
                    lightGray: "#F5F5F7",

                    // Text colors
                    charcoal: "#1F1F1F",
                    slate: "#64748B",
                    darkSlate: "#334155",

                    // Primary brand (vibrant blue-purple)
                    primary: "#6366F1",
                    primaryDark: "#4F46E5",
                    primaryLight: "#818CF8",

                    // Accent (electric pink)
                    accent: "#EC4899",
                    accentDark: "#DB2777",
                    accentLight: "#F472B6",

                    // Secondary (teal)
                    secondary: "#14B8A6",
                    secondaryDark: "#0D9488",
                    secondaryLight: "#2DD4BF",

                    // Neutrals
                    border: "#E5E7EB",
                    borderDark: "#D1D5DB",

                    // Legacy support
                    teal: "#008B8B",
                    coral: "#FF6B6B",
                    ivory: "#FAF7F2",
                    cream: "#F5F1E8",
                    black: "#111827",
                },
            },
            keyframes: {
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            animation: {
                slideDown: 'slideDown 0.3s ease-out',
                fadeIn: 'fadeIn 0.2s ease-out',
                scaleIn: 'scaleIn 0.2s ease-out',
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
                'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
                'large': '0 8px 32px rgba(0, 0, 0, 0.12)',
                'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
            },
        },
    },
    plugins: [],
};
