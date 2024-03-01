import { translate } from "../../../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../../../utilities";
import { makeValidator, type FieldDecorator } from "../../../../factory/forField";
import { type DecoratorOptions } from "../../../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../../../utilities/DecoratorValidationKeys";
import { testRegex } from "../Pattern";
import { RegexConst } from "../shared/regex.constants";

/** Internal validation function for {@link Alpha} validator. */
function isAlphaValid<T extends Types.Optional<string>>(value: T): boolean {
  TypeChecker.checkType("string", value);
  return testRegex(RegexConst.ALPHA, value);
}

/**
 * Checks if decorated string contains only alphabetical characters.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.ALPHA}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Alpha()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Alpha({ message: "Input must contain only alphabetical characters (no numbers or specials)" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Alpha({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Alpha({
 *     message: "Input must contain only alphabetical characters (no numbers or specials)",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Alpha<This, Value extends Types.Optional<string>>(
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.ALPHA, (value, { locale }) => ({
    valid: isAlphaValid(value),
    message: translate(locale, DecoratorValidationKeys.ALPHA),
  }));
}
