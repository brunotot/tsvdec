import { translate } from "../../../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../../../utilities";
import { makeValidator, type FieldDecorator } from "../../../../factory/forField";
import { type DecoratorOptions } from "../../../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../../../utilities/DecoratorValidationKeys";
import { testRegex } from "../Pattern";
import { RegexConst } from "../shared/regex.constants";

/** Internal validation function for {@link URL} validator. */
function isURLValid<T extends Types.Optional<string>>(value: T): boolean {
  TypeChecker.checkType("string", value);
  return testRegex(RegexConst.URL, value);
}

/**
 * Checks if decorated string is a valid URL.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.URL}
 * @typeParam T - The type of the string property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@URL()
 *   url: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@URL({ message: "Input is not a valid URL" })
 *   url: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@URL({ groups: ["UPDATE"] })
 *   url: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@URL({
 *     message: "Input is not a valid URL",
 *     groups: ["UPDATE"]
 *   })
 *   url: string;
 * }
 * ```
 */
export function URL<This, Value extends Types.Optional<string>>(
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.URL, (value, { locale }) => ({
    valid: isURLValid(value),
    message: translate(locale, DecoratorValidationKeys.URL),
  }));
}
