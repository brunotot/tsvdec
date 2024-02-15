import {
  createFieldDecorator,
  type FieldDecorator,
} from "../../../decorators/factory/forField/createFieldDecorator";
import { type DecoratorValidateIf } from "../../../decorators/helper";

/**
 * Creates a decorator which applies a validation condition to the field.
 * [@Decorator]
 * @param validateIf - A function that returns a boolean indicating whether the field should be validated.
 * @returns A decorator function to use with class properties.
 */
export function validateFieldIf<Class, Value>(
  validateIf: DecoratorValidateIf<Class>,
): FieldDecorator<Class, Value> {
  return createFieldDecorator<Class, Value>((meta, name) => {
    meta.getUntypedDescriptor(name).validateIf = validateIf;
  });
}
