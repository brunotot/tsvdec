import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/** Internal validation function for {@link ArraySizeExact} validator. */
function isArraySizeExactValid(array: any[], size: number): boolean {
  TypeChecker.checkType("array", array);
  return (array ?? []).length === size;
}

/**
 * Checks if the decorated array contains an exact number of elements.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.ARRAY_SIZE_EXACT}
 * @typeParam T - The type of decorated array property.
 * @typeParam K - The type of elements in the decorated array.
 * @param exact - Exact size value.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Array<any>`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3)
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3, { message: "You must choose exactly 3 languages" })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3, { groups: ["UPDATE"] })
 *   languages: string[];
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@ArraySizeExact(3, {
 *     message: "You must choose exactly 3 languages",
 *     groups: ["UPDATE"]
 *   })
 *   languages: string[];
 * }
 * ```
 */
export function ArraySizeExact<This, Item, Value extends Item[]>(
  exact: number,
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.ARRAY_SIZE_EXACT, (value, { locale }) => ({
    valid: isArraySizeExactValid(value, exact),
    message: translate(
      locale,
      DecoratorValidationKeys.ARRAY_SIZE_EXACT,
      (value ?? []).length,
      exact,
    ),
  }));
}
