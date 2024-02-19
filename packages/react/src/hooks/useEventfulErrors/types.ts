import { DecoratorArgs, Form, type Types } from "@tsvdec/core";

export type ValidationTrigger =
  | "manual"
  | "onFormChange"
  | "onFieldChange"
  | "onSubmitOnce"
  | "onSubmitAndFormChange";

export type EventfulErrorsProps<TClass> = {
  engine: Form<TClass>;
  form: Types.Payload<TClass>;
  decoratorArgs: DecoratorArgs;
  validationStrategy: ValidationTrigger;
  isSubmitted: boolean;
  submitTrigger: boolean;
};
