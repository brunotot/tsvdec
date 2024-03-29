import { type Types } from "../../../utilities";
import type { DecoratorValidationHandler } from "../../validators/utilities/DecoratorValidationHandler";
import { DecoratorMeta, DEFAULT_DECORATOR_META } from "../DecoratorFactoryMeta";
import { createClassDecorator, type ClassDecorator } from "./createClassDecorator";

/**
 * Creates validation decorators for classes.
 * [@Decorator]
 * @typeParam T - The type of class being validated.
 * @param validate - The callback that defines the validation logic.
 * @param decoratorMeta - Decorator meta.
 * @returns A decorator factory for class validators.
 *
 * @example
 * ```typescript
 * \PropGreaterThan("myValue", 10)
 * class MyClass {
 *   public myValue!: number;
 * }
 *
 * function PropGreaterThan<T extends typeof MyClass>(prop: keyof MyClass, value: number) {
 *   return Decorators.ForClass.Validator.build<T>(instance => ({
 *     key: "PropGreaterThan",
 *     valid: instance[prop] > value,
 *     message: `${prop} must be greater than ${value}`
 *   }));
 * }
 * ```
 */
export function createClassValidator<T extends Types.Class>(
  validate: DecoratorValidationHandler<Types.UnwrapClass<T>>,
  decoratorMeta: DecoratorMeta<T> = DEFAULT_DECORATOR_META,
): ClassDecorator<T> {
  return createClassDecorator<T>(meta => {
    meta.addValidator(validate, decoratorMeta);
  });
}
