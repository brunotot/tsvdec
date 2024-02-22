## Bundler configurations

### TSC configuration

See: [TypeScript 5.2 decorators metadata blog](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#decorator-metadata)

```ts
// index.ts
Symbol.metadata ??= Symbol("Symbol.metadata");
```

```json
{
  /* tsconfig.json */
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "esnext.decorators", "dom"],
    "emitDecoratorMetadata": false,
    "experimentalDecorators": false
  }
}
```

### Vite configuration (React + Babel)

```sh
npm install -D @vitejs/plugin-react
```

```ts
// vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ["@babel/preset-typescript"],
        plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
      },
    }),
  ],
});
```

### Babel configuration

See [Babel: 7.19.0 Released: Stage 3 decorators and more RegExp features!](https://babeljs.io/blog/2022/09/05/7.19.0)

```ts
// babel.config.js
{
  presets: ["@babel/preset-typescript"],
  plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
}
```

### Webpack configuration

See: [NextJS: Typescript 5 decorators do not build #48360](https://github.com/vercel/next.js/issues/48360#issuecomment-1583135113)

```sh
npm i -D ts-loader
```

```js
// webpack.config.js
{
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ];
  }
}
```
