import { translate } from "../../../../localization/service/TranslationService";
import { makeValidator, type FieldDecorator } from "../../../factory/forField";
import { type DecoratorOptions } from "../../../options/DecoratorOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Types } from "../../../../utilities";
import { DecoratorKeys } from "../../utilities/DecoratorKeys";

/**
 * Tests if a value matches a regular expression pattern.
 * @template T - The type of the value being tested.
 * @param regex - The regular expression pattern to test against.
 * @param value - The value to test.
 * @returns A boolean indicating whether the value matches the pattern.
 * @hidden
 */
export function testRegex<T extends Types.Optional<string>>(regex: RegExp, value: T): boolean {
  return (value ?? "").length === 0 || regex.test(value!);
}

/**
 * Creates a validator decorator that checks if a string value matches a regular expression pattern.
 *
 * [@Validator]
 *
 * @key {@link DecoratorKeys.PATTERN}
 * @typeparam T - The type of the decorated property (optional string).
 * @param regex The regular expression pattern to match against the value.
 * @param options - The decorator options.
 * @returns A decorator function to use with class properties.
 * @example
 * 1: Basic usage with default options
 * ```ts
 * class MyClass {
 *   \@Pattern(/^[A-Za-z]+$/)
 *   lettersOnly: string;
 * }
 * ```
 * @example
 * 2: Custom error message and validation groups
 * ```ts
 * class MyClass {
 *   \@Pattern(/^[A-Za-z]+$/, {
 *     key: "AlphabeticPattern",
 *     message: "Must contain only alphabetic characters",
 *     groups: ["group1", "group2"],
 *   })
 *   lettersOnly: string;
 * }
 * ```
 */
export function Pattern<This, Value extends Types.Optional<string>>(
  regex: RegExp,
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorKeys.PATTERN, (value, { locale }) => ({
    valid: testRegex(regex, value),
    message: translate(locale, DecoratorKeys.PATTERN, regex.toString()),
  }));
}
