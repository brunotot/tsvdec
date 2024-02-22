import { DEFAULT_DECORATOR_META, type DecoratorMeta } from "../../factory/DecoratorFactoryMeta";
import type { DecoratorValidationHandler } from "../../validators/utilities/DecoratorValidationHandler";
import { createFieldDecorator, type FieldDecorator } from "./createFieldDecorator";

/**
 * Creates validation decorators for fields.
 * [@Decorator]
 * @typeParam T - The type of the value being validated.
 * @param validate - The callback that defines the validation logic.
 * @param decoratorMeta - Decorator meta.
 * @returns A decorator function that can be applied to class properties to add the validation logic.
 *
 * @example
 * ```typescript
 * class MyClass {
 *   \GreaterThan(10)
 *   public myValue!: number;
 * }
 *
 * function GreaterThan<T extends number>(min: number) {
 *   return createFieldValidator<T>(value => ({
 *     key: "GreaterThan",
 *     valid: value > min,
 *     message: `${prop} must be greater than ${min}`
 *   }));
 * }
 * ```
 */
export function createFieldValidator<This, Value>(
  validate: DecoratorValidationHandler<Value>,
  decoratorMeta: DecoratorMeta<This> = DEFAULT_DECORATOR_META,
): FieldDecorator<This, Value> {
  return createFieldDecorator<This, Value>((meta, property) => {
    meta.addValidator(property, validate, decoratorMeta);
  });
}
