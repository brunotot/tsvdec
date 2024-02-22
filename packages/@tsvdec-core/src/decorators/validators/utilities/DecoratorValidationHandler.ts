import { FormMetadata } from "../../../validation";
import { DecoratorValidationResult } from "../../validators/utilities/DecoratorValidationResult";

/**
 * Represents a function that evaluates a value and returns a validation result.
 *
 * @typeParam T - The type of the value being evaluated.
 */
export type DecoratorValidationHandler<T> = ((
  value: T,
  meta: FormMetadata,
) => DecoratorValidationResult | Promise<DecoratorValidationResult>) & {};
