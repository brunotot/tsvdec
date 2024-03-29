import { translate } from "../../../localization/service/TranslationService";
import { type Types } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/**
 * Checks if a value is not `null`, `undefined`, `false`, an empty array, an empty string, or an invalid Date.
 * @typeParam T - The type of the value.
 */
function isRequiredValid<T>(value: T | undefined): boolean {
  return !(
    Number.isNaN(value) ||
    value === undefined ||
    value === null ||
    value === false ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    (value instanceof Date && value.toString() === "Invalid Date")
  );
}

/**
 * Creates a validator decorator which requires that a value must be present.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.REQUIRED}
 * @typeParam T - The type of the decorated property (any class field).
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use with class fields.
 *
 * @example
 * Example 1: Basic usage
 * ```ts
 * class Product {
 *   \@Required()
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 2: Supplying a custom error message
 * ```ts
 * class Product {
 *   \@Required({ message: "Product name is mandatory" })
 *   name: string;
 * }
 * ```
 *
 * @example
 * Example 3: Supplying a custom error message and groups
 * ```ts
 * class Product {
 *   \@Required({
 *     message: "Product name is mandatory",
 *     groups: ["CREATE"]
 *   })
 *   name: string;
 * }
 * ```
 */
export function Required<This, Value extends Types.Optional>(
  options?: DecoratorOptions<This, Value>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.REQUIRED, (value, { locale }) => ({
    valid: isRequiredValid(value),
    message: translate(locale, DecoratorValidationKeys.REQUIRED),
  }));
}
