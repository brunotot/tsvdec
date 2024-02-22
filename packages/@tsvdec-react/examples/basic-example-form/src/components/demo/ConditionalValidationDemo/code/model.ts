import { Required, validateFieldIf } from "@tsvdec/core";

export class ModelForm {
  @Required({ message: "id is required", validateIf: m => m.validationEnabled })
  id: string = "";

  @validateFieldIf(m => m.validationEnabled)
  @Required({ message: "description is required" })
  description: string = "";

  @Required({ message: "creationDate is required" })
  creationDate: string = "";

  @Required({ message: "deadlineDate is required" })
  deadlineDate: string = "";

  validationEnabled: boolean = false;
}

// prettier-ignore
export const CodeText =
`import { Required, validateFieldIf } from "@tsvdec/core";

export class ModelForm {
  @Required({ message: "id is required", validateIf: m => m.validationEnabled })
  id: string = "";

  @validateFieldIf(m => m.validationEnabled)
  @Required({ message: "description is required" })
  description: string = "";

  @Required({ message: "creationDate is required" })
  creationDate: string = "";

  @Required({ message: "deadlineDate is required" })
  deadlineDate: string = "";

  validationEnabled: boolean = false;
}
`;
