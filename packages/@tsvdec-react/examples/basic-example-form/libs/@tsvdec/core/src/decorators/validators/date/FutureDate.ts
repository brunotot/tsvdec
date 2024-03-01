import { translate } from "../../../localization/service/TranslationService";
import { TypeChecker, type Types } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { type DecoratorOptions } from "../../options/DecoratorOptions";
import { DecoratorValidationKeys } from "../utilities/DecoratorValidationKeys";

/** Internal validation function for {@link FutureDate} validator. */
function isFutureDateValid<T extends Types.Optional<Date>>(date: T): boolean {
  TypeChecker.checkType("date", date);
  return date && date.getTime() > new Date().getTime();
}

/**
 * Checks if a {@link Date} is in the future.
 *
 * [@Validator]
 *
 * @key {@link DecoratorValidationKeys.FUTURE_DATE}
 * @typeParam T - The type of the date property.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `Date`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@FutureDate()
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@FutureDate({ message: "Date must be in the future" })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@FutureDate({ groups: ["UPDATE"] })
 *   date: Date;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@FutureDate({
 *     message: "Date must be in the future",
 *     groups: ["UPDATE"]
 *   })
 *   date: Date;
 * }
 * ```
 */
export function FutureDate<This, Value extends Types.Optional<Date>>(
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorValidationKeys.FUTURE_DATE, (value, { locale }) => ({
    valid: isFutureDateValid(value),
    message: translate(locale, DecoratorValidationKeys.FUTURE_DATE),
  }));
}
