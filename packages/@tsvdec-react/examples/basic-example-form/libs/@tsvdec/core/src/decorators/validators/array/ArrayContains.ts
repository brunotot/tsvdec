import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/** Internal validation function for {@link ArrayContains} validator. */
function isArrayContainsValid<K, T extends K[]>(value: T, contains: K): boolean {
  TypeChecker.checkType("array", value);
  return (value ?? []).includes(contains);
}

/**
 * Checks if the decorated array contains a specific value.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.ARRAY_CONTAINS}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param contains - The value to check.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayContains("en")
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayContains("en", { message: "English language must be selected" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayContains("en", { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayContains("en", {
 *     message: "English language must be selected",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayContains<This, Item, Value extends Item[]>(
  contains: Item,
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.ARRAY_CONTAINS, (value, { locale }) => ({
    valid: isArrayContainsValid(value, contains),
    message: translate(locale, DecoratorValidationKeys.ARRAY_CONTAINS, contains),
  }));
}
