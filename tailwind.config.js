/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#e3e6f7",
                    200: "#b5bfed",
                    300: "#8a9ae2",
                    400: "#6477d8",
                    500: "#3f51b5",  // Original color (Primary)
                    600: "#3847a3",
                    700: "#303d91",
                    800: "#293380",
                    900: "#20276d"
                },
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
                accent: {
                    100: "#f4e6f6",
                    200: "#d9a1e2",
                    300: "#c57ed6",
                    400: "#b15bc9",
                    500: "#9c27b0",  // Original color (Primary)
                    600: "#891fa0",
                    700: "#76188e",
                    800: "#62107d",
                    900: "#4e0a6b"
                },
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
