import { Required } from "@tsvdec/core";
import { ValidationGroup } from "../shared/groups";

export class ModelForm {
  @Required({ groups: [ValidationGroup.DEMO_ID] })
  id: string = "";

  @Required({ groups: [ValidationGroup.DEMO_DESCRIPTION] })
  description: string = "";

  @Required({ groups: [ValidationGroup.DEMO_CREATION_DATE] })
  creationDate: string = "";

  @Required({ groups: [ValidationGroup.DEMO_DEADLINE_DATE] })
  deadlineDate: string = "";
}

// prettier-ignore
export const CodeText =
`import { Required } from "@tsvdec/core";
import { ValidationGroup } from "../shared/groups";

export class ModelForm {
  @Required({ groups: [ValidationGroup.DEMO_ID] })
  id: string = "";

  @Required({ groups: [ValidationGroup.DEMO_DESCRIPTION] })
  description: string = "";

  @Required({ groups: [ValidationGroup.DEMO_CREATION_DATE] })
  creationDate: string = "";

  @Required({ groups: [ValidationGroup.DEMO_DEADLINE_DATE] })
  deadlineDate: string = "";
}
`;
