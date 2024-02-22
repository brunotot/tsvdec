import {
  createFieldDecorator,
  type FieldDecorator,
} from "../factory/forField/createFieldDecorator";
import { type DecoratorValidateIf } from "../options/props/validateIf";

/**
 * Creates a decorator which applies a validation condition to the field.
 * [@Enhancer]
 * @param validateIf - A function that returns a boolean indicating whether the field should be validated.
 * @returns A decorator function to use with class properties.
 */
export function validateFieldIf<This, Value>(
  validateIf: DecoratorValidateIf<This>,
): FieldDecorator<This, Value> {
  return createFieldDecorator<This, Value>((meta, name) => {
    meta.getUntypedDescriptor(name).validateIf = validateIf;
  });
}
