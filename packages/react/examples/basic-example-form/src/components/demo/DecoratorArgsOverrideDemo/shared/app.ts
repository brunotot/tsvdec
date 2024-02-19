import { setGlobalArgsResolver } from "@tsvdec/core";

declare module "@tsvdec/core" {
  interface DecoratorArgsOverride {
    type: {
      token: string;
    };
  }
}

setGlobalArgsResolver(() => ({ token: "token" }));

// prettier-ignore
export const CodeText =
`import { setGlobalArgsResolver } from "@tsvdec/core";

declare module "@tsvdec/core" {
  interface DecoratorArgsOverride {
    type: {
      token: string;
    };
  }
}

setGlobalArgsResolver(() => ({ token: "RANDOM TOKEN" }));`;
