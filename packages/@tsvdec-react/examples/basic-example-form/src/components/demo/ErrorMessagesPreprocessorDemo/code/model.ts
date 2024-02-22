import { Required } from "@tsvdec/core";
import "../shared/app"; // <-- Necessary import for setting up the global message parser.

export class ModelForm {
  @Required({ message: "idRequired" })
  id: string = "";

  @Required({ message: "descriptionRequired" })
  description: string = "";

  @Required({ message: "creationDateRequired" })
  creationDate: string = "";

  @Required({ message: "deadlineDateRequired" })
  deadlineDate: string = "";
}

// prettier-ignore
export const CodeText =
`import { Required } from "@tsvdec/core";
import "../shared/app"; // <-- Necessary import for setting up the global message parser.

export class ModelForm {
  @Required({ message: "idRequired" })
  id: string = "";

  @Required({ message: "descriptionRequired" })
  description: string = "";

  @Required({ message: "creationDateRequired" })
  creationDate: string = "";

  @Required({ message: "deadlineDateRequired" })
  deadlineDate: string = "";
}
`;
