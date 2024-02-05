import {
  createFieldDecorator,
  type FieldDecorator,
} from "../../../decorators/factory/forField/createFieldDecorator";
import { type DecoratorValidateIf } from "../../../decorators/helper";

export function validateFieldIf<Class, Value>(
  validateIf: DecoratorValidateIf<Class>,
): FieldDecorator<Class, Value> {
  return createFieldDecorator<Class, Value>((meta, name) => {
    meta.getUntypedDescriptor(name).validateIf = validateIf;
  });
}
