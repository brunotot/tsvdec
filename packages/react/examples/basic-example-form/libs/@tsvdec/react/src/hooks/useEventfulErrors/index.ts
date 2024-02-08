import useCompare from "../useCompare";
import { useErrors } from "../useErrors";
import { ErrorsState } from "../useErrors/types";
import { useListener } from "../useListener";
import { usePrevious } from "../usePrevious";
import { EventfulErrorsProps } from "./types";

export function useEventfulErrors<TClass>({
  engine,
  form,
  decoratorArgs,
  isSubmitted,
  submitTrigger,
  validationStrategy: strategy,
}: EventfulErrorsProps<TClass>): ErrorsState<TClass> {
  const comparison = useCompare(form);
  const prevSubmitTrigger = usePrevious(submitTrigger);
  const initialValidation = ["onFormChange"].includes(strategy);
  const { errors, detailedErrors, globalErrors, validate } = useErrors({
    engine,
    form,
    decoratorArgs,
    initialValidation,
  });

  // prettier-ignore
  useListener(strategy, ["onFieldChange"], () => {
    if (isSubmitted && prevSubmitTrigger !== submitTrigger) {
      validate();
      return;
    }
    Object.keys(comparison ?? {}).forEach((f) => validate(f));
  }, [validate, comparison, submitTrigger]);

  // prettier-ignore
  useListener(strategy, ["onSubmitOnce"], () => {
    isSubmitted && prevSubmitTrigger !== submitTrigger && validate();
  }, [submitTrigger, isSubmitted, validate]);

  // prettier-ignore
  useListener(strategy, ["onSubmitAndFormChange"], () => {
    isSubmitted && validate();
  }, [isSubmitted, validate]);

  // prettier-ignore
  useListener(strategy, ["onFormChange"], () => {
    validate();
  }, [validate]);

  return { errors, detailedErrors, globalErrors, validate };
}
