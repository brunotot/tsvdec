import { translate } from "../../../localization/service/TranslationService";
import { Objects, TypeChecker } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorKeys } from "../utilities/DecoratorKeys";

/** Internal validation function for {@link ArrayUnique} validator. */
function isArrayUniqueValid(array: any[]): boolean {
  TypeChecker.checkType("array", array);
  const hashFn = Objects.hash;
  function isArrayUnique<T>(arr: T[], equals: (a: T, b: T) => boolean): boolean {
    const set = new Set<T>();
    for (const val of arr) {
      for (const el of set) {
        if (equals(val, el)) {
          return false;
        }
      }
      set.add(val);
    }
    return true;
  }
  return isArrayUnique(array ?? [], (obj1, obj2) => hashFn(obj1) === hashFn(obj2));
}

/**
 * Checks if all elements in decorated array are unique.
 *
 * [@Validator]
 *
 * @key {@link DecoratorKeys.ARRAY_UNIQUE}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArrayUnique()
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArrayUnique({ message: "Languages data must be distinct" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArrayUnique({ groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArrayUnique({
 *     message: "Languages data must be distinct",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArrayUnique<This, Item, Value extends Item[]>(
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorKeys.ARRAY_UNIQUE, (value, { locale }) => ({
    valid: isArrayUniqueValid(value),
    message: translate(locale, DecoratorKeys.ARRAY_UNIQUE),
  }));
}
