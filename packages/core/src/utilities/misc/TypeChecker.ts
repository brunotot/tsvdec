import { TypePredicateData, TypePredicateKey } from "../../overrides/TypePredicateOverride";

/**
 * Represents a type predicate function.
 * @param value The value to be checked.
 * @returns A boolean indicating whether the value satisfies the type predicate.
 * @example
 * ```ts
 * const isString: TypePredicate = (value: any): value is string => typeof value === "string";
 * const isNumber: TypePredicate = (value: any): value is number => typeof value === "number";
 * const isDate: TypePredicate = (value: any): value is Date => value instanceof Date;
 * ```
 */
export type TypePredicate<T = any> = (value: any) => value is T;

/** @see {@link TypePredicateData} */
export const typePredicateData: TypePredicateData = {
  /** @see {@link TypePredicateData.date} */
  date: (value: any): value is Date => value instanceof Date,
  /** @see {@link TypePredicateData.array} */
  array: Array.isArray,
  /** @see {@link TypePredicateData.string} */
  string: (value: any): value is string => typeof value === "string",
  /** @see {@link TypePredicateData.number} */
  number: (value: any): value is number => typeof value === "number",
  /** @see {@link TypePredicateData.boolean} */
  boolean: (value: any): value is boolean => typeof value === "boolean",
  /** @see {@link TypePredicateData.object} */
  object: (value: any): value is object => typeof value === "object",
};

/**
 * Registers a type predicate.
 * @typeParam TName - type predicate key (includes commons and overrides)
 * @param type - The name of the type.
 * @param predicate - The type predicate function.
 */
export function registerTypePredicate<TName extends TypePredicateKey>(
  type: TName,
  predicate: TypePredicate,
): void {
  typePredicateData[type] = predicate;
}

/**
 * Checks if the given value matches the specified type.
 * @param type - The type to check against.
 * @param value - The value to check.
 * @returns void if the value matches the type, otherwise throws an error.
 */
export function checkType(type: TypePredicateKey, value: any): void | never {
  if (value == null) return;
  if (typePredicateData[type](value)) return;
  handleMismatch(type, value);
}

/**
 * Throws an error indicating a type mismatch.
 * @param type - The type that is not assignable.
 * @param value - The value that the type is not assignable to.
 * @returns This function never returns a value.
 */
export function handleMismatch(type: TypePredicateKey, value: any): never {
  throw new Error(`Type '${type}' is not assignable to type ${JSON.stringify(value)}`);
}
