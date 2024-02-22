/**
 * @packageDocumentation @hidden
 */

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
 */
export type TypePredicateData = TypePredicateCommons;

/**
 * Represents a key of the TypePredicateData object.
 */
export type TypePredicateKey = keyof TypePredicateData;

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
const TYPE_PREDICATE_DATA: TypePredicateData = {
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
 * Retrieves the type predicate map.
 * @returns The type predicate map.
 * @hidden
 */
export function getTypePredicates(): TypePredicateData {
  return TYPE_PREDICATE_DATA;
}

/**
 * Registers a type predicate.
 * @typeParam TName - type predicate key (includes commons and overrides)
 * @param type - The name of the type.
 * @param predicate - The type predicate function.
 * @hidden
 */
export function setTypePredicate<TName extends TypePredicateKey>(
  type: TName,
  predicate: TypePredicate,
): void {
  TYPE_PREDICATE_DATA[type] = predicate;
}

/**
 * Checks if the given value matches the specified type.
 * @param type - The type to check against.
 * @param value - The value to check.
 * @returns void if the value matches the type, otherwise throws an error.
 * @hidden
 */
export function checkType(type: TypePredicateKey, value: any): void | never {
  if (value == null) return;
  if (TYPE_PREDICATE_DATA[type](value)) return;
  handleMismatch(type, value);
}

/**
 * Throws an error indicating a type mismatch.
 * @param type - The type that is not assignable.
 * @param value - The value that the type is not assignable to.
 * @returns This function never returns a value.
 * @hidden
 */
export function handleMismatch(type: TypePredicateKey, value: any): never {
  throw new Error(`Type '${type}' is not assignable to type ${JSON.stringify(value)}`);
}
