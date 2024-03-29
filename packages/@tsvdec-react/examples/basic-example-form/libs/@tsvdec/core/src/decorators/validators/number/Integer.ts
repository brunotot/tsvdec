import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/** Internal validation function for {@link Integer} validator. */
function isIntegerValid(num: Types.Optional<number>): boolean {
  TypeChecker.checkType("number", num);
  return num !== undefined && num !== null && Number.isInteger(num);
}

/**
 * Checks if decorated number is an integer number.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.INTEGER}
 * @typeParam T - The type of the number property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `number`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Integer()
 *   age: number;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Integer({ message: "Age number input must be an integer" })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Integer({ groups: ["UPDATE"] })
 *   age: number;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Integer({
 *     message: "Age number input must be an integer",
 *     groups: ["UPDATE"]
 *   })
 *   age: number;
 * }
 * ```
 */
export function Integer<This, Value extends Types.Optional<number>>(
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.INTEGER, (value, { locale }) => ({
    valid: isIntegerValid(value),
    message: translate(locale, DecoratorValidationKeys.INTEGER),
  }));
}
