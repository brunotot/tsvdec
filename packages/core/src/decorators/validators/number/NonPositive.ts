import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/** Internal validation function for {@link NonPositive} validator. */
function isNonPositiveValid(num: Types.Optional<number>): boolean {
  TypeChecker.checkType("number", num);
  return num !== undefined && num !== null && num <= 0;
}

/**
 * Checks if decorated number is not a positive number (can be 0).
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.NON_POSITIVE}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@NonPositive()
 *   num: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@NonPositive({ message: "Number value must not be a positive number" })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@NonPositive({ groups: ["UPDATE"] })
 *   num: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@NonPositive({
 *     message: "Number value must not be a positive number",
 *     groups: ["UPDATE"]
 *   })
 *   num: number;
 * }
 * ```
 */
export function NonPositive<This, Value extends Types.Optional<number>>(
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.NON_POSITIVE, (value, { locale }) => ({
    valid: isNonPositiveValid(value),
    message: translate(locale, DecoratorValidationKeys.NON_POSITIVE),
  }));
}
