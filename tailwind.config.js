/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"], presets: [require("nativewind/preset")], theme: {
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
                }, secondary: {
                    100: "#fff3e0",
                    200: "#ffe0b2",
                    300: "#ffcc80",
                    400: "#ffb74d",
                    500: "#ffa726",
                    600: "#fb8c00",
                    700: "#f57c00",
                    800: "#ef6c00",
                    900: "#e65100",
                }, accent: {
                    100: "#f4e6f6",
                    200: "#d9a1e2",
                    300: "#c57ed6",
                    400: "#b15bc9",
                    500: "#9c27b0",
                    600: "#891fa0",
                    700: "#76188e",
                    800: "#62107d",
                    900: "#4e0a6b"
                }, background: "#f5f5f5", txt: "#263238", success: {
                    100: "#eaf5ec",
                    200: "#cbe6d0",
                    300: "#aad7b4",
                    400: "#89c799",
                    500: "#68b77d",
                    600: "#4e9361",
                    700: "#3e724d",
                    800: "#2e5139",
                    900: "#1e3125"
                }, error: {
                    100: "#fde8e6",
                    200: "#fccbc3",
                    300: "#faafa0",
                    400: "#f8937c",
                    500: "#f76751",
                    600: "#e84e3c",
                    700: "#d93526",
                    800: "#c02615",
                    900: "#a2190b",
                }, warning: "#ffc107", default: "#9BA1A6",
            }, fontFamily: {
                'merriweather-bold': ['MerriweatherBold'],
                'merriweather-regular': ['MerriweatherRegular'],
                'montserrat': ['Montserrat'],
                'open-sans': ['OpenSans'],
                'roboto': ['Roboto'],
                'roboto-italic': ['RobotoItalic'],
                'source-code-pro': ['SourceCodePro'],
            },

        },
    }, plugins: [],
}
