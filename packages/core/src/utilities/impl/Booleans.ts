/**
 * @packageDocumentation Type-level utilities for working with **Boolean** evaluations.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type StrategyService } from "../../strategy";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type PrimitiveTypeOverride } from "../../overrides";
import { type Objects } from "../../utilities/impl/Objects";
import { type Types } from "../../utilities/impl/Types";

/**
 * Checks if the type `TValue` exists in `TData` type array.
 * @typeParam TValue - The type to check.
 * @typeParam TData - The array of types to check against.
 * @example
 * ```ts
 * type T1 = Booleans.isAnyOf<1, [1, 2, 3]>; // true
 * type T2 = Booleans.isAnyOf<4, [1, 2, 3]>; // false
 * ```
 * @see {@link Objects.Payload Payload} - Notice how getters and functions are filtered out.
 */
export type isAnyOf<TValue, TData extends Types.ArrayType> =
  NonNullable<TValue> extends TData[number] ? true : false;

/**
 * Checks if the type `TValue` is an object type.
 * @typeParam TValue - The type to check.
 * @remarks Here, a type is considered an object if it is not a function, array, or primitive type.
 * @example
 * ```ts
 * type T1 = Booleans.isObject<{ a: 1 }>; // true
 * type T2 = Booleans.isObject<() => void>; // false
 * type T3 = Booleans.isObject<number[]>; // false
 * type T4 = Booleans.isObject<1>; // false
 * ```
 */
export type isObject<TValue> =
  true extends isFunction<NonNullable<TValue>>
    ? false
    : true extends isArray<NonNullable<TValue>>
      ? false
      : true extends isPrimitive<NonNullable<TValue>>
        ? false
        : true;

/**
 * Checks if the type `TValue` is a function type.
 * @typeParam TValue - The type to check.
 * @example
 * ```ts
 * type T1 = Booleans.isFunction<() => void>; // true
 * type T2 = Booleans.isFunction<{ a: 1 }>; // false
 * type T3 = Booleans.isFunction<number[]>; // false
 * type T4 = Booleans.isFunction<1>; // false
 * ```
 */
export type isFunction<TValue> = NonNullable<TValue> extends Types.FunctionType ? true : false;

/**
 * Checks if the type `TObj[TKey]` is a getter type.
 * @typeParam TObj - The parent object type.
 * @typeParam TKey - The key of parent field to check.
 * @example
 * ```ts
 * type T1 = Booleans.isGetter<{ get a(): 1 }, "a">; // true
 * type T2 = Booleans.isGetter<{ a: 1 }, "a">; // false
 * ```
 * @see {@link StrategyService.PrimitiveGetterStrategy.matches} - When checking if a field is a primitive getter, notice how the `isGetter` utility is used.
 */
export type isGetter<TObj, TKey extends keyof TObj> =
  TKey extends Objects.Inputs<TObj> ? false : true;

/**
 * Checks if the type `TValue` is an array type.
 * @typeParam TValue - The type to check.
 * @example
 * ```ts
 * type T1 = Booleans.isArray<number[]>; // true
 * type T2 = Booleans.isArray<{ a: 1 }>; // false
 * type T3 = Booleans.isArray<() => void>; // false
 * type T4 = Booleans.isArray<1>; // false
 * ```
 */
export type isArray<TValue> = NonNullable<TValue> extends Types.ArrayType ? true : false;

/**
 * Checks if the type `TValue` is a primitive type.
 * @typeParam TValue - The type to check.
 * @remarks `string`, `number`, `boolean`, `bigint` and `Date` are considered primitive types. Custom primitives can be defined in {@link PrimitiveTypeOverride}.
 * @example
 * ```ts
 * type T1 = Booleans.isPrimitive<"a">; // true
 * type T2 = Booleans.isPrimitive<"1">; // true
 * type T3 = Booleans.isPrimitive<true>; // true
 * type T4 = Booleans.isPrimitive<bigint>; // true
 * type T5 = Booleans.isPrimitive<Date>; // true
 * type T6 = Booleans.isPrimitive<{ a: 1 }>; // false
 * ```
 */
export type isPrimitive<TValue> = isAnyOf<TValue, Types.PrimitiveType>;

/**
 * Checks if the type `TValue` is an array of primitive types.
 * @typeParam TValue - The type to check.
 * @example
 * ```ts
 * type T1 = Booleans.isPrimitiveArray<number[]>; // true
 * type T2 = Booleans.isPrimitiveArray<string[]>; // true
 * type T3 = Booleans.isPrimitiveArray<boolean[]>; // true
 * type T4 = Booleans.isPrimitiveArray<object[]>; // false
 * ```
 */
export type isPrimitiveArray<TValue> =
  Types.UnpackArray<TValue> extends never ? false : isPrimitive<Types.UnpackArray<TValue>>;

/**
 * Checks if the type `TValue` is an array of object types.
 * @typeParam TValue - The type to check.
 * @example
 * ```ts
 * type T1 = Booleans.isObjectArray<{ a: 1 }[]>; // true
 * type T3 = Booleans.isObjectArray<number[]>; // false
 * type T3 = Booleans.isObjectArray<number>; // false
 * ```
 */
export type isObjectArray<TValue> =
  Types.UnpackArray<TValue> extends never ? false : isObject<Types.UnpackArray<TValue>>;

/**
 * Checks if the type `TValue` is `undefined`.
 * @typeParam TValue - The type to check.
 * @example
 * ```ts
 * type T1 = Booleans.isUndefined<undefined>; // true
 * type T2 = Booleans.isUndefined<null>; // false
 * type T3 = Booleans.isUndefined<1>; // false
 * ```
 */
export type isUndefined<T> = T extends undefined ? true : false;

/**
 * Checks if the type `TValue` is `null`.
 * @typeParam TValue - The type to check.
 * @example
 * ```ts
 * type T1 = Booleans.isNull<null>; // true
 * type T2 = Booleans.isNull<undefined>; // false
 * type T3 = Booleans.isNull<1>; // false
 * ```
 */
export type isNull<T> = T extends null ? true : false;
