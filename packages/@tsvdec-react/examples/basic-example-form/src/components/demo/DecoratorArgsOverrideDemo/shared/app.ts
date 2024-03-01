import { Configuration } from "@tsvdec/core";

declare module "@tsvdec/core" {
  interface DecoratorArgsOverride {
    type: {
      token: string;
    };
  }
}

Configuration.decoratorArgsResolver(() => ({ token: "token" }));

// prettier-ignore
export const CodeText =
`import { Configuration } from "@tsvdec/core";

declare module "@tsvdec/core" {
  interface DecoratorArgsOverride {
    type: {
      token: string;
    };
  }
}

Configuration.decoratorArgsResolver(() => ({ token: "token" }));`;
