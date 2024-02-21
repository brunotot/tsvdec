import { DecoratorOptions } from "../../options/DecoratorOptions";
import { buildKeyProp } from "../../options/props/key";
import { buildMessageProp } from "../../options/props/message";
import { DecoratorValidationHandler } from "../../validators/utilities/DecoratorValidationHandler";
import { DecoratorValidationResult } from "../../validators/utilities/DecoratorValidationResult";
import { buildDecoratorMeta } from "../DecoratorFactoryMeta";
import { createFieldValidator } from "./createFieldValidator";

/**
 * Creates a validator function for a specific field.
 *
 * [@Validator]
 *
 * @typeParam This - The type of the class instance.
 * @typeParam Value - The type of the field value.
 * @typeParam Identifier - The type of the field key.
 * @param options - The decorator options.
 * @param key - The field key.
 * @param fn - The validation function.
 * @returns The created field validator.
 */
export function makeValidator<This, Value, Identifier extends string>(
  options: DecoratorOptions | undefined,
  key: Identifier,
  fn: (
    ...args: Parameters<DecoratorValidationHandler<Value>>
  ) => Omit<DecoratorValidationResult, "key">,
) {
  return createFieldValidator<This, Value>((value, meta) => {
    const data = fn(value, meta);
    return {
      key: buildKeyProp(options, key),
      valid: data.valid,
      message: buildMessageProp(options, meta.locale, data.message, meta.args),
    };
  }, buildDecoratorMeta(options));
}
