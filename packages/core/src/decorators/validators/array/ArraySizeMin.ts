import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/** Internal validation function for {@link ArraySizeMin} validator. */
function isArraySizeMinValid(array: any[], min: number): boolean {
  TypeChecker.checkType("array", array);
  return (array ?? []).length >= min;
}

/**
 * Checks if the decorated array contains at least `min` number of elements.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.ARRAY_SIZE_MIN}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param min - Min size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { message: "You must choose at least 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeMin(3, {
 *     message: "You must choose at least 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeMin<This, Item, Value extends Item[]>(
  min: number,
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.ARRAY_SIZE_MIN, (value, { locale }) => ({
    valid: isArraySizeMinValid(value, min),
    message: translate(locale, DecoratorValidationKeys.ARRAY_SIZE_MIN, min),
  }));
}
