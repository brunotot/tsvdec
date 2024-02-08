import { Required } from "@tsvdec/core";

export class AddressForm {
  @Required()
  street: string = "";

  @Required()
  city: string = "";

  @Required()
  zipCode: string = "";
}

// prettier-ignore
export const CodeText =
`import { Required } from "@tsvdec/core";

export class AddressForm {
  @Required()
  street: string = "";

  @Required()
  city: string = "";

  @Required()
  zipCode: string = "";
}`;
