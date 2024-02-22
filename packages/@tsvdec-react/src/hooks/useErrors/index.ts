import { FormErrors } from "@tsvdec/core";
import { useCallback, useEffect, useState } from "react";
import { ErrorsProps, ErrorsState } from "./types";

export function useErrors<TClass>({
  engine,
  form,
  decoratorArgs,
  initialValidation = false,
}: ErrorsProps<TClass>): ErrorsState<TClass> {
  // prettier-ignore
  const [globalErrors, setGlobalErrors] = useState<FormErrors<TClass>["globalErrors"]>(() => initialValidation ? engine.validate(form, decoratorArgs).globalErrors : {} as any);
  // prettier-ignore
  const [detailedErrors, setDetailedErrors] = useState<FormErrors<TClass>["detailedErrors"]>(() => initialValidation ? engine.validate(form, decoratorArgs).detailedErrors : {} as any);
  // prettier-ignore
  const [errors, setErrors] = useState<FormErrors<TClass>["errors"]>(() => initialValidation ? engine.validate(form, decoratorArgs).errors : {} as any);

  const validate = useCallback(
    (field?: string) => {
      if (field) {
        // @ts-expect-error - TS doesn't understand that `field` is a key of `TClass`
        const [detailedErrors, simpleErrors] = engine.validateField(field, form, decoratorArgs);
        setErrors((prev: any) => ({ ...prev, [field]: simpleErrors }));
        setDetailedErrors((prev: any) => ({ ...prev, [field]: detailedErrors }));
        return;
      }

      const { errors, detailedErrors, globalErrors } = engine.validate(form, decoratorArgs);
      setDetailedErrors(detailedErrors);
      setErrors(errors);
      setGlobalErrors(globalErrors);
    },
    [engine, form, JSON.stringify(decoratorArgs)],
  );

  useEffect(() => {
    engine.registerAsync(({ errors, detailedErrors, globalErrors }) => {
      setDetailedErrors(detailedErrors);
      setErrors(errors);
      setGlobalErrors(globalErrors);
    });
    return () => {
      engine.unregisterAsync();
    };
  }, [engine]);

  return {
    errors,
    detailedErrors,
    globalErrors,
    validate,
  };
}
