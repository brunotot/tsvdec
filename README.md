<h1 align="center">🚀 TypeScript Validation Decorators 🚀</h1>

<p align="center">
 <a href="https://npmcharts.com/compare/typescript-decorator-validation?minimal=true">
  <img alt="Downloads per month" src="https://img.shields.io/npm/dm/@tsvdec/core" height="20"/>
 </a>
 <a href="https://www.npmjs.com/package/typescript-decorator-validation">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/@tsvdec/core.svg" height="20"/>
 </a>
 <a href="https://github.com/brunotot/typescript-decorator-validation/graphs/commit-activity">
  <img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" height="20"/>
 </a>
 <a href="https://github.com/brunotot/typescript-decorator-validation/actions/workflows/tests.yml">
  <img alt="Tests" src="https://github.com/brunotot/typescript-decorator-validation/actions/workflows/tests.yml/badge.svg" height="20"/>
 </a>
</p>

<p align="center">
  <a href="https://github.com/brunotot/typescript-decorator-validation/blob/main/markdown/FAQ.md#@tsvdec/core">
    🔎 Frequently Asked Questions (FAQ)
  </a>
</p>

<br /> 

**tsvdec** monorepo offers a more declarative way to manage model validation in TypeScript v5 using the latest [Stage 3 decorators](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators) that now comes with [built-in type-safety](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#writing-well-typed-decorators) and control over the decorator's return type specificity.

```ts
class Stage2 {
  // ❌ inferred as: Factory() => DecoratorType
  @Factory()
  value: string;
}

class Stage3 {
  // ✅ inferred as: Factory<Stage3, string>() => DecoratorType<Stage3, string>
  @Factory()
  value: string;
}
```

## TOC

- [Features](#features)
- [Packages](#packages)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Documentation](#documentation)
- [Contribution](#contribution)

## Features

- provides clean and declarative way of validating classes and fields
- small in bundle size with no external dependencies
- built-in i18n localization support
- comprehensive documentation and extensive guides, making it easy to get started
- seamless integration with any native TypeScript v5+ project
- supported in both NodeJS and browser environment

## Packages

- [@tsvdec/core](https://www.npmjs.com/package/@tsvdec/core) - core module responsible for manipulating class metadata
- [@tsvdec/react](https://www.npmjs.com/package/@tsvdec/react) -  implementation of core module compatible with React v18+

## Installation

1. Install dependencies

```bash
npm install -D typescript@latest
npm install @tsvdec/core
```

2. (Optional) Configure Babel for browser environment

```ts
{
  presets: ["@babel/preset-typescript"],
  plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
}
```

## Quick start

```ts
import { Form, Required } from "@tsvdec/core";

class MyClass {
  @Required()
  value: string = "";
}

const form = new Form(MyClass);
const result = form.validate({ value: "" });
const errors = result.errors.value;
console.log(errors); // ["Field is required"]
```

## Documentation

- [API Documentation](https://brunotot.github.io/tsvdec/index.html)
- [FAQ](https://github.com/brunotot/typescript-decorator-validation/blob/main/markdown/FAQ.md#@tsvdec/core)

## Contribution

To contribute, simply clone the main branch, commit and push changes to a local branch, then open pull request.</br>
Branch will be ready for merge after all CI tests pass and a review has been made.

[comment]: # "### Comparison against similar solutions"
[comment]: #
[comment]: # "| Criteria          | tdv-monorepo | Yup    | React Hook Form | Validator.js | Formik |"
[comment]: # "| ----------------- | ------------ | ------ | --------------- | ------------ | ------ |"
[comment]: # "| Type Safety       | ✅           | ❌     | 🟡[^1]          | ❌           | ❌     |"
[comment]: # "| Syntax            | ✅           | ❌     | ✅[^2]          | ❌           | ❌     |"
[comment]: # "| Learning Curve    | ✅           | 🟡[^3] | 🟡[^4]          | 🟡[^5]       | 🟡[^6] |"
[comment]: # "| Custom Validators | ✅           | 🟡[^7] | ✅              | 🟡[^8]       | 🟡[^9] |"
[comment]: #
[comment]: # "- ✅: Fully supported and easy-to-use"
[comment]: # "- ❌: Not supported"
[comment]: # "- 🟡: Partial support"
[comment]: #
[comment]: # "[^1]: React Hook Form has good TypeScript support but doesn't integrate as seamlessly as `tdv-monorepo`."
[comment]: # "[^2]: React Hook Form uses hooks, which are easy to use but different from native TypeScript decorators."
[comment]: # "[^3]: Yup requires learning its custom object schema, adding to the learning curve."
[comment]: # "[^4]: React Hook Form requires understanding of hooks, adding a slight learning curve."
[comment]: # "[^5]: Validator.js requires learning their API, which can be cumbersome."
[comment]: # "[^6]: Formik has its own ecosystem, making the learning curve steeper."
[comment]: # "[^7]: Yup allows for custom validation but within the confines of its own schema."
[comment]: # "[^8]: Validator.js allows for some customization but it's not straightforward."
[comment]: # "[^9]: Formik allows for custom validation but within its own framework."
