import { Email, Numeric, Required } from "@tsvdec/core";
import { AdultAgeValid, CaseInsensitiveContains, PasswordsMustMatch } from "../shared/validators";

export type Model = {
  testEmail: string;
  age: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: Date;
};

export default class ModelForm implements Model {
  @CaseInsensitiveContains("Test", "custom")
  @Email({ groups: ["native"] })
  @Required({ groups: ["native"] })
  testEmail: string = "";

  @AdultAgeValid("custom")
  @Numeric({ groups: ["native"] })
  age: string = "";

  @Required({ groups: ["native"] })
  password: string = "";

  @PasswordsMustMatch("custom")
  confirmPassword: string = "";

  @Required({ groups: ["native"] })
  dateOfBirth?: Date;

  // TODO isAsyncValid!

  /*@collection.boolean.AssertTrue({
    message: "Passwords must match!",
    groups: ["native"],
  })
  get arePasswordsEqual() {
    return this.password === this.confirmPassword;
  }*/
}

// prettier-ignore
export const CodeText =
`import { Email, Numeric, Required } from "@tsvdec/core";
import { AdultAgeValid, CaseInsensitiveContains, PasswordsMustMatch } from "../shared/validators";

export type Model = {
  testEmail: string;
  age: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: Date;
};

export default class ModelForm implements Model {
  @CaseInsensitiveContains("Test", "custom")
  @Email({ groups: ["native"] })
  @Required({ groups: ["native"] })
  testEmail: string = "";

  @AdultAgeValid("custom")
  @Numeric({ groups: ["native"] })
  age: string = "";

  @Required({ groups: ["native"] })
  password: string = "";

  @PasswordsMustMatch("custom")
  confirmPassword: string = "";

  @Required({ groups: ["native"] })
  dateOfBirth?: Date;

  // TODO isAsyncValid!

  /*@collection.boolean.AssertTrue({
    message: "Passwords must match!",
    groups: ["native"],
  })
  get arePasswordsEqual() {
    return this.password === this.confirmPassword;
  }*/
}
`;
