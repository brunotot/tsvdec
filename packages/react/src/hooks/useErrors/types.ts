import { DecoratorArgs, Form, FormErrors, Objects } from "@tsvdec/core";

export type ErrorsState<TClass> = FormErrors<TClass> & {
  validate: (field?: string) => void;
};

export type ErrorsProps<TClass> = {
  engine: Form<TClass>;
  form: Objects.Payload<TClass>;
  decoratorArgs: DecoratorArgs;
  initialValidation?: boolean;
};
