import { Pattern, Required, attribute } from "@tsvdec/core";

export class AddressForm {
  @Required()
  country: string = "";
  @Required()
  city: string = "";
  street: string = "";
  @Pattern(/^\d{5}$/, { message: "Postal code must be 5 digits" })
  postalCode: string = "";
}

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
`import { Pattern, Required, attribute } from "@tsvdec/core";

export class AddressForm {
  @Required()
  country: string = "";
  @Required()
  city: string = "";
  street: string = "";
  @Pattern(/^\d{5}\$/, { message: "Postal code must be 5 digits" })
  postalCode: string = "";
}

export class UserForm {
  @Required()
  firstName: string = "";
  @Required()
  lastName: string = "";
  @attribute(AddressForm)
  addressForm: AddressForm = new AddressForm();
}
`;
