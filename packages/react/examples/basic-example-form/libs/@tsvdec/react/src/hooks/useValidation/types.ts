import {
  DecoratorArgs,
  DetailedErrorsResponse,
  Locale,
  Objects,
  SimpleErrorsResponse,
  type Form,
  type ValidationResult,
} from "@tsvdec/core";
import type { Dispatch, SetStateAction } from "react";

/**
 * Validation-specific properties object which is meant to be consumed in a React component
 */
export type UseValidationData<TClass> = {
  isValid: boolean;
  detailedErrors: DetailedErrorsResponse<TClass>;
  errors: SimpleErrorsResponse<TClass>;
  engine: Form<TClass>;
  globalErrors: ValidationResult[];
};

/**
 * A type representing the return value of `useValidation` hook and is consisted of form state getter & setter and other data defined in `UseValidationData` type
 */
export type UseValidationReturn<TClass> = readonly [
  Objects.Payload<TClass>,
  Dispatch<SetStateAction<Objects.Payload<TClass>>>,
  UseValidationData<TClass>,
];

/**
 * The configuration object of `useValidation` hook. Accepts a default value and groups which should be taken into consideration when validating
 */
export type UseValidationConfig<TClass> = {
  defaultValue?: Objects.Payload<TClass>;
  groups?: string[];
  resolveDecoratorArgs?: () => DecoratorArgs;
  asyncDelay?: number;
  locale?: Locale;
};
