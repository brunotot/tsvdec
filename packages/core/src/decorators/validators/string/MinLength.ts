import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../utilities";
import { type FieldDecorator } from "../../factory/forField";
import { makeValidator } from "../../factory/forField/makeValidator";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/** Internal validation function for {@link MinLength} validator. */
function isMinLengthValid(value: Types.Optional<string>, min: number): boolean {
  TypeChecker.checkType("string", value);
  return (value ?? "").length >= min;
}

/**
 * Checks if decorated string contains a specific number of characters.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.MIN_LENGTH}
 * @typeParam T - The type of the string property.
 * @param min - Minimum length value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@MinLength(5)
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@MinLength(5, { message: "Input must contain at least 5 characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@MinLength(5, { groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@MinLength(5, { groups: ["UPDATE"], message: "Input must contain at least 5 characters" })
 *   input: string;
 * }
 * ```
 */
export function MinLength<This, Value extends Types.Optional<string>>(
  min: number,
  options?: DecoratorOptions<This, Value>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.MIN_LENGTH, (value, { locale }) => ({
    valid: isMinLengthValid(value, min),
    message: translate(locale, DecoratorValidationKeys.MIN_LENGTH, min),
  }));
}
