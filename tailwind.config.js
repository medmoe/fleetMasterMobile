/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#3f51b5",
                secondary: {
                    100: "#fff3e0",
                    200: "#ffe0b2",
                    300: "#ffcc80",
                    400: "#ffb74d",
                    500: "#ffa726", // Base color similar to #ff9800
                    600: "#fb8c00",
                    700: "#f57c00",
                    800: "#ef6c00",
                    900: "#e65100",
                },
                accent: "#9c27b0",
                background: "#f5f5f5",
                txt: "#263238",
                success: "#57b269",
                error: "#e93c0c",
                warning: "#ffc107",
                default: "#9BA1A6",
            },
            fontFamily: {
                'merriweather-bold': ['MerriweatherBold'],
                'merriweather-regular': ['MerriweatherRegular'],
                'montserrat': ['Montserrat'],
                'open-sans': ['OpenSans'],
                'roboto': ['Roboto'],
                'roboto-italic': ['RobotoItalic'],
                'source-code-pro': ['SourceCodePro'],
            },

        },
    },
    plugins: [],
}
