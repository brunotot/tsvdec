import { translate } from "../../../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../../../utilities";
import { makeValidator, type FieldDecorator } from "../../../../factory/forField";
import { type DecoratorOptions } from "../../../../options/DecoratorOptions";
import { DecoratorKeys } from "../../../utilities/DecoratorKeys";
import { testRegex } from "../Pattern";
import { RegexConst } from "../shared/regex.constants";

/** Internal validation function for {@link Uppercase} validator. */
function isUppercaseValid<T extends Types.Optional<string>>(value: T): boolean {
  TypeChecker.checkType("string", value);
  return testRegex(RegexConst.UPPERCASE, value);
}

/**
 * Checks if decorated string contains only uppercase characters.
 *
 * [@Validator]
 *
 * @key {@link DecoratorKeys.UPPERCASE}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Uppercase()
 *   input: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Uppercase({ message: "Input must contain only uppercase characters" })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Uppercase({ groups: ["UPDATE"] })
 *   input: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Uppercase({
 *     message: "Input must contain only uppercase characters",
 *     groups: ["UPDATE"]
 *   })
 *   input: string;
 * }
 * ```
 */
export function Uppercase<This, Value extends Types.Optional<string>>(
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorKeys.UPPERCASE, (value, { locale }) => ({
    valid: isUppercaseValid(value),
    message: translate(locale, DecoratorKeys.UPPERCASE),
  }));
}
