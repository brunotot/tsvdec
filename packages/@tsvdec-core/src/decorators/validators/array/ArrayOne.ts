import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker, Types } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/** Internal validation function for {@link ArrayOne} validator. */
function isArrayOneValid<K, T extends K[]>(array: T, predicate: Types.ArrayPredicate<K>): boolean {
  TypeChecker.checkType("array", array);
  return (array ?? []).filter(predicate).length === 1;
}

/**
 * Checks if exactly one element of decorated array satisfies the given predicate criteria.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.ARRAY_ONE}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `Array.filter()` call.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num >= 0)
 *   onlyOnePositive: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num > 0, { message: "Exactly one positive number is allowed" })
 *   onlyOnePositive: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num > 0, { groups: ["UPDATE"] })
 *   onlyOnePositive: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayOne(num => num > 0, {
 *     message: "Exactly one positive number is allowed",
 *     groups: ["UPDATE"]
 *   })
 *   onlyOnePositive: string[];
 * }
 * ```
 **/
export function ArrayOne<This, Item, Value extends Item[]>(
  predicate: Types.ArrayPredicate<Item>,
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.ARRAY_ONE, (value, { locale }) => ({
    valid: isArrayOneValid(value, predicate),
    message: translate(locale, DecoratorValidationKeys.ARRAY_ONE),
  }));
}
