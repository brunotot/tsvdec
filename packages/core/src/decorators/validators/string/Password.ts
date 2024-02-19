/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Locale } from "../../../localization";
import { translate } from "../../../localization/service/TranslationService";
import { type Types } from "../../../utilities";
import { makeValidator, type FieldDecorator } from "../../factory/forField";
import { DecoratorOptions } from "../../options/DecoratorOptions";
import { buildMessageProp } from "../../options/props/message";
import { DecoratorKeys } from "../utilities/DecoratorKeys";
import { RegexConst } from "./regex/shared/regex.constants";

/** Internal validation function for {@link Password} validator. */
function isPasswordValid(
  input: Types.Optional<string>,
  rules:
    | {
        uppercase?: boolean;
        lowercase?: boolean;
        numbers?: boolean;
        specials?: boolean;
        length?: number;
      }
    | undefined,
  definedMessage?: string,
  locale?: Locale,
) {
  const PASSWORD_REGEXES = {
    uppercase: RegexConst.UPPERCASE_ANYWHERE,
    lowercase: RegexConst.LOWERCASE_ANYWHERE,
    numbers: RegexConst.NUMERIC_ANYWHERE,
    specials: RegexConst.SPECIALS_ANYWHERE,
  };
  function isInvalid(text: string, rule: keyof typeof PASSWORD_REGEXES) {
    const matchers = text.match(PASSWORD_REGEXES[rule]);
    return matchers === null || matchers.length === 0;
  }

  function buildConstraintViolation(message: string, valid: boolean) {
    return {
      key: DecoratorKeys.PASSWORD,
      message,
      valid,
    };
  }
  const lowercase = rules?.lowercase ?? true;
  const uppercase = rules?.uppercase ?? false;
  const numbers = rules?.numbers ?? false;
  const specials = rules?.specials ?? false;
  const length = rules?.length ?? 8;
  const str = input ?? "";
  if (str.length < length) {
    return buildConstraintViolation(
      definedMessage ?? translate(locale, "PasswordLength", length),
      false,
    );
  }

  if (uppercase && isInvalid(str, "uppercase")) {
    return buildConstraintViolation(
      definedMessage ?? translate(locale, "PasswordUppercase"),
      false,
    );
  }

  if (lowercase && isInvalid(str, "lowercase")) {
    return buildConstraintViolation(
      definedMessage ?? translate(locale, "PasswordLowercase"),
      false,
    );
  }

  if (numbers && isInvalid(str, "numbers")) {
    return buildConstraintViolation(definedMessage ?? translate(locale, "PasswordNumbers"), false);
  }

  if (specials && isInvalid(str, "specials")) {
    return buildConstraintViolation(definedMessage ?? translate(locale, "PasswordSpecials"), false);
  }

  return { key: DecoratorKeys.PASSWORD, message: "", valid: true };
}

/**
 * Checks if decorated string contains a specific number of characters.
 *
 * [@Validator]
 *
 * @key {@link DecoratorKeys.PASSWORD}
 * @typeParam T - The type of the string property.
 * @param rules - Customizable rules for specific password validations.
 * @param options - Common decorator options (`key`, `message`, `groups`, etc...)
 * @returns A decorator function to use on class fields of type `string`.
 *
 * @example
 * 1: Basic usage
 * ```ts
 * class Form {
 *   \@Password()
 *   password: string;
 * }
 * ```
 *
 * @example
 * 2: Supplying a custom error message
 * ```ts
 * class Form {
 *   \@Password(undefined, { message: "Password does not meet the necessary requirements" })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 3: Supplying custom groups
 * ```ts
 * class Form {
 *   \@Password(undefined, { groups: ["UPDATE"] })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 4: Supplying both custom error message and groups
 * ```ts
 * class Form {
 *   \@Password(undefined, {
 *     groups: ["UPDATE"],
 *     message: "Password does not meet the necessary requirements"
 *   })
 *   password: string;
 * }
 * ```
 *
 * @example
 * 5: Supplying custom validation logic while having the error message automatically translated
 * ```ts
 * class Form {
 *   \@Password({ uppercase: true, lowercase: true, })
 *   password: string;
 * }
 * ```
 */
export function Password<This, Value extends Types.Optional<string>>(
  rules?: {
    /**
     * If `true`, the password must contain at least one uppercase letter.
     */
    uppercase?: boolean;
    /**
     * If `true`, the password must contain at least one lowercase letter.
     */
    lowercase?: boolean;
    /**
     * If `true`, the password must contain at least one number.
     */
    numbers?: boolean;
    /**
     * If `true`, the password must contain at least one special character.
     */
    specials?: boolean;
    /**
     * The minimum length of the password. If `undefined`, the default value is `8`.
     */
    length?: number;
  },
  options?: DecoratorOptions<This>,
): FieldDecorator<This, Value> {
  return makeValidator(options, DecoratorKeys.PASSWORD, (value, { locale }) => {
    const messageProp = buildMessageProp(options, locale);
    return isPasswordValid(value, rules, messageProp, locale);
  });
}
