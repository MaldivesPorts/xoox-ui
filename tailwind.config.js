/** @type {import('tailwindcss').Config} */
const {mplui} = require("./src/lib/core/theme/plugin.ts");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [mplui()],
}

