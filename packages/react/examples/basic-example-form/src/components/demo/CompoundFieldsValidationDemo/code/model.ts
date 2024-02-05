import { AssertTrue, Required } from "@tsvdec/core";

export type Model = {
  password: string;
  confirmPassword: string;
};

export class ModelForm implements Model {
  @Required({ message: "Password field is mandatory" })
  password: string = "";
  confirmPassword: string = "";

  @AssertTrue({ message: "Passwords must match" })
  get passwordsMatch() {
    return this.password === this.confirmPassword;
  }
}

// prettier-ignore
export const CodeText =
`import { AssertTrue, Required } from "@tsvdec/core";

export type Model = {
  password: string;
  confirmPassword: string;
};

export class ModelForm implements Model {
  @Required({ message: "Password field is mandatory" })
  password: string = "";
  confirmPassword: string = "";

  @AssertTrue({ message: "Passwords must match" })
  get passwordsMatch() {
    return this.password === this.confirmPassword;
  }
}
`;
