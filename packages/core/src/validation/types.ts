import { DecoratorArgs } from "../decorators";
import { DecoratorMeta } from "../decorators/factory/DecoratorFactoryMeta";
import { type Locale } from "../localization";
import type { StrategyDetailedErrorsResponse, StrategySimpleErrorsResponse } from "../strategy";
import { type Types } from "../utilities";

export type ValidationEvaluatorMeta = {
  context: any;
  locale: Locale;
  args: DecoratorArgs;
};

/**
 * Represents a function that evaluates a value and returns a validation result.
 *
 * @typeParam T - The type of the value being evaluated.
 */
export type ValidationEvaluator<T> = ((
  value: T,
  meta: ValidationEvaluatorMeta,
) => ValidationResult | Promise<ValidationResult>) & {};

/**
 * Represents metadata for a validation rule, including the associated validation groups and the evaluator function.
 *
 * @typeParam T - The type of the value being evaluated.
 */
export type ValidationMetadataEntry<T, Class> = {
  meta: DecoratorMeta<Class>;
  validate: ValidationEvaluator<T>;
};

/**
 * Represents the result of a validation, including the key, message, and whether it's valid.
 */
export type ValidationResult = {
  key: string;
  message: string;
  valid: boolean;
};

export type FormErrors<TClass> = {
  errors: StrategySimpleErrorsResponse<TClass>;
  detailedErrors: StrategyDetailedErrorsResponse<TClass>;
  globalErrors: ValidationResult[];
};

/**
 * Defines the properties for an async event response.
 * @typeParam TClass - The type of the class being validated.
 */
export type AsyncEventResponseProps<TClass> = FormErrors<TClass>;

/**
 * Defines the properties for an async event handler.
 * @typeParam TClass - The type of the class being validated.
 */
export type AsyncEventHandlerProps<TClass> = {
  key: keyof TClass;
  value: ValidationResult;
};

/**
 * Type for the async event handler function.
 * @typeParam TClass - The type of the class being validated.
 */
export type AsyncEventHandler<TClass> = ((data: AsyncEventHandlerProps<TClass>) => void) & {};

/**
 * Configuration options for entity processing.
 *
 * @typeParam TClass - The type of the default value.
 */
export type FormConfig<TClass> = {
  defaultValue?: Types.Payload<TClass>;
  groups?: string[];
  locale?: Locale;
  asyncDelay?: number;
};

/**
 * The result of entity validation.
 *
 * @typeParam T - The type of the entity being validated.
 */
export type FormValidateResponse<T> = {
  valid: boolean;
  detailedErrors: StrategyDetailedErrorsResponse<T>;
  errors: StrategySimpleErrorsResponse<T>;
  globalErrors: ValidationResult[];
};
