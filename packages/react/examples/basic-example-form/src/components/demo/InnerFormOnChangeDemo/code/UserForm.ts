import { Required, attribute } from "@tsvdec/core";
import { AddressForm } from "./AddressForm";

export class UserForm {
  @Required()
  firstName: string = "";

  @Required()
  lastName: string = "";

  @attribute(AddressForm)
  addressForm: AddressForm = new AddressForm();
}

// prettier-ignore
export const CodeText =
`import { Required, attribute } from "@tsvdec/core";
import { AddressForm } from "./AddressForm";

export class UserForm {
  @Required()
  firstName: string = "";

  @Required()
  lastName: string = "";

  @attribute(AddressForm)
  addressForm: AddressForm = new AddressForm();
}`;
