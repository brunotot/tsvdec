import { DecoratorArgs, DecoratorValidationResult } from "../decorators";
import { type Locale } from "../localization";
import type { StrategyDetailedErrorsResponse, StrategySimpleErrorsResponse } from "../strategy";
import { type Types } from "../utilities";

export type FormMetadata = {
  context: any;
  locale: Locale;
  args: DecoratorArgs;
};

export type FormErrors<TClass> = {
  errors: StrategySimpleErrorsResponse<TClass>;
  detailedErrors: StrategyDetailedErrorsResponse<TClass>;
  globalErrors: DecoratorValidationResult[];
};

/**
 * Configuration options for entity processing.
 *
 * @typeParam TClass - The type of the default value.
 */
export type FormProps<TClass> = {
  defaultValue?: Types.Payload<TClass>;
  groups?: string[];
  locale?: Locale;
  asyncDelay?: number;
};

/**
 * The result of entity validation.
 * @typeParam T - The type of the entity being validated.
 */
export type FormValidationResponse<T> = FormErrors<T> & {
  valid: boolean;
};
