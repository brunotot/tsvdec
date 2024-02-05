import { DecoratorKeys } from "../../../../decorators/data/validators/DecoratorKeys";
import { createFieldValidator, type FieldDecorator } from "../../../../decorators/factory/forField";
import {
  buildDecoratorMeta,
  buildKeyProp,
  buildMessageProp,
  type DecoratorOptions,
} from "../../../../decorators/helper";
import { translate } from "../../../../localization/service/TranslationService";
import { Objects } from "../../../../utilities";

/** Internal validation function for {@link ArraySome} validator. */
function isArraySomeValid<K, T extends K[]>(
  array: T,
  predicate: Objects.ArrayPredicate<K>,
): boolean {
  Objects.assertType("array", array);
  return (array ?? []).some(predicate);
}

/**
 * Checks if at least one element of decorated array satisfies the given predicate criteria.
 *
 * @key {@link DecoratorKeys.ARRAY_SOME}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param predicate - The predicate for `Array.some()` call.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySome(num => num >= 0)
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySome(num => num > 0, { message: "At least one element must be greater than 0" })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySome(num => num > 0, { groups: ["UPDATE"] })
 *   negativeNumbers: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySome(num => num > 0, {
 *     message: "At least one element must be greater than 0",
 *     groups: ["UPDATE"]
 *   })
 *   negativeNumbers: string[];
 * }
 * ```
 **/
export function ArraySome<This, Item, Value extends Item[]>(
  predicate: Objects.ArrayPredicate<Item>,
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return createFieldValidator<This, Value>(
    (array, _context, locale) => ({
      key: buildKeyProp(options, DecoratorKeys.ARRAY_SOME),
      valid: isArraySomeValid(array, predicate),
      message: buildMessageProp(options, locale, translate(locale, DecoratorKeys.ARRAY_SOME)),
    }),
    buildDecoratorMeta(options),
  );
}
