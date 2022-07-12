const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
      },
      /* https://colorbox.io/ */
      colors: {
        "theme-green-50": "#f0fff8",
        "theme-green-100": "#cff2e3",
        "theme-green-200": "#95d9bb",
        "theme-green-300": "#7ccda8",
        "theme-green-400": "#52b387",
        "theme-green-500": "#1f8155",
        "theme-green-600": "#116841",
        "theme-green-700": "#094e2f",
        "theme-green-800": "#011c10",
        "theme-green-900": "#000301",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
