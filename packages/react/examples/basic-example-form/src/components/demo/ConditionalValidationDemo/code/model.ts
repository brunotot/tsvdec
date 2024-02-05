import { Required, validateFieldIf } from "@tsvdec/core";

export class ModelForm {
  @Required({ message: "idRequired", validateIf: m => m.validationEnabled })
  id: string = "";

  @validateFieldIf(m => m.validationEnabled)
  @Required({ message: "descriptionRequired" })
  description: string = "";

  @Required({ message: "creationDateRequired" })
  creationDate: string = "";

  @Required({ message: "deadlineDateRequired" })
  deadlineDate: string = "";

  validationEnabled: boolean = false;
}

// prettier-ignore
export const CodeText =
`import { Required, validateFieldIf } from "@tsvdec/core";

export class ModelForm {
  @Required({ message: "idRequired", validateIf: m => m.validationEnabled })
  id: string = "";

  @validateFieldIf(m => m.validationEnabled)
  @Required({ message: "descriptionRequired" })
  description: string = "";

  @Required({ message: "creationDateRequired" })
  creationDate: string = "";

  @Required({ message: "deadlineDateRequired" })
  deadlineDate: string = "";

  validationEnabled: boolean = false;
}
`;
