import { DecoratorArgs, Form, FormErrors, type Types } from "@tsvdec/core";

export type ErrorsState<TClass> = FormErrors<TClass> & {
  validate: (field?: string) => void;
};

export type ErrorsProps<TClass> = {
  engine: Form<TClass>;
  form: Types.Payload<TClass>;
  decoratorArgs: DecoratorArgs;
  initialValidation?: boolean;
};
