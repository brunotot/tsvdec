import type { DecoratorValidationResult } from "../../../decorators";
import { type DecoratorArgs } from "../../../decorators";
import { type Booleans } from "../../../utilities";
import { AbstractStrategyResolver } from "../AbstractStrategy";

export namespace PrimitiveStrategy {
  /**
   * Constant name identifier for this strategy.
   */
  export const Name = "PRIMITIVE" as const;

  /**
   * Represents the simplified error structure for validating primitive types.
   */
  export type SimpleErrors = string[];

  /**
   * Represents the detailed error structure for validating primitive types.
   */
  export type DetailedErrors = DecoratorValidationResult[];

  /**
   * Type guard to check if a certain field in a type matches this strategy.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   */
  // prettier-ignore
  export type matches<T, K extends keyof T> = Booleans.isPrimitive<T[K]>;

  /**
   * Type for the handler function based on the field and result types.
   * @typeParam T - The type containing the field.
   * @typeParam K - The key of the field.
   * @typeParam R - The result type.
   */
  // prettier-ignore
  export type handler<T, K extends keyof T, R> =
    true extends Booleans.isUndefined<R>
      ? T[K]
  : R;

  /**
   * Extends the abstract `ValidationStrategy` class to provide a concrete implementation for validating primitive types like numbers, strings, etc.
   *
   * @typeParam F - The type of the field being validated.
   *
   * @extends AbstractStrategyResolver<F,DecoratorValidationResult[],string[]>
   */
  export class StrategyResolver<F> extends AbstractStrategyResolver<
    F,
    DetailedErrors,
    SimpleErrors
  > {
    /**
     * Implements the `test` method from the `ValidationStrategy` abstract class. It performs the actual validation logic for primitive types by invoking the root rule's `validate` method and then building simplified error messages.
     *
     * @param value - The value to be validated.
     * @param context - The context in which the validation is taking place.
     * @param args - Decorator arguments.
     *
     * @returns A tuple containing an array of detailed validation results (`ValidationResult[]`) and an array of simplified error messages (`string[]`).
     */
    test(value: any, context: any, args: DecoratorArgs): [DetailedErrors, SimpleErrors] {
      const root = this.getRootErrors(value, context, args);
      return [root, this.getErrorMessages(root)];
    }
  }
}
