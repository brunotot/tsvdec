import { createFieldValidator, ValidationResult } from "@tsvdec/core";

export function UniqueUsername<ModelForm, Value extends string>(...groups: string[]) {
  return createFieldValidator<ModelForm, Value>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (username, _this: ModelForm, _locale, { token: _token }) => {
      return new Promise<ValidationResult>(resolve => {
        setTimeout(() => {
          resolve({
            key: "UniqueUsername",
            valid: !["test1", "test2", "test3"].includes(username),
            message: "Username already exists!",
          });
        }, 1000);
      });
    },
    { groups },
  );
}

// prettier-ignore
export const CodeText =
`import { createFieldValidator, ValidationResult } from "@tsvdec/core";

export function UniqueUsername<ModelForm, Value extends string>(...groups: string[]) {
  return createFieldValidator<ModelForm, Value>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (username, _this: ModelForm, _locale, { token: _token }) => {
      return new Promise<ValidationResult>(resolve => {
        setTimeout(() => {
          resolve({
            key: "UniqueUsername",
            valid: !["test1", "test2", "test3"].includes(username),
            message: "Username already exists!",
          });
        }, 1000);
      });
    },
    { groups },
  );
}
`;
