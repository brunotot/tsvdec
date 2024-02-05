import { Class, UnwrapClass, createClassValidator } from "@tsvdec/core";

export function EqualFields<C extends Class>(...fields: (keyof UnwrapClass<C>)[]) {
  return createClassValidator<C>(value => {
    return {
      key: "EqualFields",
      message: `Fields ${new Intl.ListFormat("en").format(fields as string[])} must match`,
      valid: fields.every(field => value[field] === value[fields[0]]),
    };
  });
}

// prettier-ignore
export const CodeText =
`import { Class, UnwrapClass, createClassValidator } from "@tsvdec/core";

export function EqualFields<C extends Class>(...fields: (keyof UnwrapClass<C>)[]) {
  return createClassValidator<C>(value => {
    return {
      key: "EqualFields",
      message: \`Fields \${new Intl.ListFormat("en").format(fields as string[])} must match\`,
      valid: fields.every(field => value[field] === value[fields[0]]),
    };
  });
}
`;
