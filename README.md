## Build

### Pack
Replace ```pack.package.json``` to ```package.json```
```
  "types": "index.d.ts",
  "files": [
    "*"
  ],
  "main": "./mpl-uikit.umd.cjs",
  "module": "./mpl-uikit.js",
  "exports": {
    ".": {
      "import": "./mpl-uikit.js",
      "require": "./mpl-uikit.umd.cjs",
      "types": "./index.d.ts"
    }
  },
```

### npm Publish
Replace ```published.package.json``` to ```package.json```
```
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "main": "./dist/mpl-uikit.umd.cjs",
  "module": "./dist/mpl-uikit.js",
  "exports": {
    ".": {
      "import": "./dist/mpl-uikit.js",
      "require": "./dist/mpl-uikit.umd.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "publishConfig": {
    "access": "public"
  },
```


## Install

### From Pack

```
    "mpl-uikit-test": "file:./releases/mpl-uikit-0.0.2.tgz" ([any name]: 'file path')
```
