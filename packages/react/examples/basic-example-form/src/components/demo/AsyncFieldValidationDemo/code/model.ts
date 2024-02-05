import { UniqueUsername } from "../shared/validators";

export class ModelForm {
  @UniqueUsername()
  username = "";
}

// prettier-ignore
export const CodeText =
`import { UniqueUsername } from "../shared/validators";

export class ModelForm {
  @UniqueUsername()
  username = "";
}
`;
