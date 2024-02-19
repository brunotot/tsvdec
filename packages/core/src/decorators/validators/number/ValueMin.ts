import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorKeys } from "../utilities/DecoratorKeys";

/** Internal validation function for {@link ValueMin} validator. */
function isValueMinValid(num: Types.Optional<number>, min: number): boolean {
  TypeChecker.checkType("number", num);
  return num == null ? true : num >= min;
}

/**
 * Checks if decorated number is not lesser than given `min` parameter.
 *
 * [@Validator]
 *
 * @key {@link DecoratorKeys.VALUE_MIN}
 * @typeParam T - The type of the number property.
 * @param min - Minimum allowed value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ValueMin(5)
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ValueMin(5, { message: "Minimum allowed value is 5" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ValueMin(5, { groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ValueMin(5, {
 *     message: "Minimum allowed value is 5",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function ValueMin<This, Value extends Types.Optional<number>>(
  min: number,
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorKeys.VALUE_MIN, (value, { locale }) => ({
    valid: isValueMinValid(value, min),
    message: translate(locale, DecoratorKeys.VALUE_MIN, min),
  }));
}
