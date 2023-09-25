## Install

### From Pack

```
    npm i xoox-ui
```

### Install Framer Motion

```
    npm i framer-motion
```

### Install Tailwind

```js
    // tailwind.config.js
const {xooxui} = require("xoox-ui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/xoox-ui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [xooxui()],
};
```
