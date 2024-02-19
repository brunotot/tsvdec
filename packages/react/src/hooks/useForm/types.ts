import {
  DecoratorArgs,
  Locale,
  StrategyDetailedErrorsResponse,
  StrategySimpleErrorsResponse,
  type Types,
  type ValidationResult,
} from "@tsvdec/core";
import { type Dispatch, type SetStateAction } from "react";
import { type FormProviderProps } from "../../components";
import { ValidationTrigger } from "../useEventfulErrors/types";
import { type UseResetReturn } from "../useReset/types";

/**
 * Configuration options for the `useForm` hook.
 */
export type UseFormConfig<TClass> = {
  defaultValue?: Types.Payload<TClass>;
  validationGroups?: string[];
  validateImmediately?: boolean;
  standalone?: boolean;
  resolveDecoratorArgs?: () => DecoratorArgs;
  onSubmit?: () => Promise<void> | void;
  onSubmitValidationFail?: (errors: StrategySimpleErrorsResponse<TClass>) => void;
  onChange?: (value: Types.Payload<TClass>) => void;
  asyncDelay?: number;
  locale?: Locale;
  trigger?: ValidationTrigger;
};

/**
 * Data returned from the `useForm` hook.
 */
export type UseFormData<TClass> = {
  isValid: boolean;
  isSubmitted: boolean;
  onSubmit: () => Promise<void>;
  mutations: UseFormChangeHandlerMap<Types.Payload<TClass>>;
  providerProps: Omit<FormProviderProps, "children">;
  globalErrors: ValidationResult[];
  errors: StrategySimpleErrorsResponse<TClass>;
  detailedErrors: StrategyDetailedErrorsResponse<TClass>;
  reset: UseResetReturn<TClass>;
  validate: (field?: string) => void;
};

/**
 * Type of the value returned by the `useForm` hook.
 */
export type UseFormReturn<TClass> = readonly [
  Types.Payload<TClass>,
  Dispatch<SetStateAction<Types.Payload<TClass>>>,
  UseFormData<TClass>,
];

/**
 * Argument type for the form field setter function.
 */
export type UseFormSetterFnArg<TBody, TKey extends keyof TBody> =
  | TBody[TKey]
  | ((prev: TBody[TKey]) => TBody[TKey]);

/**
 * Type of the form field setter function.
 */
export type UseFormSetterFn<TBody> = <TKey extends keyof TBody>(
  key: TKey,
  value: UseFormSetterFnArg<TBody, TKey>,
) => void;

/**
 * Map of change handlers for form fields.
 */
export type UseFormChangeHandlerMap<TBody> = {
  [TKey in keyof TBody]: (value: TBody[TKey]) => void;
};
