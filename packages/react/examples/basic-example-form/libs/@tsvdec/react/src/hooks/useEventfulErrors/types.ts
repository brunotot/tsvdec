import { DecoratorArgs, Form, Objects } from "@tsvdec/core";

export type ValidationTrigger =
  | "manual"
  | "onFormChange"
  | "onFieldChange"
  | "onSubmitOnce"
  | "onSubmitAndFormChange";

export type EventfulErrorsProps<TClass> = {
  engine: Form<TClass>;
  form: Objects.Payload<TClass>;
  decoratorArgs: DecoratorArgs;
  validationStrategy: ValidationTrigger;
  isSubmitted: boolean;
  submitTrigger: boolean;
};
