import { createFieldValidator } from "@tsvdec/core";
import "../shared/app"; // <-- Necessary import for setting up the global args resolver.

function ValidDescription<This, Value>() {
  return createFieldValidator<This, Value>((value, { context, locale, args }) => {
    return {
      key: "ValidDescription",
      valid: value === args.token,
      message: `Description is invalid, must be value of "${args.token}"`,
    };
  });
}

export class ModelForm {
  @ValidDescription()
  description: string = "";
}

// prettier-ignore
export const CodeText =
`import { createFieldValidator } from "@tsvdec/core";
import "../shared/app"; // <-- Necessary import for setting up the global args resolver.

function ValidDescription<This, Value>() {
  return createFieldValidator<This, Value>((value, _context, _locale, args) => {
    return {
      key: "ValidDescription",
      valid: value === args.token,
      message: \`Description is invalid, must be value of "\${args.token}"\`,
    };
  });
}

export class ModelForm {
  @ValidDescription()
  description: string = "";
}`;
