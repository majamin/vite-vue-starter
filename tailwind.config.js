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
        "theme-red-50": "#ffebed",
        "theme-red-100": "#ffd4da",
        "theme-red-200": "#fda8b4",
        "theme-red-300": "#fd93a1",
        "theme-red-400": "#fb6c7f",
        "theme-red-500": "#f2334c",
        "theme-red-600": "#e9203b",
        "theme-red-700": "#d7112c",
        "theme-red-800": "#6b0210",
        "theme-red-900": "#330007",
        "theme-blue-50": "#f3ebff",
        "theme-blue-100": "#e5d4ff",
        "theme-blue-200": "#d8befe",
        "theme-blue-300": "#bd93fd",
        "theme-blue-400": "#a56cfb",
        "theme-blue-500": "#7f33f2",
        "theme-blue-600": "#7020e9",
        "theme-blue-700": "#4907ad",
        "theme-blue-800": "#2c026b",
        "theme-blue-900": "#140033",
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
