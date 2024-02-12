// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TypeChecker } from "../utilities";

/**
 * An overridable interface designed for specifying additional type predicates.
 * This interface is used to augment the `TypePredicateData` interface from `@tsvdec/core`.
 * @remarks {@link TypeChecker `TypeChecker API`} consumes this override.
 * @example
 * Suppose you have a custom type `Coordinate`
 * ```ts
 * type Coordinate = {
 *   x: number;
 *   y: number;
 * }
 * ```
 *
 * You can now define a new type predicate for Coordinate by augmenting the `TypePredicateOverride`
 * ```ts
 * declare module "@tsvdec/core" {
 *   interface TypePredicateOverride {
 *     coordinate: (value: any) => value is Coordinate;
 *   }
 * }
 * ```
 *
 * You should now register the new type predicate using the `TypeChecker` API
 * ```ts
 * import { TypeChecker } from "@tsvdec/core";
 *
 * function isCoordinate(value: any): value is Coordinate {
 *   return (
 *     value != null
 *       && typeof value === "object"
 *       && "x" in value
 *       && "y" in value
 *       && typeof value.x === "number"
 *       && typeof value.y === "number"
 *   );
 * }
 *
 * TypeChecker.registerTypePredicate("coordinate", isCoordinate);
 * ```
 */
export interface TypePredicateOverride {}

/**
 * Common type predicates for various data types.
 */
export type TypePredicateCommons = {
  /**
   * Checks if the value is a Date object.
   * @param value The value to be checked.
   * @returns True if the value is a Date object, false otherwise.
   */
  date: (value: any) => value is Date;
  /**
   * Checks if the value is an array.
   * @param value The value to be checked.
   * @returns True if the value is an array, false otherwise.
   */
  array: (value: any) => boolean;
  /**
   * Checks if the value is a string.
   * @param value The value to be checked.
   * @returns True if the value is a string, false otherwise.
   */
  string: (value: any) => value is string;
  /**
   * Checks if the value is a number.
   * @param value The value to be checked.
   * @returns True if the value is a number, false otherwise.
   */
  number: (value: any) => value is number;
  /**
   * Checks if the value is a boolean.
   * @param value The value to be checked.
   * @returns True if the value is a boolean, false otherwise.
   */
  boolean: (value: any) => value is boolean;
  /**
   * Checks if the value is an object.
   * @param value The value to be checked.
   * @returns True if the value is an object, false otherwise.
   */
  object: (value: any) => value is object;
};

/**
 * Represents the data for a type predicate.
 * This data includes both the common properties and the override properties.
 */
export type TypePredicateData = TypePredicateCommons & TypePredicateOverride;

/**
 * Represents a key of the TypePredicateData object.
 */
export type TypePredicateKey = keyof TypePredicateData;
