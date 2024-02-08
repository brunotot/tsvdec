import { FormConfig, Objects, Types } from "@tsvdec/core";
import { useState } from "react";
import { useEngine } from "../useEngine";
import { useEventfulErrors } from "../useEventfulErrors";
import { type UseValidationConfig, type UseValidationReturn } from "./types";

/**
 * React hook which exposes validation-related props to a form component
 *
 * It provides the same destructuring pattern as you may have when
 * assigning the result of `useState` to a variable. The only key
 * difference is with the additional 3rd argument which holds extra
 * form-related and validation-related information. Most notable are
 * `isValid` and `errors`.
 *
 * @example
 * ```ts
 * const [form, setForm, {
 *   errors,
 *   detailedErrors,
 *   isValid,
 *   engine
 * }] = useValidation(MyClass)
 * ```
 *
 * @typeParam TClass - represents parent form class model holding context of current compontent
 */
// prettier-ignore
export function useValidation<TClass>(
  Class: Types.Class<TClass>,
  props: UseValidationConfig<TClass> = {isSubmitted: false, submitTrigger: false}
): UseValidationReturn<TClass> {
  const { groups, defaultValue, asyncDelay, locale, trigger: validationStrategy = "onFormChange", isSubmitted, submitTrigger} = props;
  const resolveDecoratorArgs = props.resolveDecoratorArgs ?? (() => ({}));
  const decoratorArgs = resolveDecoratorArgs();
  console.log(decoratorArgs);
  const formConfig = { groups, defaultValue, asyncDelay, locale } satisfies FormConfig<TClass>;
  const engine = useEngine<TClass>(Class, formConfig);
  const [form, setForm] = useState<Objects.Payload<TClass>>(engine.defaultValue);
  const { errors: fieldSimpleErrors, detailedErrors: fieldDetailedErrors, globalErrors: classSimpleErrors, validate } = useEventfulErrors({
    decoratorArgs,
    engine,
    form,
    validationStrategy,
    isSubmitted,
    submitTrigger
  });

  return [
    form,
    setForm,
    {
      isValid: engine.isValid(form),
      errors: fieldSimpleErrors,
      detailedErrors: fieldDetailedErrors,
      globalErrors: classSimpleErrors,
      engine,
      validate
    },
  ];
}
