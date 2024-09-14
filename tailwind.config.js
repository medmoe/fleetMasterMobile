/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#3f51b5",
                secondary: "#ff9800",
                accent: "#9c27b0",
                background: "#f5f5f5",
                txt: "#263238",
                win: "#57b269",
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
        plugins: [],
    }
}

