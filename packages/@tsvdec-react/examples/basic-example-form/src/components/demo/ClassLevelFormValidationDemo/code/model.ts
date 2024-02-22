import { Required } from "@tsvdec/core";
import { EqualFields } from "../shared/validators";

@EqualFields("password", "confirmPassword")
export class ModelForm {
  @Required({ message: "Password field is mandatory" })
  password: string = "";
  confirmPassword: string = "";
}

// prettier-ignore
export const CodeText =
`import { Required } from "@tsvdec/core";
import { EqualFields } from "../shared/validators";

@EqualFields("password", "confirmPassword")
export class ModelForm {
  @Required({ message: "Password field is mandatory" })
  password: string = "";
  confirmPassword: string = "";
}
`;
