// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type StrategyEvaluator } from "../strategy";
import { Types } from "../utilities";

/**
 * An overridable interface designed for disabling nested validation on custom object types.
 * - when specified ***(example 1)***: an object type is considered primitive and it's simplified errors render as `string[]`
 * - when not specified ***(example 2)***: an object type is considered as is and it's simplified errors are evaluated by {@link StrategyEvaluator evaluate<T, string[]>})
 *
 * [@Override]
 *
 * @example
 * 1: Disabling nested form validation for `Coordinate` class by augmenting the `PrimitiveUnionOverride` interface from `@tsvdec/core`. This is a way of treating custom object types as primitives and avoiding recursive field validation
 *
 * ```ts
 * // coordinate.ts - model class which is considered primitive
 * export class Coordinate {
 *   x: number;
 *   y: number;
 * }
 * ```
 *
 * <div style="height: 1rem"></div>
 *
 * ```ts
 * // index.ts - entry point of the app
 * declare module "@tsvdec/core" {
 *   interface PrimitiveUnionOverride {
 *     // Specify object types as primitives here
 *     type: Coordinate;
 *   }
 * }
 * ```
 *
 * <div style="height: 1rem"></div>
 *
 * ```ts
 * // consumer.ts - model class which holds Coordinate property
 * import { createFieldValidator } from "@tsvdec/core";
 * // custom Coordinate validator
 * function MinX(minX: number) {
 *   return createFieldValidator<Coordinate>(coordinate => ({
 *     key: "MinX",
 *     valid: coordinate.x >= minX,
 *     message: `Minimum X is ${minX}`
 *   }))
 * }
 *
 * // Coordinate class definition
 * class Consumer {
 *   \@MinX(10)
 *   coordinate: Coordinate; // primitive, doesn't validate recursively
 * }
 *
 * const engine = new ValidationEngine(Consumer);
 * const payload = { coordinate: { x: 9, y: 23 } };
 * const { errors } = engine.validate(payload);
 * const coordinateErrors = errors.coordinate;
 * console.log(coordinateErrors); // ["Minimum X is 10"]
 * ```
 *
 * @example
 * 2: Default behavior - nested field validation is enabled for `Coordinate` class. It uses `\@attribute` for supplying validation engine with the runtime schema representation of the decorated field (if \@attribute is not defined then a type mismatch occurs between runtime type and compiled type)
 *
 * ```ts
 * // coordinate.ts
 * import { collection } from "@tsvdec/core";
 *
 * export class Coordinate {
 *   \@collection.number.ValueMin(10, { message: "Minimum X is 10" })
 *   x: number;
 *   y: number;
 * }
 * ```
 *
 * <div style="height: 1rem"></div>
 *
 * ```ts
 * // consumer.ts - model class which holds Coordinate property
 * import { attribute, Localization, Form, Utilities } from "@tsvdec/core";
 *
 * class Consumer {
 *   \@attribute(Coordinate) // enables deep validation
 *   coordinate: Coordinate; // non-primitive
 * }
 *
 * const engine = new ValidationEngine(Consumer);
 * const payload = { coordinate: { x: 9, y: 23 } };
 * const { errors } = engine.validate(payload);
 * const coordinateErrors = errors.coordinate;
 * console.log(coordinateErrors); // { root: [], data: { x: ["Minimum X is 10"], y: [] } }
 * ```
 * @see {@link PrimitiveUnionType}
 */
export interface PrimitiveUnionOverride {}

/**
 * Represents primitive data types including `string`, `number`, `boolean`, `bigint`, `Date`, and custom primitives defined in `PrimitiveUnionOverride`.
 * @see {@link PrimitiveUnionOverride}
 */
export type PrimitiveUnionType = Types.Override<
  PrimitiveUnionOverride,
  Types.Class<any>,
  "Invalid type for PrimitiveUnionOverride! If you encounter this error, ensure that the PrimitiveUnionOverride type is Class<any>.",
  string | number | boolean | bigint | Date
>;
