import { createFieldValidator } from "@tsvdec/core";
import ModelForm from "../code/model";

export function AdultAgeValid<This, Value extends string>(...groups: string[]) {
  return createFieldValidator<This, Value>(
    v => ({
      key: "Adult",
      message: "Must enter amount between 18 and 100 inclusive",
      valid: Number(v) >= 18 && Number(v) <= 100,
    }),
    { groups },
  );
}

export function CaseInsensitiveContains<This, Value extends string>(
  containText: string,
  ...groups: string[]
) {
  const containTextLowercase = containText.toLowerCase();
  return createFieldValidator<This, Value>(
    (current, _context: ModelForm) => ({
      valid: (current ?? "").toLowerCase().includes(containTextLowercase),
      key: "CaseInsensitiveContains",
      message: `Text must contain "${containTextLowercase}"`,
    }),
    { groups },
  );
}

export function PasswordsMustMatch<This, Value extends string>(...groups: string[]) {
  return createFieldValidator<This, Value>(
    (v, _this: ModelForm) => ({
      valid: v === _this.password,
      key: "PasswordsMustMatch",
      message: "Passwords must match",
    }),
    { groups },
  );
}

// prettier-ignore
export const CodeText =
`import { createFieldValidator } from "@tsvdec/core";
import ModelForm from "../code/model";

export function AdultAgeValid<This, Value extends string>(...groups: string[]) {
  return createFieldValidator<This, Value>(
    v => ({
      key: "Adult",
      message: "Must enter amount between 18 and 100 inclusive",
      valid: Number(v) >= 18 && Number(v) <= 100,
    }),
    { groups },
  );
}

export function CaseInsensitiveContains<This, Value extends string>(
  containText: string,
  ...groups: string[]
) {
  const containTextLowercase = containText.toLowerCase();
  return createFieldValidator<This, Value>(
    (current, _context: ModelForm) => ({
      valid: (current ?? "").toLowerCase().includes(containTextLowercase),
      key: "CaseInsensitiveContains",
      message: \`Text must contain "\${containTextLowercase}"\`,
    }),
    { groups },
  );
}

export function PasswordsMustMatch<This, Value extends string>(...groups: string[]) {
  return createFieldValidator<This, Value>(
    (v, _this: ModelForm) => ({
      valid: v === _this.password,
      key: "PasswordsMustMatch",
      message: "Passwords must match",
    }),
    { groups },
  );
}
`;
