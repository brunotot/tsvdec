import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/** Internal validation function for {@link ArrayEvery} validator. */
function isArrayEveryValid<K, T extends K[]>(
  array: T,
  predicate: Types.ArrayPredicate<K>,
): boolean {
  TypeChecker.checkType("array", array);
  return (array ?? []).every(predicate);
}

/**
 * Checks if all elements of decorated array satisfy the given predicate criteria.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.ARRAY_EVERY}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `Array.every()` call.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayEvery(num => num > 0)
 *   positiveNumbers: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayEvery(num => num > 0, { message: "All elements must be greater than 0" })
 *   positiveNumbers: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayEvery(num => num > 0, { groups: ["UPDATE"] })
 *   positiveNumbers: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayEvery(num => num > 0, {
 *     message: "All elements must be greater than 0",
 *     groups: ["UPDATE"]
 *   })
 *   positiveNumbers: string[];
 * }
 * ```
 **/
export function ArrayEvery<This, Item, Value extends Item[]>(
  predicate: Types.ArrayPredicate<Item>,
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.ARRAY_EVERY, (value, { locale }) => ({
    valid: isArrayEveryValid(value, predicate),
    message: translate(locale, DecoratorValidationKeys.ARRAY_EVERY),
  }));
}
