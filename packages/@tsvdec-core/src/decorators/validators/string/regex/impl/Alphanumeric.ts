import { translate } from "../../../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../../../utilities";
import { makeValidator, type FieldDecorator } from "../../../../factory/forField";
import { type DecoratorOptions } from "../../../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../../../utilities/DecoratorValidationKeys";
import { testRegex } from "../Pattern";
import { RegexConst } from "../shared/regex.constants";

/** Internal validation function for {@link Alphanumeric} validator. */
function isAlphanumericValid<T extends Types.Optional<string>>(value: T): boolean {
  TypeChecker.checkType("string", value);
  return testRegex(RegexConst.ALPHANUMERIC, value);
}

/**
 * Checks if decorated string contains only alphabetical or number characters.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.ALPHANUMERIC}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Alphanumeric()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Alphanumeric({ message: "Input must contain only alphabetical or number characters (no specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Alphanumeric({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Alphanumeric({
 *     message: "Input must contain only alphabetical or number characters (no specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Alphanumeric<This, Value extends Types.Optional<string>>(
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.ALPHANUMERIC, (value, { locale }) => ({
    valid: isAlphanumericValid(value),
    message: translate(locale, DecoratorValidationKeys.ALPHANUMERIC),
  }));
}
