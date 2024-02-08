import { Required } from "@tsvdec/core";

export class ModelForm {
  @Required()
  id: string = "";

  @Required()
  description: string = "";

  @Required()
  creationDate: string = "";

  @Required()
  deadlineDate: string = "";
}

// prettier-ignore
export const CodeText =
`import { Required } from "@tsvdec/core";

export class ModelForm {
  @Required()
  id: string = "";

  @Required()
  description: string = "";

  @Required()
  creationDate: string = "";

  @Required()
  deadlineDate: string = "";
}`;
